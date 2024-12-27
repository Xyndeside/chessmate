import {Colors} from "./Colors.ts";
import {Figure} from "./figures/Figure.ts";
import {Board} from "./Board.ts";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean; // Можно ли переместиться на эту ячейку
    id: number; // Для react ключей

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    }

    isEmpty(): boolean {
        return this.figure === null;
    }

    isEnemy(target: Cell): boolean {
        if (target.figure && target.figure.color !== this.figure?.color) {
            return true;
        }

        return false;
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false;
        }

        const min: number = Math.min(this.y, target.y);
        const max: number = Math.max(this.y, target.y);

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) {
            return false;
        }

        const min: number = Math.min(this.x, target.x);
        const max: number = Math.max(this.x, target.x);

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX: number = Math.abs(target.x - this.x);
        const absY: number = Math.abs(target.y - this.y);

        if (absX !== absY) {
            return false;
        }

        const dy: number = this.y < target.y ? 1 : -1;
        const dx: number = this.x < target.x ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    setFigure(figure: Figure): void {
        this.figure = figure;
        this.figure.cell = this
    }

    addLostFigure(figure: Figure): void {
        if (figure.color === Colors.BLACK) {
            this.board.lostBlackFigures.push(figure);
        } else {
            this.board.lostWhiteFigures.push(figure)
        }
    }

    moveFigure(target: Cell): void {
        if (this.figure && this.figure.canMove(target)) {
            this.figure.moveFigure(target);

            if (target.figure) {
                this.addLostFigure(target.figure);
            }

            target.setFigure(this.figure);
            this.figure = null;
        }
    }
}