import React, { useState, useEffect } from 'react';
import defaultImage from '../../assets/HomePage/user-image.jpg';
import { MdFlag } from "react-icons/md";
import { SiTicktick } from "react-icons/si";

function UsersDashboard({quizPlayed,setQuizPlayed,setCorrectAnswers,correctAnswers,setHistory}) {
    const username = localStorage.getItem("username");
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [score, setScore] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);

    // Fetch quizzes from the server
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch("https://quizapp-0dkr.onrender.com/api/quizzes");
                const data = await response.json();
                setQuizzes(data);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };
        fetchQuizzes();
    }, []);
    

    // Timer Effect
    useEffect(() => {
        if (quizStarted && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            nextQuestion();
        }
    }, [quizStarted, timeLeft]);

    // Start Quiz
    const startQuiz = (quiz) => {
        setSelectedQuiz(quiz);
        setQuizStarted(true);
        setCurrentQuestionIndex(0);
        setTimeLeft(10);
        setScore(0);
    };

    // Handle Answer Selection
    const handleAnswerClick = (option) => {
        const correctAnswer = selectedQuiz.questions[currentQuestionIndex].answer.trim().toLowerCase();
        const selectedOption = option.trim().toLowerCase();
    
        console.log("📝 QUESTION:", selectedQuiz.questions[currentQuestionIndex].question);
        console.log("✅ CORRECT ANSWER:", correctAnswer);
        console.log("🎯 SELECTED OPTION:", selectedOption);
    
        // ✅ Calculate new score immediately
        let newScore = score;
        if (correctAnswer === selectedOption) {
            newScore = score + 1;
            setScore(newScore);
            console.log("✅ Updated Score (instant):", newScore);
        }
    
        // ✅ Pass the correct score forward
        nextQuestion(newScore);
    };

    
    const fetchHistory = async () => {
        try {
            const response = await fetch(`https://quizapp-0dkr.onrender.com/api/history/${username}`);
            const data = await response.json();
            setHistory(data); // Store history data
            setQuizPlayed(data.noOfQuizzesPlayed || 0);
            setCorrectAnswers(data.noOfRightAnswers || 0);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    const handleQuizCompletion = async (score) => {
        const username =localStorage.getItem("username");
        const quizName = selectedQuiz.topic;
        console.log(quizName);
        try {
            const response = await fetch("https://quizapp-0dkr.onrender.com/api/history/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, quizName, score }),
            });
    
            const data = await response.json();
            console.log("History updated:", data);
            fetchHistory();
            
        } catch (error) {
            console.error("Error updating history:", error);
        }
    };
    

    // Go to Next Question
    const nextQuestion = (latestScore = score) => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(10);
        } else {
            setQuizStarted(false);
            alert(`Quiz Over! You scored ${latestScore} out of ${selectedQuiz.questions.length}`);
            handleQuizCompletion(latestScore);
            setSelectedQuiz(null);
        }
    };


    return (
        <section className='w-280 h-auto shadow-2xl pl-10 pr-10 pt-10 pb-5 rounded-xl mt-20 ml-80 bg-gray-50'>
            {/* User Profile Section */}
            <div className='w-full h-70 flex flex-row items-center justify-start'>
                <img src={defaultImage} className='h-full w-80 rounded-xl' alt="Profile" />
                <div className='w-100 h-full pl-20 text-purple-700'>
                    <h2 className='text-7xl font-bold'>{username}</h2>
                    <div className='w-120 mt-10 h-30 flex flex-row items-center justify-between'>
                        <div className='flex flex-row items-center justify-start'>
                            <div className='bg-white rounded mr-5 p-3 shadow-2xl'>
                                <MdFlag className='text-5xl' />
                            </div>
                            <div>
                                <p className='text-3xl text-gray-400 font-bold'>{quizPlayed}</p>
                                <p className='text-xl text-gray-400 font-semibold'>Quizzes Played</p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center'>
                            <div className='bg-white rounded p-3 mr-5 shadow-2xl'>
                                <SiTicktick className='text-5xl' />
                            </div>
                            <div>
                                <p className='text-3xl text-gray-400 font-bold'>{correctAnswers}</p>
                                <p className='text-xl text-gray-400 font-semibold'>Correct Answers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quizzes Section */}
            {!quizStarted ? (
                <div className='w-full h-auto flex flex-col items-center justify-center'>
                    <p className='text-3xl mt-10 font-semibold text-gray-600'>Quizzes</p>
                    <div className="w-full mt-5 grid grid-cols-3 gap-6">
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz, index) => (
                                <div key={index} className="bg-white p-5 rounded-lg shadow-lg text-center">
                                    <h3 className="text-xl font-bold text-purple-700">{quiz.topic}</h3>
                                    <p className="text-gray-600 mt-2">{quiz.questions.length} Questions</p>
                                    <button onClick={() => startQuiz(quiz)} className="mt-4 bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-800">
                                        Start Quiz
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Loading quizzes...</p>
                        )}
                    </div>
                </div>
            ) : (
                /* Quiz Section */
                <div className="w-full h-auto flex flex-col items-center justify-center mt-10">
                    <h2 className="text-3xl font-bold text-purple-700">{selectedQuiz.topic} Quiz</h2>
                    <div className="w-full mt-5 bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-xl font-semibold text-gray-700">{selectedQuiz.questions[currentQuestionIndex].question}</p>
                        <div className="grid grid-cols-2 gap-4 mt-5">
                            {selectedQuiz.questions[currentQuestionIndex].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswerClick(option)}
                                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <p className="text-red-500 font-bold mt-4">Time Left: {timeLeft} sec</p>
                        <button onClick={nextQuestion} className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-800">
                            Skip
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default UsersDashboard;
