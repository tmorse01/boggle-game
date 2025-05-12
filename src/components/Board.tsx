import React from "react";
import Tile from "./Tile";
import PathLines from "./PathLines";
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
      bg-yellow-500 p-4 rounded-lg shadow-lg
      transition-all duration-500 relative
      ${showAnimation ? "animate-pulse scale-105" : ""}
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

      {showAnimation && (
        <div className="lightning-container">
          {/* Main central spark */}
          <svg
            className="spark-effect animate-lightning"
            width="150"
            height="150"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Central burst */}
            <circle cx="50" cy="50" r="15" fill="white" opacity="0.9" />
            <circle cx="50" cy="50" r="8" fill="#FFFFAA" opacity="1" />

            {/* Electric rays/arcs */}
            <path
              d="M50 35 L54 15 L50 25 L58 8"
              stroke="#FFFF00"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M50 35 L46 12 L50 25 L42 5"
              stroke="#FFFF88"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M65 50 L85 54 L75 50 L92 42"
              stroke="#FFFF44"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M65 50 L88 46 L75 50 L95 38"
              stroke="#FFFF88"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M50 65 L54 85 L50 75 L58 92"
              stroke="#FFFF00"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M50 65 L46 88 L50 75 L42 95"
              stroke="#FFFF88"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M35 50 L15 54 L25 50 L8 58"
              stroke="#FFFF44"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M35 50 L12 46 L25 50 L5 42"
              stroke="#FFFF88"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Diagonal arcs */}
            <path
              d="M40 40 L25 25 L35 35 L18 18"
              stroke="#FFFF44"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M60 40 L75 25 L65 35 L82 18"
              stroke="#FFFF00"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M40 60 L25 75 L35 65 L18 82"
              stroke="#FFFF88"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M60 60 L75 75 L65 65 L82 82"
              stroke="#FFFF44"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Score display in the center */}
            {lastWordScore !== null && (
              <g>
                <text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  fontSize="22"
                  fontWeight="bold"
                  fill="#FF3300"
                  stroke="#FFFFFF"
                  strokeWidth="0.5"
                  className="score-text"
                >
                  +{lastWordScore}
                </text>
              </g>
            )}
          </svg>

          {/* Additional sparks that appear in different positions */}
          <svg
            className="spark-mini animate-lightning-alt"
            style={{ position: "absolute", top: "20%", left: "30%" }}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="3" fill="white" />
            <path
              d="M20 17 L23 10 M20 17 L17 10 M20 23 L23 30 M20 23 L17 30"
              stroke="#FFFF99"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <svg
            className="spark-mini animate-lightning-alt2"
            style={{ position: "absolute", bottom: "25%", right: "35%" }}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15" cy="15" r="2" fill="white" />
            <path
              d="M15 13 L18 7 M15 13 L12 7 M15 17 L18 23 M15 17 L12 23"
              stroke="#FFFFAA"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Board;
