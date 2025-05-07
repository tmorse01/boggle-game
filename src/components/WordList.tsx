import React from "react";
import { calculateScore } from "../utils/gridUtils";

interface WordListProps {
  words: string[];
}

const WordList: React.FC<WordListProps> = ({ words }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-h-80 overflow-auto">
      <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">
        Found Words
      </h2>
      {words.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 italic">
          No words found yet...
        </div>
      ) : (
        <ul className="space-y-1">
          {words.map((word, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {word}
              </span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                +{calculateScore(word)}
              </span>
            </li>
          ))}
        </ul>
      )}
      {words.length > 0 && (
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600 text-right">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {words.length} {words.length === 1 ? "word" : "words"} found
          </span>
        </div>
      )}
    </div>
  );
};

export default WordList;
