import {Cell} from "./Cell.ts";
import {Colors} from "./Colors.ts";
import {Pawn} from "./figures/Pawn.ts";

export class Board {
    cells: Cell[][] = [];

    public initCells(): void {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];

            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)); //Черные ячейки
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)); //Белые ячейки
                }
            }

            this.cells.push(row);
        }
    }

    public getCell(x: number, y: number): Cell {
        return this.cells[y][x];
    }

    private addPawns(): void {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1));
            new Pawn(Colors.WHITE, this.getCell(i, 6));
        }
    }

    private addKings(): void {

    }

    private addQueens(): void {

    }

    private addBishops(): void {

    }

    private addKnights(): void {

    }

    private addRooks(): void {

    }

    public addFigures(): void {
        this.addPawns();
        this.addKings();
        this.addQueens();
        this.addBishops();
        this.addKnights();
        this.addRooks();
    }
}