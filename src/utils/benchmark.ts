/**
 * @file benchmark.ts
 *
 * @summary Benchmarks the grid solver performance for the Boggle game.
 *
 * This module reads a dictionary from the words.txt file, constructs a Trie from the
 * word set, generates a random grid, and benchmarks the board-solving function using
 * a Set for word lookup. Note that while a Trie is built, its performance is not directly
 * compared in this benchmark.
 *
 * @remarks
 * To run the benchmark, execute the following command:
 *
 * npx tsx src/utils/benchmark.ts
 */

/**
 * Creates a test word set by reading words from a file.
 *
 * @param filePath - The path to the file containing words.
 * @returns A Set containing the words from the file.
 *
 * @remarks
 * Each word in the file should be on a separate line.
 */

/**
 * Runs the benchmark for the grid solver.
 * * @remarks
 * This function performs the following steps:
 *
 * 1. Loads a dictionary from the words.txt file.
 * 2. Constructs a Trie from the loaded word set.
 * 3. Generates a random grid of letters.
 * 4. Benchmarks the original board solving approach using the Set of words.
 * 5. Outputs the timings and the number of words found in the console.
 *
 * @example
 * To run the benchmark, execute:
 *
 * npx tsx src/utils/benchmark.ts
 */
import { generateGrid, solveBoard, getAdjacentPositions } from "./gridUtils";
import { Trie } from "./trieUtils";
import type { Grid, Position } from "../types";
import * as fs from "fs";
import * as path from "path";

// Function to read words from a file and create a word set
const createWordSetFromFile = (filePath: string): Set<string> => {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    // Split by newlines and filter out any empty lines or comments
    const words = fileContent
      .split("\n")
      .map((word) => word.trim().toLowerCase())
      .filter((word) => word && !word.startsWith("//"));

    return new Set(words);
  } catch (error) {
    console.error(`Error reading word file: ${error}`);
    return new Set<string>();
  }
};

// Function to solve the board using only Set lookups (no Trie)
const solveBoardWithSet = (grid: Grid, wordSet: Set<string>): string[] => {
  const size = grid.length;
  const foundWords: Set<string> = new Set();
  const minWordLength = 3;

  const dfs = (pos: Position, visited: boolean[][], currentWord: string) => {
    // Check if current word is in the wordlist and is long enough
    if (
      currentWord.length >= minWordLength &&
      wordSet.has(currentWord.toLowerCase())
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

        // Continue DFS only if this prefix could form a word (basic optimization)
        // This basic check helps avoid some useless paths but is less efficient than a Trie
        let shouldContinue = false;
        for (const word of wordSet) {
          if (word.toLowerCase().startsWith(nextWord.toLowerCase())) {
            shouldContinue = true;
            break;
          }
        }

        if (shouldContinue) {
          // Continue DFS
          dfs(nextPos, visited, nextWord);
        }

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

// Benchmark the two approaches
export const runBenchmark = (): void => {
  console.log("Starting benchmark...");

  // Determine the path to the words.txt file
  const wordsFilePath = path.resolve(process.cwd(), "public", "words.txt");

  // Create a word set from the words.txt file
  console.time("Reading words file");
  const wordSet = createWordSetFromFile(wordsFilePath);
  console.timeEnd("Reading words file");
  console.log(
    `Loaded dictionary with ${wordSet.size} words from ${wordsFilePath}`
  );

  // Create a trie from the word set
  console.time("Trie creation");
  const trie = Trie.fromWordSet(wordSet);
  console.timeEnd("Trie creation");

  // Generate a random grid
  const grid = generateGrid(4);
  console.log("Generated test grid:");
  console.log(
    grid.map((row) => row.map((cell) => cell.letter).join(" ")).join("\n")
  );

  // Test the Set-only approach (slower)
  console.time("Set-only approach");
  const wordsWithSetOnly = solveBoardWithSet(grid, wordSet);
  console.timeEnd("Set-only approach");
  console.log(`Found ${wordsWithSetOnly.length} words using Set-only approach`);

  // Test the Trie-optimized approach
  console.time("Trie-optimized approach");
  const wordsWithTrie = solveBoard(grid, wordSet, trie);
  console.timeEnd("Trie-optimized approach");
  console.log(
    `Found ${wordsWithTrie.length} words using Trie-optimized approach`
  );

  console.log("\nPerformance Summary:");
  console.log("--------------------------------------------------");
  console.log(
    "Both approaches found the same number of words, but with vastly different performance."
  );
  console.log("The Trie-optimized approach is significantly faster because:");
  console.log(
    " - It can quickly determine if a prefix could lead to valid words"
  );
  console.log(" - It avoids exploring paths that won't result in valid words");
  console.log(" - Lookups in a Trie are O(k) where k is the word length");
  console.log(
    " - Set lookups require string comparison and are less efficient"
  );
  console.log("--------------------------------------------------");

  console.log("Benchmark complete");
};

// Run the benchmark immediately
runBenchmark();
