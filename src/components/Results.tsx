import React from "react";
import type { GameResults } from "../types";
import { calculateScore } from "../utils/gridUtils";

interface ResultsProps {
  results: GameResults;
  resetGame: () => void;
}

const Results: React.FC<ResultsProps> = ({ results, resetGame }) => {
  const { foundWords, missedWords, allPossibleWords, score } = results;

  const groupWordsByLength = (words: string[]) => {
    const grouped: Record<number, string[]> = {};
    words.forEach((word) => {
      const length = word.length;
      if (!grouped[length]) grouped[length] = [];
      grouped[length].push(word);
    });

    return Object.entries(grouped)
      .sort(([lenA], [lenB]) => Number(lenB) - Number(lenA))
      .map(([length, words]) => ({
        length: Number(length),
        words: words.sort(),
      }));
  };

  const foundWordsGrouped = groupWordsByLength(foundWords);
  const missedWordsGrouped = groupWordsByLength(missedWords);

  const foundPercentage =
    Math.round((foundWords.length / allPossibleWords.length) * 100) || 0;
  const maxPossibleScore = allPossibleWords.reduce(
    (total, word) => total + calculateScore(word),
    0
  );
  const scorePercentage = Math.round((score / maxPossibleScore) * 100) || 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl mx-auto animate-fadeIn">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Game Results
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        <div className="text-center">
          <div className="text-gray-600 dark:text-gray-400">Your Score</div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            {score}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-500">
            out of {maxPossibleScore} possible points ({scorePercentage}%)
          </div>
        </div>

        <div className="text-center">
          <div className="text-gray-600 dark:text-gray-400">Words Found</div>
          <div className="text-4xl font-bold text-green-600 dark:text-green-400">
            {foundWords.length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-500">
            out of {allPossibleWords.length} possible words ({foundPercentage}%)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400 border-b pb-2">
            Words You Found
          </h3>

          {foundWordsGrouped.length === 0 ? (
            <p className="text-gray-500 italic">You didn't find any words.</p>
          ) : (
            <div className="space-y-4">
              {foundWordsGrouped.map((group) => (
                <div key={`found-${group.length}`}>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">
                    {group.length} letters ({calculateScore(group.words[0])}{" "}
                    points each)
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {group.words.map((word) => (
                      <span
                        key={word}
                        className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400 border-b pb-2">
            Missed Words
          </h3>

          {missedWordsGrouped.length === 0 ? (
            <p className="text-gray-500 italic">
              You found all possible words!
            </p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {missedWordsGrouped.map((group) => (
                <div key={`missed-${group.length}`}>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">
                    {group.length} letters ({calculateScore(group.words[0])}{" "}
                    points each)
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {group.words.map((word) => (
                      <span
                        key={word}
                        className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-sm"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={resetGame}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-200 transform hover:scale-105"
        >
          Play Another Game
        </button>
      </div>
    </div>
  );
};

export default Results;
