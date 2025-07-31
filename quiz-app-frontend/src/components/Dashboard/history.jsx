import React from 'react';
import { useEffect } from 'react';

function History({ history ,setHistory}) {

    const username = localStorage.getItem("username");

    useEffect(() => {
                const fetchHistory = async () => {
                    try {
                        const response = await fetch(`https://quizapp-0dkr.onrender.com/api/history/${username}`);
                        const data = await response.json();
                        setHistory(data.quizzes || []); // Store history data
                    } catch (error) {
                        console.error("Error fetching history:", error);
                    }
                };
            
                fetchHistory();
            }, [username]);

  return (
    <section className='w-280 h-auto shadow-2xl pl-10 pr-10 pt-10 pb-5 rounded-xl mt-20 ml-80 bg-gray-50'>
      {/* Header */}
      <h2 className="text-4xl font-bold text-purple-700 text-center">Quiz History</h2>

      {/* History List */}
      {history.length > 0 ? (
        <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 scroll-auto">
          {history.map((quiz, index) => (
            <div key={index} className="bg-white p-5 flex flex-row items-center rounded-lg shadow-lg justify-between">
              <h3 className="text-xl font-bold text-purple-700">{quiz.quizName}</h3>
              <p className="text-gray-600 mt-2">Score: <span className="font-semibold text-green-600">{quiz.score}</span></p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10 text-xl">No quiz history available.</p>
      )}
    </section>
  );
}

export default History;
