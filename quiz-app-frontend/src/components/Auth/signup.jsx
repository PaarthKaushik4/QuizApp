import LoginImage from '../../assets/login/picture-108539_1280.jpg'
import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('username')){
            navigate("/dashboard");
        }
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("https://quizapp-0dkr.onrender.com/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: formData.username, password: formData.password })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setSuccess("Account created successfully! Redirecting to login...");
            setTimeout(() => { window.location.href = "/login"; }, 2000);
        } catch (error) {
            setError(error.message || "Something went wrong");
        }
    };

    return (
        <section className="h-[100vh] w-full flex flex-row items-center justify-between">
            <div className="w-[50%] h-full bg-cover bg-center" style={{ backgroundImage: `url(${LoginImage})` }}>
                <div className="w-full h-full bg-purple-500/80 flex flex-col items-center justify-center">
                    <h3 className="w-130 text-white font-semibold text-xl text-center">
                        Those people who develop the ability to continuously acquire new and better forms of knowledge...
                    </h3>
                    <h2 className="w-130 text-white font-semibold mt-10 pr-10 text-2xl text-right">
                        ~ Brian Tracy
                    </h2>
                </div>
            </div>
            <div className="w-[50%] h-full flex flex-col items-center">
                <nav className="w-full h-20">
                    <h2 className="text-purple-700 text-4xl mt-5 pl-10 font-bold">QUIZPLAY</h2>
                </nav>
                <form onSubmit={handleSubmit} className="w-[80%] max-w-md bg-white p-8 rounded-lg mt-[5%]">
                    <h3 className="text-3xl font-bold text-purple-700 text-left mb-1">Sign Up To Your Account</h3>
                    <p className="text-sm text-purple-700 text-left mb-6">With your username and password</p>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}

                    {/* Username Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Username</label>
                        <input 
                            type="text" 
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Signup Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-purple-700 text-white font-semibold py-3 rounded-lg hover:bg-purple-800 transition duration-300"
                    >
                        Sign Up
                    </button>

                    {/* Login Link */}
                    <p className="text-gray-600 text-center mt-4">
                        Already have an account? 
                        <a href="/login" className="text-purple-700 font-semibold ml-2 hover:underline">Back To Log In</a>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default SignUp;
