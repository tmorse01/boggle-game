import React, { useState } from "react";
import type { GameState } from "../types";

interface ControlsProps {
  startGame: (customGrid?: string[][], endGame?: boolean) => void;
  submitWord: () => void;
  resetSelection: () => void;
  currentWord?: string;
  gameState?: GameState;
  errorMessage?: string | null;
}

const Controls: React.FC<ControlsProps> = ({
  startGame,
  submitWord,
  resetSelection,
  currentWord = "",
  gameState = "idle",
  errorMessage = null,
}) => {
  const [showCustomGrid, setShowCustomGrid] = useState(false);
  const [customGridInput, setCustomGridInput] = useState("");

  const handleStartGame = () => {
    if (showCustomGrid && customGridInput.trim()) {
      try {
        const rows = customGridInput.trim().split("\n");
        if (rows.length !== 4) throw new Error("Grid must have 4 rows");

        const customGrid = rows.map((row) => {
          const letters = row.trim().split(/\s+/);
          if (letters.length !== 4)
            throw new Error("Each row must have 4 letters");
          return letters;
        });

        startGame(customGrid);
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(`Invalid grid format: ${error.message}`);
        } else {
          alert(`Invalid grid format: ${error}`);
        }
      }
    } else {
      startGame();
    }
  };

  const toggleCustomGrid = () => {
    setShowCustomGrid(!showCustomGrid);
  };

  return (
    <div>
      {gameState === "idle" ||
      gameState === "finished" ||
      gameState === "solving" ? (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleStartGame}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
            >
              {gameState === "idle" ? "Start Game" : "Play Again"}
            </button>

            <button
              onClick={toggleCustomGrid}
              className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
            >
              {showCustomGrid ? "Use Random Grid" : "Use Custom Grid"}
            </button>
          </div>

          {showCustomGrid && (
            <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter 4x4 grid (space-separated letters, one row per line):
              </label>
              <textarea
                value={customGridInput}
                onChange={(e) => setCustomGridInput(e.target.value)}
                placeholder="A B C D\nE F G H\nI J K L\nM N O P"
                className="w-full h-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Example: "A B C D" (first row)
              </div>
            </div>
          )}
        </div>
      ) : (
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

          <div className="flex flex-wrap  gap-3">
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
                } else {
                  return;
                }
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
            >
              Roll New Board
            </button>

            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to end the current game?"
                  )
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
      )}
    </div>
  );
};

export default Controls;
