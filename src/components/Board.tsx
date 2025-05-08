import React from "react";
import Tile from "./Tile";
import type { Grid, Position } from "../types";

interface BoardProps {
  grid: Grid;
  selectedPath?: Position[];
  onSelectTile: (position: Position) => void;
  showAnimation?: boolean;
  disabled?: boolean;
}

const Board: React.FC<BoardProps> = ({
  grid,
  selectedPath,
  onSelectTile,
  showAnimation,
  disabled = false,
}) => {
  const isInPath = (row: number, col: number) => {
    return selectedPath?.some((pos) => pos.row === row && pos.col === col);
  };

  const isLastInPath = (row: number, col: number) => {
    if (selectedPath?.length === 0) return false;
    const lastPos = selectedPath?.[selectedPath.length - 1];
    return lastPos?.row === row && lastPos.col === col;
  };

  return (
    <div
      className={`
      bg-yellow-500 p-4 rounded-lg shadow-lg mb-6
      transition-all duration-500
      ${showAnimation ? "animate-pulse scale-105" : ""}
      ${disabled ? "opacity-50 pointer-events-none" : ""}
    `}
    >
      <div className="grid grid-cols-4 gap-1">
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
    </div>
  );
};

export default Board;
