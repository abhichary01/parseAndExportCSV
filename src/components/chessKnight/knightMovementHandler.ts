import express,{Request,Response,NextFunction} from 'express';
import Knight from './knightMovement';

const possibleMoves = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {x, y} = req.body;
        let knight = new Knight(x, y);
        const result = knight.findPossibleMoves()
        res.send({ response: result, message: "succesfully fetched possible moves", status: 1 });
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export{
    possibleMoves
}