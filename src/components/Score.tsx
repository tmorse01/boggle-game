import React from "react";

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div className="text-2xl font-bold p-3 text-center mb-4">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Score</div>
      <span className="text-blue-600 dark:text-blue-400 transition-all duration-300">
        {score}
      </span>
    </div>
  );
};

export default Score;
