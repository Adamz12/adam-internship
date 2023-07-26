import React, { useEffect, useState } from "react";

const Timer = ({ expiryTimestamp }) => {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const timeDifference = expiryTimestamp - currentTime;
    updateTimer(timeDifference);

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDifference = expiryTimestamp - currentTime;

      if (timeDifference <= 0) {
        clearInterval(interval);
        setTimer("Timer Expired");
      } else {
        updateTimer(timeDifference);
      }
    }, 1000);

    setTimer(interval);

    return () => clearInterval(interval);
  }, [expiryTimestamp]);

  const updateTimer = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    const timerDisplay = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    setTimer(timerDisplay);
  };

  return <div>{timer}</div>;
};

export default Timer;
