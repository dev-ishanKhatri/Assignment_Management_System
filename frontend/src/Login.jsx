import React, { useState } from 'react'
import { logUser } from "./APIs/api"
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        Password: ""
    });


    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await logUser(form);
            console.log("Login Response:", res.data);
            // Save token
            localStorage.setItem("token", res.data.token);

            // Save role
            localStorage.setItem("role", res.data.role);


            alert("Login Successful");

            // Redirect based on role
            if (res.data.role === "faculty") {
                navigate("/faculty");
            } else {
                navigate("/student");
            }

        } catch (error) {
            console.log(error);
            alert("Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-indigo-100 to-purple-100 p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="bg-indigo-700 text-white text-center py-8">
                    <h1 className="text-4xl font-bold">Welcome Back</h1>
                    <p className="text-indigo-200 mt-2">
                        Login to your account
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="p-8 space-y-6">

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Email / ID
                        </label>

                        <input
                            type="text"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full h-12 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="Password"
                            value={form.Password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full h-12 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full h-12 bg-indigo-700 text-white rounded-xl font-semibold text-lg hover:bg-indigo-800 transition duration-300 shadow-lg hover:shadow-xl"
                    >
                        Login
                    </button>

                    {/* Register */}
                    <div className="text-center text-gray-600">
                        Don't have an account?{" "}
                        <a
                            href="/reg"
                            className="text-indigo-700 font-semibold hover:underline"
                        >
                            Register
                        </a>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login