import type { Grid, Cell, Position } from "../types";
import { Trie } from "./trieUtils";

// Dice configuration - Unable to confirm offical english dice configuration
const DICE = [
  "AAEEGN",
  "ABBJOO",
  "ACHOPS",
  "AFFKPS",
  "AOOTTW",
  "CIMOTU",
  "DEILRX",
  "DELRVY",
  "DISTTY",
  "EEGHNW",
  "EEINSU",
  "EHRTVW",
  "EIOSST",
  "ELRTTY",
  "HIMNUQ",
  "HLNNRZ",
];

// Special handling for 'Q' to include 'U' after it
const handleQ = (letter: string): string => {
  return letter === "Q" ? "Qu" : letter;
};

// Generate a random grid for a new game
export const generateGrid = (
  size: number = 4,
  presetGrid?: string[][]
): Grid => {
  // If a preset grid is provided, convert it to our Grid type
  if (
    presetGrid?.length === size &&
    presetGrid.every((row) => row.length === size)
  ) {
    return presetGrid.map((row, rowIndex) =>
      row.map((letter, colIndex) => ({
        letter: letter.toUpperCase(),
        row: rowIndex,
        col: colIndex,
      }))
    );
  }

  // Create a copy of the dice to shuffle
  const shuffledDice = [...DICE];

  // Shuffle the dice
  for (let i = shuffledDice.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDice[i], shuffledDice[j]] = [shuffledDice[j], shuffledDice[i]];
  }

  // Create the grid
  const grid: Grid = [];
  let diceIndex = 0;

  for (let row = 0; row < size; row++) {
    const gridRow: Cell[] = [];
    for (let col = 0; col < size; col++) {
      // Get a random face from the current die
      const die = shuffledDice[diceIndex++];
      const faceIndex = Math.floor(Math.random() * 6);
      const letter = handleQ(die[faceIndex]);

      gridRow.push({ letter, row, col });
    }
    grid.push(gridRow);
  }

  return grid;
};

// Check if a position is valid on the grid
export const isValidPosition = (pos: Position, size: number): boolean => {
  return pos.row >= 0 && pos.row < size && pos.col >= 0 && pos.col < size;
};

// Check if two positions are adjacent
export const areAdjacent = (pos1: Position, pos2: Position): boolean => {
  const rowDiff = Math.abs(pos1.row - pos2.row);
  const colDiff = Math.abs(pos1.col - pos2.col);
  return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
};

// Get all adjacent positions from a given position
export const getAdjacentPositions = (
  pos: Position,
  size: number
): Position[] => {
  const { row, col } = pos;
  const positions: Position[] = [];

  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (
        (r !== row || c !== col) && // Not the same position
        isValidPosition({ row: r, col: c }, size) // Within grid bounds
      ) {
        positions.push({ row: r, col: c });
      }
    }
  }

  return positions;
};

// Calculate the score for a word based on Boggle rules
export const calculateScore = (word: string): number => {
  const length = word.length;

  if (length < 3) return 0;
  if (length === 3 || length === 4) return 1;
  if (length === 5) return 2;
  if (length === 6) return 3;
  if (length === 7) return 5;
  return 11; // 8 or more letters
};

// Convert the grid to a string for display or comparison
export const gridToString = (grid: Grid): string => {
  return grid.map((row) => row.map((cell) => cell.letter).join("")).join("");
};

// Get the word formed by following the selected path
export const getWordFromPath = (grid: Grid, path: Position[]): string => {
  return path.map((pos) => grid[pos.row][pos.col].letter).join("");
};

// Find all possible words on the board (for solving)
export const solveBoard = (
  grid: Grid,
  wordSet: Set<string>,
  existingTrie?: Trie
): string[] => {
  const size = grid.length;
  const foundWords: Set<string> = new Set();
  const minWordLength = 3;

  // Use the provided trie if available or create a new one
  const trie = existingTrie || Trie.fromWordSet(wordSet);

  const dfs = (pos: Position, visited: boolean[][], currentWord: string) => {
    // Check if current prefix can form any word
    if (!trie.startsWith(currentWord.toLowerCase())) {
      return; // Early pruning - this prefix won't lead to any valid word
    }

    // Check if current word is in the wordlist and is long enough
    if (
      currentWord.length >= minWordLength &&
      trie.search(currentWord.toLowerCase())
    ) {
      foundWords.add(currentWord);
    }

    // Get all adjacent positions
    const adjacentPositions = getAdjacentPositions(pos, size);

    for (const nextPos of adjacentPositions) {
      if (!visited[nextPos.row][nextPos.col]) {
        // Mark as visited
        visited[nextPos.row][nextPos.col] = true;

        // Add the letter to the current word
        const nextLetter = grid[nextPos.row][nextPos.col].letter;
        const nextWord = currentWord + nextLetter;

        // Continue DFS
        dfs(nextPos, visited, nextWord);

        // Backtrack
        visited[nextPos.row][nextPos.col] = false;
      }
    }
  };

  // Start DFS from each cell
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const visited = Array(size)
        .fill(null)
        .map(() => Array(size).fill(false));
      visited[row][col] = true;
      dfs({ row, col }, visited, grid[row][col].letter);
    }
  }

  return Array.from(foundWords);
};
