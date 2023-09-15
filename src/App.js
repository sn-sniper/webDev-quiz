import "./App.css";
import React, { useState } from "react";
import LandingPage from "./LandingPage";
import Quiz from "./Quiz";

function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [timer, setTimer] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [shortID, setShortID] = useState("");

  const handleGetStartedClick = () => {
    const enteredID = prompt("Enter a 6-character numerical ID:");
    if (enteredID && /^[0-9]{6}$/.test(enteredID)) {
      setShortID(enteredID);
      setQuizStarted(true);
      setTimer(300); // 300 seconds = 5 minutes
      setShowQuiz(true);
    } else {
      alert("Please enter a valid 6-character numerical ID.");
    }
  };


  return (
    <div className="app">
      {showQuiz ? (
        <Quiz shortID={shortID} />
      ) : (
      <LandingPage onGetStartedClick={handleGetStartedClick} />
    )}
    </div>
  );
}

export default App;
