import {Board} from "../models/Board.ts";
import {FC} from "react";
import {Cell} from "../models/Cell.ts";
import CellComponent from "./CellComponent.tsx";
import React from "react";

interface BoardComponentProps {
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardComponentProps> = ( {board} ) => {
    return (
        <div
            className="board"
        >
            {board.cells.map((row: Cell[], index: number) =>
                <React.Fragment key={index}>
                    {row.map((cell: Cell) =>
                        <CellComponent cell={cell} key={cell.id} />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default BoardComponent;