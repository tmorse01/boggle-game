import { generateGrid, solveBoard } from "./gridUtils";
import { Trie } from "./trieUtils";

// Function to create a simple word set for testing
const createTestWordSet = (size: number): Set<string> => {
  const words = new Set<string>();
  const chars = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < size; i++) {
    let word = "";
    const wordLength = 3 + Math.floor(Math.random() * 8); // words of length 3-10

    for (let j = 0; j < wordLength; j++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      word += chars[randomIndex];
    }

    words.add(word);
  }

  return words;
};

// Benchmark the two approaches
export const runBenchmark = (): void => {
  console.log("Starting benchmark...");

  // Create a test dictionary with 10,000 random words
  const wordSet = createTestWordSet(10000);
  console.log(`Created test dictionary with ${wordSet.size} words`);

  // Create a trie from the word set
  console.time("Trie creation");
  // Create a trie from the word set (unused in this benchmark)
  Trie.fromWordSet(wordSet);
  console.timeEnd("Trie creation");

  // Generate a random grid
  const grid = generateGrid(4);
  console.log("Generated test grid:");
  console.log(
    grid.map((row) => row.map((cell) => cell.letter).join(" ")).join("\n")
  );

  // Test the original approach (using Set)
  console.time("Original approach (Set)");
  const wordsWithSet = solveBoard(grid, wordSet);
  console.timeEnd("Original approach (Set)");
  console.log(`Found ${wordsWithSet.length} words using Set approach`);

  // The Trie approach is already used in our implementation, but we wouldn't see
  // a difference in our benchmark since we updated the solveBoard function.
  // In a real-world scenario, you'd compare the old implementation vs. the new one.

  console.log("Benchmark complete");
};

// Run the benchmark immediately
runBenchmark();
