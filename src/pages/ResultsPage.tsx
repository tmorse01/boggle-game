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
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as ResultsLocationState | undefined;

  // If no state is passed, redirect to home
  React.useEffect(() => {
    if (!locationState) {
      navigate("/");
    }
  }, [locationState, navigate]);

  if (!locationState) {
    return <div>Loading...</div>;
  }

  return (
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
            resetGame={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
