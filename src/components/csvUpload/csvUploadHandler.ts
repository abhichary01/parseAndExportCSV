import express,{Request,Response,NextFunction} from 'express';
import csvtojson from 'csvtojson'
import Books from './csvUploadModel';
import * as json2csv from 'json2csv';
import * as fs from 'fs'

const csvUpload = async (req: any, res: Response, next: NextFunction) => {
    try {
        const response = await csvtojson().fromFile(req.file.path);

        const desiredProperties = ['title', 'description', 'authors', 'isbn'];
        const filteredData = response.map(item => {
        
        const filteredItem: any = {};
        Object.keys(item).forEach(key => {
            if (desiredProperties.includes(key)) {
            filteredItem[key] = item[key];
            }
        });

        return filteredItem;
        });
        if(!response){
            res.json({ response: null, message: "Couldnot process your file", status: 0 })
        }
        await Books.insertMany(filteredData)
        res.send({ response: filteredData, message: "succesfully uploaded data", status: 1 });

        fs.unlink(req.file.path, (err: any) => {
            if (err) throw err;
            console.log('File deleted!');
        });
    }catch (e) {
        console.log(e)
        next(e)
    }
}

const csvInsert = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Books.create(req.body)
        res.send({ response: result, message: "succesfully Inserted data", status: 1 });
    }catch (e) {
        console.log(e)
        next(e)
    }
}

const queryBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(Object.keys(req.query).length === 0){
            res.json({ response: null, message: "No details entered", status: 1 })
          }else{
            var parameters : any = {};
          if(req.query.authors !== ''||undefined||null){
            parameters['authors'] = req.query.authors
          }
          if(req.query.isbn !== ''||undefined||null){
            let ISBN = (req.query.isbn as string).replace(/(\d{4})(?=\d)/g, "$1-")
            parameters['isbn'] = ISBN;
          }
          if(parameters.authors===undefined||''){
            delete parameters.authors
          }
          if(parameters.isbn===undefined||''){
            delete parameters.authors
          }
          var result: any = await Books.find(parameters)
          const objects = result.map((book: { title: any; isbn: any; authors: any; description: any; __v: any; }) => {
            const {  title, isbn, authors, description} = book;
            return {  title, isbn, authors, description};
          });
          const jsonData = JSON.parse(JSON.stringify(objects));
        
          const csv = json2csv.parse(jsonData);
          // fs.writeFileSync(__dirname+`/output/${req.query.authors||req.query.email||req.query.isbn}.csv`, csv);
          res.send({ response: jsonData, message: "succesfully fetched data", status: 1 });
        }     
    }catch (e) {
        console.log(e)
        next(e)
    }
}

const getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Books.find()
        res.send({ response: result, message: "succesfully fetched data", status: 1 });
            
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export{
    csvUpload,
    csvInsert,
    queryBooks,
    getBooks
}