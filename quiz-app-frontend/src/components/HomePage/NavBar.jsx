import { Link } from "react-router-dom";

const NavBar=()=>{
    const user=localStorage.getItem("username");

    return (
        <nav className={`${!user?"bg-purple-700 shadow-2xl":"bg-gray-100"} fixed z-1000 h-16 w-full pl-10 pr-10 flex flex-row items-center justify-between`}>
            <div>
                <h1 className={`${!user?"text-white":"text-purple-700"} font-bold text-3xl`}>QUIZPLAY</h1>
            </div>
            {!user?(
                <Link to="/login" className="text-purple-900 bg-white pl-5 pr-5 pt-2 pb-2 rounded-2xl cursor-pointer hover:font-semibold hover:bg-gray-100">
                Login/SignUp
                </Link>
            ):(
                <div>
                    
                </div>
            )}
        </nav>
    );
}

export default NavBar;