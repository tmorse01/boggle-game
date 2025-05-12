import { useState, useEffect, useCallback } from "react";
import type { Grid, Position, GameState, GameResults } from "../types";
import {
  generateGrid,
  areAdjacent,
  calculateScore,
  getWordFromPath,
  solveBoard,
} from "../utils/gridUtils";
import type { WordListResult } from "./useWordList";

const GAME_TIME = 180; // 3 minutes in seconds

const useBoggle = (wordListResult: WordListResult, presetGrid?: string[][]) => {
  const { wordSet, trie } = wordListResult;
  const [grid, setGrid] = useState<Grid>(() => generateGrid(4, presetGrid));
  const [selectedPath, setSelectedPath] = useState<Position[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [results, setResults] = useState<GameResults | null>(null);
  const [showWordAnimation, setShowWordAnimation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle tile selection
  const selectTile = useCallback(
    (position: Position) => {
      if (gameState !== "playing") return;

      setSelectedPath((prevPath) => {
        // Check if the tile is already in the path
        const existingIndex = prevPath.findIndex(
          (p) => p.row === position.row && p.col === position.col
        );

        if (existingIndex !== -1) {
          // If clicking the last selected cell, deselect it
          if (existingIndex === prevPath.length - 1) {
            const newPath = [...prevPath.slice(0, -1)];
            setCurrentWord(getWordFromPath(grid, newPath));
            return newPath;
          }
          // If clicking earlier in the path, truncate to that point
          const newPath = [...prevPath.slice(0, existingIndex + 1)];
          setCurrentWord(getWordFromPath(grid, newPath));
          return newPath;
        }

        // If the path is empty, add the position
        if (prevPath.length === 0) {
          const newPath = [position];
          setCurrentWord(getWordFromPath(grid, newPath));
          return newPath;
        }

        // Check if the new position is adjacent to the last selected position
        const lastPosition = prevPath[prevPath.length - 1];
        if (areAdjacent(lastPosition, position)) {
          const newPath = [...prevPath, position];
          setCurrentWord(getWordFromPath(grid, newPath));
          return newPath;
        }

        // If not adjacent, do not add to the path
        return prevPath;
      });
    },
    [gameState, grid]
  );

  // Submit the current word
  const submitWord = useCallback(() => {
    if (gameState !== "playing" || selectedPath.length === 0) return;
    const word = getWordFromPath(grid, selectedPath);
    const wordLower = word.toLowerCase();
    // Clear any previous error message
    setErrorMessage(null);

    // Check if the word is valid (3+ letters and in dictionary)
    if (word.length < 3) {
      setErrorMessage("Word must be at least 3 letters");
      setTimeout(() => setErrorMessage(null), 1000);
    } else if (!wordSet.has(wordLower)) {
      setErrorMessage("Not a valid word");
      setTimeout(() => setErrorMessage(null), 1000);
    } else if (foundWords.includes(word)) {
      setErrorMessage("Word already found");
      setTimeout(() => setErrorMessage(null), 1000);
    } else {
      // Word is valid and not already found
      const wordScore = calculateScore(word);
      setFoundWords((prev) => [...prev, word]);
      setScore((prev) => prev + wordScore);
      setShowWordAnimation(true);

      // Reset animation after a delay
      setTimeout(() => {
        setShowWordAnimation(false);
      }, 300);
    }

    // Reset path and current word
    setSelectedPath([]);
    setCurrentWord("");
  }, [gameState, grid, selectedPath, wordSet, foundWords]);

  // Reset the current selection
  const resetSelection = useCallback(() => {
    setSelectedPath([]);
    setCurrentWord("");
  }, []);

  // End the game and calculate results
  const endGame = useCallback(() => {
    if (gameState === "playing") {
      setGameState("solving");

      // Use setTimeout to ensure the UI updates before heavy computation
      setTimeout(() => {
        // Find all possible words on the board using pre-built trie for better performance
        // Pass the trie that was already built when loading the word list, if it exists
        const allPossibleWords = solveBoard(grid, wordSet, trie || undefined);

        // Calculate missed words
        const missedWords = allPossibleWords.filter(
          (word) => !foundWords.includes(word)
        );

        setResults({
          foundWords,
          missedWords,
          allPossibleWords,
          score,
        });

        setGameState("finished");
      }, 50); // Small delay to ensure state update and re-render
    }
  }, [gameState, grid, wordSet, trie, foundWords, score]);

  // Generate a new grid when the game starts or end current game
  const startGame = useCallback(
    (customGrid?: string[][], shouldEnd?: boolean) => {
      if (shouldEnd && gameState === "playing") {
        // End the current game without starting a new one using the endGame callback
        endGame();
        return;
      }

      const newGrid = generateGrid(4, customGrid || presetGrid);
      setGrid(newGrid);
      setSelectedPath([]);
      setCurrentWord("");
      setFoundWords([]);
      setScore(0);
      setGameState("playing");
      setTimeLeft(GAME_TIME);
      setResults(null);
    },
    [presetGrid, gameState, endGame]
  );

  const resetGame = useCallback(() => {
    setGrid(generateGrid(4, presetGrid));
    setSelectedPath([]);
    setCurrentWord("");
    setFoundWords([]);
    setScore(0);
    setGameState("idle");
    setTimeLeft(GAME_TIME);
    setResults(null);
  }, [presetGrid]);

  // Timer effect
  useEffect(() => {
    let timer: number;

    if (gameState === "playing" && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState, timeLeft, endGame]);

  return {
    grid,
    selectedPath,
    currentWord,
    foundWords,
    score,
    timeLeft,
    gameState,
    results,
    showWordAnimation,
    errorMessage,
    selectTile,
    submitWord,
    resetSelection,
    startGame,
    endGame,
    resetGame,
  };
};

export default useBoggle;
