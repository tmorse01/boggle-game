import React, { useState } from "react";
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
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Navigate to results page when game is finished
  React.useEffect(() => {
    if (boggle.gameState === "finished" && boggle.results) {
      navigate("/results", {
        state: {
          results: boggle.results,
          grid: boggle.grid,
          score: boggle.score,
          foundWords: boggle.foundWords,
          darkMode,
          soundEnabled,
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
    darkMode,
    soundEnabled,
  ]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleBackToHome = () => {
    if (soundEnabled) {
      // Play sound effect (if available)
      const audio = new Audio("/click.mp3");
      audio.play().catch(() => {
        // Fail silently if sound can't be played
      });
    }
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-br from-blue-500 to-indigo-600"
      } text-white transition-all duration-300`}
    >
      <div className="w-full flex items-center justify-between p-4 bg-white/20 dark:bg-gray-800/60 shadow-md backdrop-blur-sm">
        <button
          onClick={handleBackToHome}
          className="text-yellow-400 dark:text-yellow-400 font-medium hover:underline flex items-center gap-2"
        >
          <span>←</span> Back to Home
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-center text-white dark:text-yellow-400">
          Boggle Blitz
        </h1>

        <div className="flex gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/30 dark:bg-gray-700 text-white dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full bg-white/30 dark:bg-gray-700 text-white dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle sound"
          >
            {soundEnabled ? "🔊" : "🔇"}
          </button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="max-w-5xl mx-auto">
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
        </div>
      </div>

      <footer className="py-4 px-4 bg-white/10 dark:bg-gray-800/30 text-center">
        <p className="text-sm text-white/70 dark:text-gray-400">
          Made with ❤️ using React + TypeScript
        </p>
      </footer>
    </div>
  );
};

export default GamePage;
