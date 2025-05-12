import React, { useState } from "react";

interface LandingPageControlsProps {
  onSubmit: (customGrid?: string[][]) => void;
}

const LandingPageControls: React.FC<LandingPageControlsProps> = ({
  onSubmit,
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

        onSubmit(customGrid);
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(`Invalid grid format: ${error.message}`);
        } else {
          alert(`Invalid grid format: ${error}`);
        }
      }
    } else {
      // If no custom grid is provided, submit with undefined to use random grid
      onSubmit(undefined as never);
    }
  };

  const toggleCustomGrid = () => {
    setShowCustomGrid(!showCustomGrid);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={handleStartGame}
        className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        Start Game
      </button>

      <div className="mt-4">
        <button
          onClick={toggleCustomGrid}
          className="px-6 py-3 bg-white text-blue-900 font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
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
  );
};

export default LandingPageControls;
