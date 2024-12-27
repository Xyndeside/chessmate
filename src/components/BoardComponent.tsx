import {Board} from "../models/Board.ts";
import {FC, useEffect, useState} from "react";
import {Cell} from "../models/Cell.ts";
import CellComponent from "./CellComponent.tsx";
import React from "react";
import {Player} from "../models/Player.ts";

interface BoardComponentProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
    boardRotate: string;
    setBoardRotate: (classname: string) => void;
}

const BoardComponent: FC<BoardComponentProps> = ( {board, setBoard, currentPlayer, swapPlayer, boardRotate, setBoardRotate} ) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function clickOnCell(cell: Cell): void {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            rotateBoard();
            setSelectedCell(null);
        } else if (cell.figure && (cell.figure.color === currentPlayer?.color)) {
            setSelectedCell(cell);
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell]);

    function highlightCells(): void {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard(): void {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    function rotateBoard(): void {
        if (boardRotate) {
            setBoardRotate("");
        } else {
            setBoardRotate("board-rotate");
        }
    }

    return (
        <div>
            <h3 className="currentPlayer">Текущий игрок: {currentPlayer?.color}</h3>

            <div
                className={["board", boardRotate].join(" ")}
            >
                {board.cells.map((row: Cell[], index: number) =>
                    <React.Fragment key={index}>
                        {row.map((cell: Cell) =>
                            <CellComponent
                                boardRotate={boardRotate}
                                click={clickOnCell}
                                cell={cell}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                key={cell.id}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default BoardComponent;