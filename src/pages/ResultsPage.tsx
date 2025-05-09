import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Board from "../components/Board";
import Results from "../components/Results";
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md p-4 flex justify-center text-blue-900 dark:text-white">
          <Board
            grid={locationState.grid}
            onSelectTile={() => {}}
            showAnimation={false}
            disabled={true}
          />
        </div>

        <div className="flex-2 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md p-4 text-blue-900 dark:text-white">
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
