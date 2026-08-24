import { useState, useEffect } from "react";
import useIntervalWhen from "../util/useIntervalWhen.js";

function Timer({ when, setGameOver }) {
  const [seconds, setSeconds] = useState(0);

  useIntervalWhen(
    () => {
      setSeconds((secondTimer) => secondTimer + 1);
    },
    {
      ms: 1000,
      when: when && seconds < 60,
      startImmediately: false,
    },
  );

  useEffect(() => {
    if (seconds >= 60) {
      setGameOver(true);
    }
  }, [seconds, setGameOver]);

  return (
    <div className="timer" data-testid="timer" data-timer={when}>
      {seconds}
    </div>
  );
}

export default Timer;
