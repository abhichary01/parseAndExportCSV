import express,{Request,Response,NextFunction} from 'express';
import * as bodyParser from "body-parser"
import cors from "cors";
import * as dotenv from 'dotenv';
import { mongo } from './connectivity/mongo';
import csvRoutes from "./components/csvUpload/csvUploadRoutes"
import knightRoutes from "./components/chessKnight/knighMovementRouter"

const app = express();
mongo
dotenv.config();

var corsOptions = {
    // origin: process.env.CLIENTURL||'https://csvuploadandexport-ym64.vercel.app'
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(csvRoutes)
app.use(knightRoutes)

export default app