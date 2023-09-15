import React, { useState, useEffect } from "react";
import quizData from "./quizData";  
import { firestore, saveScore, collection, addDoc } from "./firebase";
import "./App.css"; // Import your CSS file
import { saveAs } from "file-saver";

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [timer, setTimer] = useState(300);
    const [quizStarted, setQuizStarted] = useState(false);
    const [shortID, setShortID] = useState("");

    useEffect(() => {
        if (quizStarted && !showScore && currentQuestion < quizData.length) {
            const timerInterval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 0) {
                        clearInterval(timerInterval);
                        setShowScore(true);
                        setTimerMessage("Time's up! Quiz has ended."); // Set the timer message

                        // Store the user's score and time in Firebase
                        saveScore(
                            userAnswers.filter((answer) => answer.isCorrect).length,
                            300 - timer,
                            shortID
                        );

                        // Save to a text file
                        saveToTextFile(
                            shortID,
                            userAnswers.filter((answer) => answer.isCorrect).length
                        );

                        return 0; // Timer is up
                    }
                    return prevTimer - 1;
                });
            }, 1000);

            return () => {
                clearInterval(timerInterval);
            };
        }
    }, [quizStarted, currentQuestion, showScore, timer, userAnswers, shortID]);



    const handleQuizEnd = () => {
        // Save to text file
        if (currentQuestion + 1 === quizData.length) {
            setShowScore(true);

            saveScore(
                userAnswers.filter((answer) => answer.isCorrect).length,
                300 - timer,
                shortID
            );

            // Save to text file
            saveToTextFile(shortID, score);

            // Save to Firebase
            const scoresCollectionRef = collection(firestore, "scores");
            addDoc(scoresCollectionRef, {
                score: userAnswers.filter((answer) => answer.isCorrect).length,
                time: 300 - timer,
                shortID
            });
        }
        console.log("awhefaiukefbauyifnkerau;ra");
    };

    const handleAnswerClick = (selectedOption) => {
        const isCorrect = selectedOption === quizData[currentQuestion].answer;
        setUserAnswers([...userAnswers, { question: currentQuestion, isCorrect }]);

        if (currentQuestion + 1 < quizData.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            handleQuizEnd();
        }
        if (currentQuestion + 1 === quizData.length) {
            setShowScore(true);

            saveScore(
                userAnswers.filter((answer) => answer.isCorrect).length,
                300 - timer,
                shortID
            );

            // Save to text file
            saveToTextFile(shortID, score);
        }
    };

    const score = userAnswers.filter((answer) => answer.isCorrect).length;

    const saveToTextFile = (shortID, score) => {
        const textToWrite = `Short ID: ${shortID}\nScore: ${score}`;

        const blob = new Blob([textToWrite], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${shortID}_score.txt`;
        a.click();

        URL.revokeObjectURL(url);
    };


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
                            <button key={index} onClick={() => handleAnswerClick(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;
