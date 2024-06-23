import { useEffect } from "react";
import { useState } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return <span>{timer}</span>;
};

export default Timer;
