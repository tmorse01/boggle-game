import React from "react";
import { useNavigate } from "react-router-dom";
import Board from "../components/Board";
import WordList from "../components/WordList";
import Timer from "../components/Timer";
import Score from "../components/Score";
import Controls from "../components/Controls";
import useBoggle from "../hooks/useBoggle";
import useWordList from "../hooks/useWordList";

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const wordSet = useWordList();
  const boggle = useBoggle(wordSet);

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="flex flex-col order-2 md:order-1">
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md p-4 mb-4 text-blue-900 dark:text-white">
          <Timer timeLeft={boggle.timeLeft} />
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md p-4 mb-4 text-blue-900 dark:text-white">
          <Score score={boggle.score} />
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md p-4 flex-grow overflow-hidden text-blue-900 dark:text-white">
          <WordList words={boggle.foundWords} />
        </div>
      </div>

      <div className="md:col-span-2 flex flex-col items-center order-1 md:order-2">
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md p-4 mb-6 w-full flex justify-center text-blue-900 dark:text-white">
          <Board
            grid={boggle.grid}
            onSelectTile={boggle.selectTile}
            selectedPath={boggle.selectedPath}
            showAnimation={boggle.showWordAnimation}
            foundWords={boggle.foundWords}
          />
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md p-4 w-full text-blue-900 dark:text-white">
          <Controls
            startGame={boggle.startGame}
            submitWord={boggle.submitWord}
            resetSelection={boggle.resetSelection}
            currentWord={boggle.currentWord}
            gameState={boggle.gameState}
            errorMessage={boggle.errorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
