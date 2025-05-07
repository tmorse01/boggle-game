import { useState, useEffect } from "react";

const useWordList = (): Set<string> => {
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());

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
        setWordSet(new Set(words));
      } catch (error) {
        console.error("Error loading word list:", error);
      }
    };

    loadWords();
  }, []);

  return wordSet;
};

export default useWordList;
