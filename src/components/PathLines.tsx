import React from "react";
import type { Position } from "../types";

interface PathLinesProps {
  selectedPath: Position[];
  tileSize: number;
  margin: number;
  gridGap?: number; // Added to account for the gap between grid cells
}

const PathLines: React.FC<PathLinesProps> = ({
  selectedPath,
  tileSize,
  margin,
  gridGap = 4, // Default to 4px (gap-1 in Tailwind) if not provided
}) => {
  if (selectedPath.length < 2) return null; // Calculate the center position of a tile
  const getTileCenter = (position: Position) => {
    // For w-16 (64px) tiles with m-1 (4px) margin and gap-1 (4px) grid gap
    // Each tile's position needs to account for its own margins plus the grid gap

    // Include grid gap in calculation - each position after the first adds another gap
    const gridGapOffset = position.col > 0 ? position.col * gridGap : 0;
    const gridGapOffsetY = position.row > 0 ? position.row * gridGap : 0;

    // Base size of a tile with its margins
    const tileWithMargin = tileSize + margin * 2; // 64 + (4 * 2) = 72px per grid cell

    // Calculate center positions including grid gaps
    const centerX =
      position.col * tileWithMargin + tileSize / 2 + margin + gridGapOffset;
    const centerY =
      position.row * tileWithMargin + tileSize / 2 + margin + gridGapOffsetY;

    return { x: centerX, y: centerY };
  };

  // Generate SVG path coordinates
  const pathPoints = selectedPath.map(getTileCenter);

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {/* Draw lines between points */}
      {pathPoints.map((point, index) => {
        if (index === 0) return null; // Skip first point, no line to draw yet

        const prevPoint = pathPoints[index - 1];
        return (
          <line
            key={`line-${index}`}
            x1={prevPoint.x}
            y1={prevPoint.y}
            x2={point.x}
            y2={point.y}
            stroke="#3b82f6" // blue-500 to match selected tile color
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
        );
      })}

      {/* Draw circles at connection points for better visual */}
      {pathPoints.map((point, index) => (
        <circle
          key={`point-${index}`}
          cx={point.x}
          cy={point.y}
          r="3"
          fill="#3b82f6"
          opacity="0.8"
        />
      ))}
    </svg>
  );
};

export default PathLines;
