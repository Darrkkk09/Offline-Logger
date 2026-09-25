import React, { useState, useEffect } from "react";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";


export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname === "/app" ? "/app" : "/";
  });

  // Listen to browser Back/Forward navigation buttons
  useEffect(() => {
    function handlePopState() {
      setCurrentPath(window.location.pathname === "/app" ? "/app" : "/");
    }

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  /**
   * Helper function to navigate between routes without page reload
   */
  function navigateTo(path) {
    const targetPath = path === "/app" ? "/app" : "/";
    window.history.pushState(null, "", targetPath);
    setCurrentPath(targetPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Render Operational Application View for /app
  if (currentPath === "/app") {
    return <Dashboard onNavigateToLanding={() => navigateTo("/")} />;
  }

  // Render Product Landing Page for /
  return <LandingPage onNavigateToApp={() => navigateTo("/app")} />;
}
