import React from "react";
import { useNavigate } from "react-router-dom";
import LandingPageControls from "../components/LandingPageControls";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = (customGrid?: string[][]) => {
    navigate("/game", {
      state: {
        customGrid,
      },
    });
  };

  return (
    <div className="text-center mt-16">
      <h1 className="text-5xl font-bold mb-4 animate-bounce">
        <span className="mr-2 text-5xl animate-pulse">⚡</span>Boggle Bolt!
      </h1>
      <p className="text-lg mb-8 max-w-xl mx-auto flex items-center justify-center">
        Find as many words as you can before the timer runs out! Challenge
        yourself or compete with friends in this fast-paced word game.
      </p>
      <div className="max-w-xl mx-auto">
        <LandingPageControls onSubmit={handleStartGame} />
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
        <div className="bg-white text-blue-900 rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
          <h3 className="font-bold mb-2 text-lg">⏱ 3-Minute Timer</h3>
          <p>Race against the clock to score big!</p>
        </div>
        <div className="bg-white text-blue-900 rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
          <h3 className="font-bold mb-2 text-lg">🌎 Real Dictionary</h3>
          <p>Play using thousands of real English words.</p>
        </div>
        <div className="bg-white text-blue-900 rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
          <h3 className="font-bold mb-2 text-lg">🎨 Custom Boards</h3>
          <p>Play with random or preset letter grids.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
