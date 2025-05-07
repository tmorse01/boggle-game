import React, { useMemo } from "react";

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, [timeLeft]);

  const isLowTime = timeLeft <= 30;

  return (
    <div
      className={`
      text-3xl font-bold mb-4 p-3 rounded-md text-center
      transition-all duration-300
      ${
        isLowTime
          ? "text-red-600 animate-pulse"
          : "text-gray-700 dark:text-gray-200"
      }
    `}
    >
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        Time Left
      </div>
      {formattedTime}
    </div>
  );
};

export default Timer;
