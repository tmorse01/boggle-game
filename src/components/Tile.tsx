import React, { useCallback } from "react";
import type { Cell, Position } from "../types";

interface TileProps {
  cell: Cell;
  isSelected: boolean;
  isLastSelected: boolean;
  onSelect: (position: Position) => void;
}

const Tile: React.FC<TileProps> = ({ cell, isLastSelected, onSelect }) => {
  // Use useCallback to prevent recreating this function on each render
  const handleClick = useCallback(() => {
    onSelect({ row: cell.row, col: cell.col });
  }, [cell.row, cell.col, onSelect]);

  return (
    <button
      className={`
        w-16 h-16 m-1 rounded-md flex items-center justify-center 
        font-bold text-2xl transition-color-only
        border bg-stone-100 text-stone-800 hover:bg-stone-200 border-stone-300
        ${isLastSelected ? "ring-2 ring-blue-500" : ""}
        dark:bg-stone-100 dark:text-stone-800 dark:hover:bg-stone-200
        shadow-[inset_0_-2px_0_rgba(0,0,0,0.1),0_2px_2px_rgba(0,0,0,0.1)]
        hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.2),0_2px_3px_rgba(0,0,0,0.2)]
        active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]
        active:translate-y-0.5 transition-fast
        touch-manipulation select-none
      `}
      onClick={handleClick}
      onTouchStart={handleClick}
      onTouchEnd={(e) => e.preventDefault()} // Prevent ghost click
      onContextMenu={(e) => e.preventDefault()} // Prevent right-click menu on mobile
      aria-label={`Tile ${cell.letter}`}
    >
      {cell.letter}
    </button>
  );
};

export default Tile;
