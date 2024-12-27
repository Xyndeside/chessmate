import {Figure} from "../models/figures/Figure.ts";
import {FC} from "react";

interface LostFiguresProps {
    title: string;
    figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ( {title, figures} ) => {
    return (
        <div className="lost">
            <h3>{title}</h3>

            {figures.map(figure =>
                <div key={figure.id}>
                    {figure.name} {figure.logo && <img width={20} height={20} src={figure.logo} alt="figure logo"/> }
                </div>
            )}
        </div>
    );
};

export default LostFigures;