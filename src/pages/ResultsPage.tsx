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

  const handlePlayAgain = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center my-6">
          Game Results
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <Score score={locationState.score} />

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
              <h2 className="text-xl font-semibold mb-3">Words Found</h2>
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

          <div className="md:col-span-2 flex flex-col items-center">
            <Board
              grid={locationState.grid}
              onSelectTile={() => {}}
              showAnimation={false}
              disabled={true}
            />

            <Results
              results={locationState.results}
              resetGame={handlePlayAgain}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
