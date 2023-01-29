import express,{Request,Response,NextFunction} from 'express';
import mongoose,{Schema} from 'mongoose';
import multer, {diskStorage, FileFilterCallback} from 'multer';
import * as bodyParser from "body-parser"
import cors from "cors";
import csvtojson from 'csvtojson'
import Books from './BooksModel'
import * as json2csv from 'json2csv';
import * as dotenv from 'dotenv';
import knightMovement from './chessKnight/knightMovement'


const app = express();
dotenv.config();

var corsOptions = {
  origin: "http://localhost:4200"
};
main().catch(err => console.log(err));

async function main() {
  const MONGO_DB = process.env.DATABASE_URL || 'mongodb+srv://abhichary01:VZF9QvSiNFpAVBTl@cluster0.zbp60.mongodb.net/?retryWrites=true&w=majority';
  await mongoose.connect(MONGO_DB);
  console.log("Connected to database");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname+'/public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const fileFilter = (req: any, file: { mimetype: string; }, cb: (arg0: null, arg1: boolean) => void) => {
  if (
    file.mimetype === 'text/csv'
  ) {
    cb(null, true);
  } else {
    return cb(null, false);
  }
};
const uploads = multer({ storage: storage, fileFilter: fileFilter })
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.static(path.resolve(__dirname, 'public')))
app.get('/', (req, res) => {
  Books.find((err: any, data: string) => {
        if (err) {
          console.log(err)
        } else {
            if (data != '') {
                res.json(data);
            } else {
                console.log("no data");
                res.json(data);
            }
        }
    })
})
let bookData = [];
app.post('/upload', uploads.single('csvFile'), (req: any, res: any) => {
  csvtojson()
  
    .fromFile(req.file.path)
    .then((response: any) => {
      // for (var x = 0; x < response; x++) {
      //     // bookData = (response[x].title)
      //     // response[x].title = bookData
      //     // bookData = (response[x].isbn)
      //     // response[x].isbn = bookData
      //     // bookData = (response[x].authors)
      //     // response[x].authors = bookData
      //     // bookData = (response[x].description)
      //     // response[x].description = bookData
      //     // bookData = (response[x].email)
      //     // response[x].email = bookData
      // }
      Books.insertMany(response, (err: any, data: any) => {
        if (err) {
          console.log(err)
          res.status (400).send ({ message: 'Could not upload the file!', status : 0 })
        } else {
          console.log("data inserted", data);
        }
      })
      res.send({ message: "succesfully uploaded data", status : 1 });
    })

})

app.get('/getallbooks', async (req, res) => {
  const result = await Books.find()
  res.send({"res": result});
});

app.get('/getbooks/query', async (req, res) => {
  var parameters : any = {};
  if(req.query.authors !== ''){
    parameters['authors'] = req.query.authors
  }
  if(req.query.isbn !== ''){
    let ISBN = (req.query.isbn as string).replace(/(\d{4})(?=\d)/g, "$1-")
    parameters['isbn'] = ISBN;
  }
  var result: any = await Books.find(parameters)
  const objects = result.map((book: { title: any; isbn: any; authors: any; description: any; __v: any; }) => {
    const {  title, isbn, authors, description} = book;
    return {  title, isbn, authors, description};
  });
  const jsonData = JSON.parse(JSON.stringify(objects));

  const csv = json2csv.parse(jsonData);
  // fs.writeFileSync(__dirname+`/output/${req.query.authors||req.query.email||req.query.isbn}.csv`, csv);
  res.send({ "res": jsonData });
});

app.post('/insert', async (req: any, res: any) => {
  const result = await Books.create(req.body)
  res.send({"res": result});
});

app.post('/knight/moves', (req, res) => {
  const {x, y} = req.body;
  let knight = new knightMovement(x, y);
  res.send(knight.findPossibleMoves());
});

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});