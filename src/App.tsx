import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";
import Layout from "./components/Layout";
import "./App.css";

// Wrapper to apply the Layout component to routes while preserving the Outlet functionality
const AppLayout: React.FC = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  // Determine title and back button based on current path
  const getLayoutProps = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
        return {
          title: undefined,
          showBackButton: false,
        };
      case "/game":
        return {
          title: "Boggle Bolt",
          showBackButton: true,
        };
      case "/results":
        return {
          title: "Game Results",
          showBackButton: true,
          backButtonUrl: "/",
        };
      default:
        return {
          title: "Boggle Game",
          showBackButton: false,
        };
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Layout
      {...getLayoutProps()}
      darkMode={darkMode}
      onDarkModeToggle={toggleDarkMode}
    >
      <Outlet />
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
