import React from "react";

interface ControlsProps {
  startGame: (customGrid?: string[][], endGame?: boolean) => void;
  submitWord: () => void;
  resetSelection: () => void;
  currentWord?: string;
  errorMessage?: string | null;
}

const Controls: React.FC<ControlsProps> = ({
  startGame,
  submitWord,
  resetSelection,
  currentWord = "",
  errorMessage = null,
}) => {
  return (
    <div>
      <div className="flex flex-col items-center space-y-3">
        <div className="text-2xl font-semibold text-center overflow-hidden transition-all duration-300 min-h-[28px]">
          {errorMessage ? (
            <span className="text-red-600 dark:text-red-400 animate-fadeInOut">
              {errorMessage}
            </span>
          ) : currentWord ? (
            <span className="text-blue-600 dark:text-blue-400">
              {currentWord}
            </span>
          ) : (
            <span className="text-gray-400 italic">
              Select letters to form a word
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={submitWord}
            disabled={!currentWord}
            className={`
              font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-200
              ${
                currentWord
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Submit Word
          </button>

          <button
            onClick={resetSelection}
            disabled={!currentWord}
            className={`
              font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-200
              ${
                currentWord
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Clear Selection
          </button>

          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to roll a new board?")
              ) {
                startGame();
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
          >
            Roll New Board
          </button>

          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to end the current game?")
              ) {
                // We'll pass a signal to end the game prematurely
                startGame(undefined, true);
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
          >
            End Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
