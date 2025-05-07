import React from "react";
import type { Cell, Position } from "../types";

interface TileProps {
  cell: Cell;
  isSelected: boolean;
  isLastSelected: boolean;
  onSelect: (position: Position) => void;
}

const Tile: React.FC<TileProps> = ({
  cell,
  isSelected,
  isLastSelected,
  onSelect,
}) => {
  const handleClick = () => {
    onSelect({ row: cell.row, col: cell.col });
  };

  return (
    <button
      className={`
        w-16 h-16 m-1 rounded-md flex items-center justify-center 
        font-bold text-2xl transition-all duration-200 
        ${
          isSelected
            ? "bg-blue-500 text-white transform scale-105 shadow-lg"
            : "bg-amber-100 text-gray-800 hover:bg-amber-200"
        }
        ${isLastSelected ? "ring-4 ring-blue-300" : ""}
        dark:bg-amber-700 dark:text-gray-100 dark:hover:bg-amber-600
      `}
      onClick={handleClick}
      aria-label={`Tile ${cell.letter}`}
    >
      {cell.letter}
    </button>
  );
};

export default Tile;
