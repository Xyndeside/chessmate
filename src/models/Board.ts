import {Cell} from "./Cell.ts";
import {Colors} from "./Colors.ts";
import {Pawn} from "./figures/Pawn.ts";
import {King} from "./figures/King.ts";
import {Queen} from "./figures/Queen.ts";
import {Bishop} from "./figures/Bishop.ts";
import {Knight} from "./figures/Knight.ts";
import {Rook} from "./figures/Rook.ts";
import {Figure} from "./figures/Figure.ts";

export class Board {
    cells: Cell[][] = [];
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];

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

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        return newBoard;
    }

    public highlightCells(selectedCell: Cell | null): void {
        for (let i = 0; i < this.cells.length; i++) {
            const row: Cell[] = this.cells[i];

            for (let j = 0; j < row.length; j++) {
                const target: Cell = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
            }
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
        new King(Colors.BLACK, this.getCell(4, 0));
        new King(Colors.WHITE, this.getCell(4, 7));
    }

    private addQueens(): void {
        new Queen(Colors.BLACK, this.getCell(3, 0));
        new Queen(Colors.WHITE, this.getCell(3, 7));
    }

    private addBishops(): void {
        new Bishop(Colors.BLACK, this.getCell(2, 0));
        new Bishop(Colors.BLACK, this.getCell(5, 0));
        new Bishop(Colors.WHITE, this.getCell(2, 7));
        new Bishop(Colors.WHITE, this.getCell(5, 7));
    }

    private addKnights(): void {
        new Knight(Colors.BLACK, this.getCell(1, 0));
        new Knight(Colors.BLACK, this.getCell(6, 0));
        new Knight(Colors.WHITE, this.getCell(1, 7));
        new Knight(Colors.WHITE, this.getCell(6, 7));
    }

    private addRooks(): void {
        new Rook(Colors.BLACK, this.getCell(0, 0));
        new Rook(Colors.BLACK, this.getCell(7, 0));
        new Rook(Colors.WHITE, this.getCell(0, 7));
        new Rook(Colors.WHITE, this.getCell(7, 7));
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