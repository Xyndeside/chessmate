import {Player} from "../models/Player.ts";
import {FC, useEffect, useRef, useState} from "react";
import {Colors} from "../models/Colors.ts";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ( {currentPlayer, restart} ) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        startTimer();
    }, [currentPlayer]);

    function startTimer(): void {
        if (timer.current) {
            clearInterval(timer.current);
        }

        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer

        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer(): void {
        setBlackTime(prev => prev - 1);
    }

    function decrementWhiteTimer(): void {
        setWhiteTime(prev => prev - 1);
    }

    const handleRestart = () => {
        setWhiteTime(300);
        setBlackTime(300);
        restart();
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart game</button>
            </div>

            <h2>Черные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
        </div>
    );
};

export default Timer;