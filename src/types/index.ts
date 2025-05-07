export type Cell = {
  letter: string;
  row: number;
  col: number;
};

export type Grid = Cell[][];

export type Position = {
  row: number;
  col: number;
};

export type GameState = "idle" | "playing" | "finished";

export type GameResults = {
  foundWords: string[];
  missedWords: string[];
  allPossibleWords: string[];
  score: number;
};
