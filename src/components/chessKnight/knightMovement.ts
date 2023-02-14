const ChessBoard = 8;

export default class Knight{
    private x: number;
    private y: number;
    private possibleMoves: Array<[number, number]>;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
        this.possibleMoves = [];
    }
    private isValidMove(x: number, y: number): boolean{
        return x >= 1 && y >= 1 && x <= ChessBoard && y <= ChessBoard;
    }

    public findPossibleMoves(): Array<[number, number]>{
        let possibleX: number[] = [this.x + 2, this.x - 2, this.x + 1, this.x - 1];
        let possibleY: number[] = [this.y + 2, this.y - 2, this.y + 1, this.y - 1];
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(Math.abs(possibleX[i] - this.x) + Math.abs(possibleY[j] - this.y) === 3){
                    if(this.isValidMove(possibleX[i], possibleY[j]))
                        this.possibleMoves.push([possibleX[i], possibleY[j]]);
                }
            }
        }
        return this.possibleMoves;
    }

}

