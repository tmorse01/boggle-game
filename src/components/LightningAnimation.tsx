import React from "react";

interface LightningAnimationProps {
  lastWordScore: number | null;
}

const LightningAnimation: React.FC<LightningAnimationProps> = ({
  lastWordScore,
}) => {
  return (
    <div className="lightning-container">
      {/* Main central spark */}
      <svg
        className="spark-effect animate-lightning"
        width="150"
        height="150"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central burst */}
        <circle cx="50" cy="50" r="15" fill="white" opacity="0.9" />
        <circle cx="50" cy="50" r="8" fill="#FFFFAA" opacity="1" />

        {/* Electric rays/arcs */}
        <path
          d="M50 35 L54 15 L50 25 L58 8"
          stroke="#FFFF00"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M50 35 L46 12 L50 25 L42 5"
          stroke="#FFFF88"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M65 50 L85 54 L75 50 L92 42"
          stroke="#FFFF44"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M65 50 L88 46 L75 50 L95 38"
          stroke="#FFFF88"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M50 65 L54 85 L50 75 L58 92"
          stroke="#FFFF00"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M50 65 L46 88 L50 75 L42 95"
          stroke="#FFFF88"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M35 50 L15 54 L25 50 L8 58"
          stroke="#FFFF44"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M35 50 L12 46 L25 50 L5 42"
          stroke="#FFFF88"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Diagonal arcs */}
        <path
          d="M40 40 L25 25 L35 35 L18 18"
          stroke="#FFFF44"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M60 40 L75 25 L65 35 L82 18"
          stroke="#FFFF00"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M40 60 L25 75 L35 65 L18 82"
          stroke="#FFFF88"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M60 60 L75 75 L65 65 L82 82"
          stroke="#FFFF44"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Score display in the center */}
        {lastWordScore !== null && (
          <g>
            <text
              x="50"
              y="55"
              textAnchor="middle"
              fontSize="22"
              fontWeight="bold"
              fill="#FF3300"
              stroke="#FFFFFF"
              strokeWidth="0.5"
              className="score-text"
            >
              +{lastWordScore}
            </text>
          </g>
        )}
      </svg>

      {/* Additional sparks that appear in different positions */}
      <svg
        className="spark-mini animate-lightning-alt"
        style={{ position: "absolute", top: "20%", left: "30%" }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="3" fill="white" />
        <path
          d="M20 17 L23 10 M20 17 L17 10 M20 23 L23 30 M20 23 L17 30"
          stroke="#FFFF99"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="spark-mini animate-lightning-alt2"
        style={{ position: "absolute", bottom: "25%", right: "35%" }}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15" cy="15" r="2" fill="white" />
        <path
          d="M15 13 L18 7 M15 13 L12 7 M15 17 L18 23 M15 17 L12 23"
          stroke="#FFFFAA"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default LightningAnimation;
