import React from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  backButtonUrl?: string;
  darkMode?: boolean;
  soundEnabled?: boolean;
  onDarkModeToggle?: () => void;
  onSoundToggle?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  showBackButton = false,
  backButtonUrl = "/",
  darkMode = false,
  soundEnabled = true,
  onDarkModeToggle,
  onSoundToggle,
}) => {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    if (soundEnabled) {
      // Play sound effect (if available)
      const audio = new Audio("/click.mp3");
      audio.play().catch(() => {
        // Fail silently if sound can't be played
      });
    }
    navigate(backButtonUrl);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-br from-blue-500 to-indigo-600"
      } text-white transition-all duration-300`}
    >
      {/* Header */}
      <div className="w-full flex items-center justify-between p-4 bg-white/20 dark:bg-gray-800/60 shadow-md backdrop-blur-sm">
        {showBackButton ? (
          <button
            onClick={handleBackNavigation}
            className="text-yellow-400 dark:text-yellow-400 font-medium hover:underline flex items-center gap-2"
          >
            <span>←</span> Back to Home
          </button>
        ) : (
          <div />
        )}

        <h1 className="text-2xl md:text-3xl font-bold text-center text-white dark:text-yellow-400">
          {title}
        </h1>

        <div className="flex gap-2">
          {onDarkModeToggle && (
            <button
              onClick={onDarkModeToggle}
              className="p-2 rounded-full bg-white/30 dark:bg-gray-700 text-white dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          )}
          {onSoundToggle && (
            <button
              onClick={onSoundToggle}
              className="p-2 rounded-full bg-white/30 dark:bg-gray-700 text-white dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle sound"
            >
              {soundEnabled ? "🔊" : "🔇"}
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        <div className="max-w-5xl mx-auto">{children}</div>
      </div>

      {/* Footer */}
      <footer className="py-4 px-4 bg-white/10 dark:bg-gray-800/30 text-center mt-auto">
        <p className="text-sm text-white/70 dark:text-gray-400">
          Made with ❤️ using React + TypeScript
        </p>
      </footer>
    </div>
  );
};

export default Layout;
