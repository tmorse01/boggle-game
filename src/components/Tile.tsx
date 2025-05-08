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
          ? "bg-stone-50 text-stone-900 transform scale-105 shadow-lg"
          : "bg-stone-100 text-stone-800 hover:bg-stone-200"
      }
      ${isLastSelected ? "ring-4 ring-blue-300" : ""}
      dark:bg-stone-100 dark:text-stone-800 dark:hover:bg-stone-200
      `}
      onClick={handleClick}
      aria-label={`Tile ${cell.letter}`}
    >
      {cell.letter}
    </button>
  );
};

export default Tile;
