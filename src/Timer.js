import React, {useState, useEffect} from "react";


const Timer = () => {
    const [hour, setHour] = useState("00");
    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState("00");
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);

    function startTimer() {
        setIsActive(true);
    }

    let clear;

    function stopTimer() {
        setIsActive(false);
        setCounter(counter);
        setSecond(second);
        setMinute(minute);
        setHour(hour);
        clear = setInterval(() => {
            setCounter(0);
            setSecond("00");
            setMinute("00");
            setHour("00");
            clearInterval(clear);
        }, 0);
    }

    function resetTimer() {
        setIsActive(true);
        setCounter(0);
        setSecond("00");
        setMinute("00");
        setHour("00");
    }

    let lastPress = 0;

    function waitTimer() {
        const time = new Date().getTime();
        const delta = time - lastPress;
        const pressDelay = 300;
        if (delta < pressDelay) {
            setIsActive(false);
            setCounter(counter);
            setSecond(second);
            setMinute(minute);
            setHour(hour);
        }
        lastPress = time;
    }

    useEffect(() => {
        let intervalId;
        if (isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);
                const hourCounter = Math.floor(counter / 360);

                let computedSecond =
                    String(secondCounter).length === 1
                        ? `0${secondCounter}`
                        : secondCounter;
                let computedMinute =
                    String(minuteCounter).length === 1
                        ? `0${minuteCounter}`
                        : minuteCounter;
                let computedHour =
                    String(hourCounter).length === 1
                        ? `0${hourCounter}`
                        : hourCounter;

                setSecond(computedSecond);
                setMinute(computedMinute);
                setHour(computedHour);
                setCounter((counter) => counter + 1);

            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter]);


    return (
        <div className="container">
            <div className="time">
                <span className="minute">{hour}</span>
                <span>:</span>
                <span className="minute">{minute}</span>
                <span>:</span>
                <span className="second">{second}</span>
            </div>
            <div className="buttons">
                <button onClick={startTimer} className="start">
                    Start
                </button>
                <button onClick={resetTimer} className="reset">
                    Reset
                </button>
                <button onClick={waitTimer} className="wait">
                    Wait
                </button>
                <button onClick={stopTimer} className="stop">
                    Stop
                </button>
            </div>
        </div>
    );
};

export default Timer;
