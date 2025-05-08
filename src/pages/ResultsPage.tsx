import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Board from "../components/Board";
import Results from "../components/Results";
import Score from "../components/Score";
import type { GameResults, Grid } from "../types";

interface ResultsLocationState {
  results: GameResults;
  grid: Grid;
  score: number;
  foundWords: string[];
  darkMode?: boolean;
  soundEnabled?: boolean;
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as ResultsLocationState | undefined;
  const [darkMode, setDarkMode] = React.useState(
    locationState?.darkMode || false
  );
  const [soundEnabled, setSoundEnabled] = React.useState<boolean>(
    locationState?.soundEnabled ?? true
  );

  // If no state is passed, redirect to home
  React.useEffect(() => {
    if (!locationState) {
      navigate("/");
    }

    // Apply dark mode if it was active in the game
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [locationState, navigate, darkMode]);

  if (!locationState) {
    return <div>Loading...</div>;
  }

  const handlePlayAgain = () => {
    if (soundEnabled) {
      // Play sound effect (if available)
      const audio = new Audio("/click.mp3");
      audio.play().catch(() => {
        // Fail silently if sound can't be played
      });
    }
    navigate("/");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
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
          onClick={handlePlayAgain}
          className="text-yellow-400 dark:text-yellow-400 font-medium hover:underline flex items-center gap-2"
        >
          <span>←</span> Back to Home
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-center text-white dark:text-yellow-400">
          Game Results
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
                <Score score={locationState.score} />
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md p-4 text-blue-900 dark:text-white">
                <h2 className="text-xl font-semibold mb-3 text-blue-900 dark:text-yellow-400">
                  Words Found
                </h2>
                <div className="max-h-64 overflow-y-auto">
                  <ul className="space-y-1">
                    {locationState.foundWords.map((word, index) => (
                      <li
                        key={`found-${index}`}
                        className="text-green-600 dark:text-green-400 font-medium"
                      >
                        {word}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col items-center order-1 md:order-2">
              <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md p-4 mb-6 w-full flex justify-center text-blue-900 dark:text-white">
                <Board
                  grid={locationState.grid}
                  onSelectTile={() => {}}
                  showAnimation={false}
                  disabled={true}
                />
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md p-4 w-full text-blue-900 dark:text-white">
                <Results
                  results={locationState.results}
                  resetGame={handlePlayAgain}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 px-4 bg-white/10 dark:bg-gray-800/30 text-center mt-auto">
        <p className="text-sm text-white/70 dark:text-gray-400">
          Made with ❤️ using React + TypeScript
        </p>
      </footer>
    </div>
  );
};

export default ResultsPage;
