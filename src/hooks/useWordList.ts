import { useState, useEffect } from "react";
import { Trie } from "../utils/trieUtils";

// Return type includes both the word set and optionally a trie
export interface WordListResult {
  wordSet: Set<string>;
  trie: Trie | null;
}

const useWordList = (useTrie: boolean = false): WordListResult => {
  const [result, setResult] = useState<WordListResult>({
    wordSet: new Set<string>(),
    trie: null,
  });

  useEffect(() => {
    const loadWords = async () => {
      try {
        const response = await fetch("/words.txt");

        if (!response.ok) {
          throw new Error("Failed to load word list");
        }

        const text = await response.text();
        const words = text
          .toLowerCase()
          .split(/\r?\n/)
          .filter((word) => word.trim().length > 0);

        const wordSet = new Set(words);

        // Only create the trie if requested (to save memory)
        const trie = useTrie ? Trie.fromWordSet(wordSet) : null;

        setResult({ wordSet, trie });
      } catch (error) {
        console.error("Error loading word list:", error);
      }
    };

    loadWords();
  }, [useTrie]);

  return result;
};

export default useWordList;
