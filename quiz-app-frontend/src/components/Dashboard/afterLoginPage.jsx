import Dashboard from "./dashboard";
import { useState,useEffect } from 'react';
import UsersDashboard from "./dashboardUser";
import History from "./history";
import { useNavigate } from "react-router-dom";

const AfterLoginPage=()=>{
    const username = localStorage.getItem("username");

    const [active,setActive]=useState('dashboard');
    const [quizPlayed,setQuizPlayed]=useState(0);
    const [correctAnswers,setCorrectAnswers]=useState(0);
    const [history,setHistory]=useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        if(username){
            navigate("/dashboard");
        }else{
            navigate("/");
        }
    },[username]);

    useEffect(() => {
            const fetchHistory = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/history/${username}`);
                    const data = await response.json();
                    setHistory(data.quizzes || []); // Store history data
                    setQuizPlayed(data.noOfQuizzesPlayed || 0);
                    setCorrectAnswers(data.noOfRightAnswers || 0);
                } catch (error) {
                    console.error("Error fetching history:", error);
                }
            };
        
            fetchHistory();
        }, [username]);
    return (
        <section className="w-[100%] h-[130vh] bg-gray-100 flex flex-row">
            <Dashboard active={active} setActive={setActive}/>
            {active==="dashboard"?(
                <UsersDashboard quizPlayed={quizPlayed} setQuizPlayed={setQuizPlayed} correctAnswers={correctAnswers} 
                setCorrectAnswers={setCorrectAnswers} history={history} setHistory={setHistory}/>
            ):(
                <History history={history} setHistory={setHistory}/>
            )}
        </section>
    )
}

export default AfterLoginPage;