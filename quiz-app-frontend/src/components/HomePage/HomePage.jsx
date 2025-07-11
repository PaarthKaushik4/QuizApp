
import BGImage from '../../assets/HomePage/Herosection.jpeg';
import BGImage2 from '../../assets/HomePage/quiz-2137664_1280.jpg';
import BGImage3 from '../../assets/HomePage/brainstorm-4222409_1280.jpg';
import BGImage4 from '../../assets/HomePage/dresden-5832183_1280.jpg';
import BGImage5 from '../../assets/HomePage/education-6305113_1280.jpg';
import BGImage6 from '../../assets/HomePage/question-mark-5475172_1280.jpg';
import BGImage7 from '../../assets/HomePage/Herosection2.jpeg';
import { Link ,useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

const HomePage=()=>{
    const username = localStorage.getItem('username');
    const navigate=useNavigate();

    useEffect(()=>{
        if(username){
            navigate("/dashboard");
        }
    },[username,navigate]);
    return(
        <section className="bg-white w-[100%] h-[710px] p-10 flex overflow-hidden flex-row items-center justify-between">
            <div className="w-[650px] h-[300px]">
                <h1 className="text-7xl font-bold text-purple-900">
                The remarkably fun quiz play
                </h1>
                <p className="mt-10 pl-1 text-lg text-purple-700 font-semibold">
                    Play quizzes that increase your knowledge.
                </p>
                <div className='mt-10 pl-2'>
                    <Link to="/signup" className='bg-purple-700 text-white mr-5 text-xl rounded-xl pl-5 pr-5 pt-2 pb-2 hover:font-semibold hover:bg-purple-800 cursor-pointer'>
                        Register Now !!!
                    </Link>
                    <Link to="/login" className='bg-white text-purple-700 border border-black text-xl rounded-xl pl-5 pr-5 pt-2 pb-2 hover:font-semibold hover:bg-gray-100 cursor-pointer'>
                        Log In
                    </Link>
                </div>
            </div>
            <div className=' h-full mr-[-100px] mt-[-200px] w-170 grid grid-cols-3 gap-10' style={{ transform: "rotateZ(25deg)" }}>
                <img src={BGImage} alt='background-image' className='h-50 mb-[-200px] rounded-2xl shadow-2xl shadow-amber-700' ></img>
                <img src={BGImage2} alt='background-image' className='h-50 rounded-2xl shadow-2xl shadow-amber-700' ></img>
                <img src={BGImage3} alt='background-image' className='h-50 rounded-2xl shadow-2xl shadow-amber-700' ></img>
                <img src={BGImage4} alt='background-image' className='h-50 rounded-2xl shadow-2xl shadow-amber-700' ></img>
                <img src={BGImage5} alt='background-image' className='h-50 rounded-2xl shadow-2xl shadow-amber-700' ></img>
                <img src={BGImage6} alt='background-image' className='h-50 rounded-2xl shadow-2xl shadow-amber-700' ></img>
                <img src={BGImage} alt='background-image' className='h-50 rounded-2xl shadow-2xl shadow-amber-700' ></img>
                <img src={BGImage2} alt='background-image' className='h-50 rounded-2xl shadow-2xl shadow-amber-700' ></img>
                <img src={BGImage3} alt='background-image' className='h-50 rounded-2xl shadow-2xl shadow-amber-700' ></img>
                <img src={BGImage7} alt='background-image' className='h-50 rounded-2xl shadow-2xl shadow-amber-700' ></img>
                <img src={BGImage5} alt='background-image' className='h-50 rounded-2xl shadow-2xl shadow-amber-700' ></img>
                <img src={BGImage6} alt='background-image' className='h-50 rounded-2xl shadow-2xl shadow-amber-700' ></img>   
            </div>
        </section>
    )
}

export default HomePage;