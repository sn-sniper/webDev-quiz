import React, { useState, useEffect } from "react";
import quizData from "./quizData";
import { firestore, saveScore } from "./firebase"; 
import "./App.css"; // Import your CSS file

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [timer, setTimer] = useState(0); // Timer duration in seconds (will count down from 300 seconds = 5 minutes)
    const [quizStarted, setQuizStarted] = useState(false); // Boolean to track if the quiz has started
    const [shortID, setShortID] = useState(""); // User-entered 6-character ID

    useEffect(() => {
        if (quizStarted && !showScore && currentQuestion < quizData.length) {
            // Start the timer when the quiz is started
            const timerInterval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            // Stop the quiz if the timer ends and the quiz is not finished
            if (timer === 0) {
                clearInterval(timerInterval);

                // Store the user's score and time in Firebase
                firestore.collection("scores").add({
                    score: userAnswers.filter((answer) => answer.isCorrect).length,
                    time: timer,
                    shortID,
                });

                setShowScore(true);
            }

            return () => {
                clearInterval(timerInterval);
            };
        }
    }, [quizStarted, currentQuestion, showScore, timer, userAnswers, shortID]);

    const handleGetStartedClick = () => {
        // Prompt the user to enter a 6-character numerical ID
        const enteredID = prompt("Enter a 6-character numerical ID:");
        if (enteredID && /^[0-9]{6}$/.test(enteredID)) {
            // Check if the entered ID is valid (6 characters, all numbers)
            setShortID(enteredID);
            setQuizStarted(true);
            // Start the timer
            setTimer(300); // 300 seconds = 5 minutes
        } else {
            alert("Please enter a valid 6-character numerical ID.");
        }
    };

    const handleAnswerClick = (selectedOption) => {
        if (!quizStarted) {
            // Start the timer when the first answer is clicked
            alert("Please click 'GO!' to start the quiz.");
            return;
        }

        const isCorrect = selectedOption === quizData[currentQuestion].answer;
        setUserAnswers([...userAnswers, { question: currentQuestion, isCorrect }]);

        if (currentQuestion + 1 < quizData.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // End of the quiz
            setShowScore(true);
            
            saveScore(userAnswers.filter((answer) => answer.isCorrect).length, 300 - timer, shortID);

            // Store the user's score and time in Firebase
            firestore.collection("scores").add({
                score: userAnswers.filter((answer) => answer.isCorrect).length,
                time: timer,
                shortID,
            });
        }
    };

    const score = userAnswers.filter((answer) => answer.isCorrect).length;

    return (
        <div className="quiz">
            {showScore ? (
                <div className="score">
                    You scored {score} out of {quizData.length} in {300 - timer} seconds!
                </div>
            ) : (
                <div className="question-container">
                    <h1>Quiz</h1>
                    <p>{quizData[currentQuestion].question}</p>
                    <div className="options">
                        {quizData[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerClick(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {!quizStarted && !showScore && (
                <div>
                    <button onClick={handleGetStartedClick}>Get Started</button>
                </div>
            )}
        </div>
    );
}

export default Quiz;
