import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Board from "../components/Board";
import WordList from "../components/WordList";
import Timer from "../components/Timer";
import Score from "../components/Score";
import Controls from "../components/Controls";
import useBoggle from "../hooks/useBoggle";
import useWordList from "../hooks/useWordList";

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customGrid = location.state?.customGrid;

  // Use the Trie for better performance with word lookups
  const wordListResult = useWordList(true);
  const boggle = useBoggle(wordListResult, customGrid);

  // Start the game automatically when the component mounts
  useEffect(() => {
    // Check if the word set is populated to ensure the word list has loaded
    if (wordListResult.wordSet.size > 0 && boggle.gameState === "idle") {
      boggle.startGame(customGrid);
    }
  }, [wordListResult, boggle, customGrid]);

  // Navigate to results page when game is finished
  React.useEffect(() => {
    if (boggle.gameState === "finished" && boggle.results) {
      navigate("/results", {
        state: {
          results: boggle.results,
          grid: boggle.grid,
          score: boggle.score,
          foundWords: boggle.foundWords,
        },
      });
    }
  }, [
    boggle.gameState,
    boggle.results,
    navigate,
    boggle.grid,
    boggle.score,
    boggle.foundWords,
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 relative">
      {boggle.gameState === "solving" && (
        <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center z-50 rounded-xl">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-white text-lg font-semibold">
              Calculating results...
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col order-2 md:order-1">
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md md:md:p-4 p-2 mb-4 text-blue-900 dark:text-white">
          <Timer timeLeft={boggle.timeLeft} />
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md md:p-4 p-2 mb-4 text-blue-900 dark:text-white">
          <Score score={boggle.score} />
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md md:p-4 p-2 flex-grow overflow-hidden text-blue-900 dark:text-white">
          <WordList words={boggle.foundWords} />
        </div>
      </div>

      <div className="md:col-span-2 flex flex-col items-center order-1 md:order-2">
        <div className="md:min-w-sm bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md md:p-4 p-2 mb-6 w-full flex justify-center text-blue-900 dark:text-white">
          <Board
            grid={boggle.grid}
            onSelectTile={boggle.selectTile}
            selectedPath={boggle.selectedPath}
            showAnimation={boggle.showWordAnimation}
            foundWords={boggle.foundWords}
          />
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md md:p-4 p-2 w-full text-blue-900 dark:text-white">
          <Controls
            startGame={boggle.startGame}
            submitWord={boggle.submitWord}
            resetSelection={boggle.resetSelection}
            currentWord={boggle.currentWord}
            errorMessage={boggle.errorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
