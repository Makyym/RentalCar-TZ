import { useEffect, useState } from "react";

const Secundomer = () => {
    const [time, setTime] = useState(0);
    const [turnOn, setTurnOn] = useState(false);
    useEffect(() => {
        let intervalId;
        if (turnOn) {
            intervalId = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        };
        return () => clearInterval(intervalId);
    }, [turnOn]);
    const handleStart = () => {
        setTurnOn(true);
    };
    const handlePause = () => {
        setTurnOn(false);
    };
    const handleReset = () => {
        setTurnOn(false);
        setTime(0);
    };
    return (
        <div>
            <p>{time}</p>
            <button type="button" onClick={handleStart}>Start</button>
            <button type="button" onClick={handlePause}>Pause</button>
            <button type="button" onClick={handleReset}>Reset</button>
        </div>
    )
};

export default Secundomer;