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
      border 
      ${
        isSelected
          ? "bg-blue-500 text-white transform scale-110 shadow-2xl border-blue-500"
          : "bg-stone-100 text-stone-800 hover:bg-stone-200 border-stone-300"
      }
      ${isLastSelected ? "ring-4 ring-blue-300" : ""}
      dark:bg-stone-100 dark:text-stone-800 dark:hover:bg-stone-200
      shadow-[inset_0_-3px_0_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)]
      hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.2),0_3px_5px_rgba(0,0,0,0.2)]
      active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
      active:translate-y-0.5
      `}
      onClick={handleClick}
      aria-label={`Tile ${cell.letter}`}
    >
      {cell.letter}
    </button>
  );
};

export default Tile;
