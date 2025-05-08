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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center my-6">
          Boggle Game
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <Timer timeLeft={boggle.timeLeft} />
            <Score score={boggle.score} />
            <WordList words={boggle.foundWords} />
          </div>

          <div className="md:col-span-2 flex flex-col items-center">
            <Board
              grid={boggle.grid}
              onSelectTile={boggle.selectTile}
              selectedPath={boggle.selectedPath}
              showAnimation={boggle.showWordAnimation}
            />
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
    </div>
  );
};

export default GamePage;
