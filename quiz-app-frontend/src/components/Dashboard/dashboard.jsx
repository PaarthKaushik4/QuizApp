import React from 'react'
import { CgCollage } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function Dashboard({active,setActive}) {
    const navigate = useNavigate();
  return (
    <section className='h-[700px] w-70 flex flex-col pt-10 items-left pl-5 pr-5 fixed mt-14 z-1000'>
        <div onClick={()=>setActive('dashboard')} className={`${active==='dashboard'?"bg-purple-700 text-white":"cursor-pointer text-gray-600 hover:bg-gray-100"} pt-2 pb-2 rounded-lg flex items-center mb-5 text-xl font-semibold`}>
            <CgCollage className={`${active==='dashboard'?"text-3xl":"text-purple-700"} mr-5 ml-5 text-2xl`}/>
            Dashboard
        </div>
        <div onClick={()=>setActive('history')} className={`${active==='history'?"bg-purple-700 text-white":"cursor-pointer text-gray-600 hover:bg-gray-100"} pt-2 pb-2 rounded-lg flex items-center text-xl font-semibold text-gray-600`}>
            <FaHistory className={`${active==='history'?"text-3xl":"text-purple-700"} mr-5 ml-5 text-2xl`}/>
            Quiz History
        </div>
        <div onClick={() => {
                    localStorage.removeItem("username");
                    setTimeout(() => {
                    navigate("/");
                    }, 100); // Short delay to ensure the state updates before navigating
                }} 
                className="cursor-pointer text-red-600 pt-2 pb-2 rounded-lg flex items-center text-xl mt-5 font-semibold hover:bg-red-100">
            <IoMdExit className="text-3xl mr-5 ml-5"/>
            Log Out
        </div>
    </section>
  )
}

export default Dashboard;
