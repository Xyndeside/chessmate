import {Cell} from "../models/Cell.ts";
import {FC} from "react";

interface CellComponentProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}

const CellComponent: FC<CellComponentProps> = ( {cell, selected, click} ) => {
    return (
        <div
            className={[
                'cell',
                cell.color,
                selected ? 'selected' : '',
                cell.available && cell.figure ? 'attacked' : '',
            ].join(" ")}
            onClick={() => click(cell)}
        >
            {cell.available && !cell.figure && <div className='available'/>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
        </div>
    );
};

export default CellComponent;