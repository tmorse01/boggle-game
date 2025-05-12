import React from "react";
import Tile from "./Tile";
import PathLines from "./PathLines";
import LightningAnimation from "./LightningAnimation";
import type { Grid, Position } from "../types";
import { calculateScore } from "../utils/gridUtils";

interface BoardProps {
  grid: Grid;
  selectedPath?: Position[];
  onSelectTile: (position: Position) => void;
  showAnimation?: boolean;
  disabled?: boolean;
  foundWords?: string[];
}

const Board: React.FC<BoardProps> = ({
  grid,
  selectedPath,
  onSelectTile,
  showAnimation,
  disabled = false,
  foundWords = [],
}) => {
  const isInPath = (row: number, col: number) => {
    return selectedPath?.some((pos) => pos.row === row && pos.col === col);
  };

  const isLastInPath = (row: number, col: number) => {
    if (selectedPath?.length === 0) return false;
    const lastPos = selectedPath?.[selectedPath.length - 1];
    return lastPos?.row === row && lastPos.col === col;
  };

  // Get the last word's score if a word was just submitted
  const getLastWordScore = () => {
    if (!showAnimation || foundWords.length === 0) return null;

    const lastWord = foundWords[foundWords.length - 1];
    return calculateScore(lastWord);
  };

  const lastWordScore = getLastWordScore();
  return (
    <div
      className={`
      w-[332px] h-[332px]
      bg-yellow-500 p-4 rounded-lg shadow-lg
      transition-all duration-200 relative
      ${showAnimation ? "animate-pulse scale-102" : ""}
      ${disabled ? "opacity-90 pointer-events-none" : ""}
    `}
    >
      <div className="grid grid-cols-4 gap-1 relative">
        {selectedPath && selectedPath.length > 0 && (
          <PathLines
            selectedPath={selectedPath}
            tileSize={64} // Match the w-16 (4rem = 64px) in Tile.tsx
            margin={4} // Match the m-1 (0.25rem = 4px) in Tile.tsx
            gridGap={4} // Match the gap-1 (0.25rem = 4px) in the grid
          />
        )}
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              isSelected={isInPath(rowIndex, colIndex) ?? false}
              isLastSelected={isLastInPath(rowIndex, colIndex)}
              onSelect={onSelectTile}
            />
          ))
        )}
      </div>
      {showAnimation && <LightningAnimation lastWordScore={lastWordScore} />}
    </div>
  );
};

export default Board;
