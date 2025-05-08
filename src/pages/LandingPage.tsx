import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 flex flex-col items-center justify-center text-gray-800 dark:text-white">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Welcome to Boggle
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
        Find as many words as you can in a 4x4 grid of letters. You have 3
        minutes!
      </p>
      <button
        onClick={handleStartGame}
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xl transition-colors"
      >
        Start Game
      </button>
    </div>
  );
};

export default LandingPage;
