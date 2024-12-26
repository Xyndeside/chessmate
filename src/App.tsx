import './App.css'
import BoardComponent from "./components/BoardComponent.tsx";
import {useEffect, useState} from "react";
import {Board} from "./models/Board.ts";

function App() {
    const [board, setBoard] = useState(new Board());

    useEffect(() => {
        restartGame();
    }, [])

    function restartGame() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    return (
        <div className="app">
            <BoardComponent board={board} setBoard={setBoard} />
        </div>
    )
}

export default App
