import {Cell} from "../models/Cell.ts";
import {FC} from "react";

interface CellComponentProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
    boardRotate: string;
}

const CellComponent: FC<CellComponentProps> = ( {cell, selected, click, boardRotate} ) => {
    return (
        <div
            className={[
                'cell',
                cell.color,
                selected ? 'selected' : '',
                cell.available && cell.figure ? 'attacked' : '',
                boardRotate ? 'cell-rotate' : ''
            ].join(" ")}
            onClick={() => click(cell)}
        >
            {cell.available && !cell.figure && <div className='available'/>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
        </div>
    );
};

export default CellComponent;