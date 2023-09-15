import './App.css';
import React, { useState } from "react";
import LandingPage from "./LandingPage";
import Quiz from "./Quiz";

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleGetStartedClick = () => {
    setShowQuiz(true);
  };

  return (
    <div className="app">
      {showQuiz ? (
        <Quiz />
      ) : (
        <LandingPage onGetStartedClick={handleGetStartedClick} />
      )}
    </div>
  );
}

export default App;

