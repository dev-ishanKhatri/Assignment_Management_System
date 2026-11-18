import React, { useState } from 'react'
import { regUser } from "./APIs/api";
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        Password: "",
        confirmPass: "",
        role: "student"
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await regUser(form);
            alert("Registered");
            navigate("/");
        }
        catch (error) {
            // console.log("Full Error:", error);
            // console.log("Response:", error.response);
            // console.log("Data:", error.response?.data);

            // alert(error.response?.data?.message || "Registration Failed");
            console.log(erre);
            alert("Registration Failed");

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-indigo-100 to-purple-100 p-4">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="bg-indigo-700 text-white text-center py-7">
                    <h1 className="text-4xl font-bold">Create Account</h1>
                    <p className="text-indigo-200 mt-2">
                        Register to continue
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">

                    {/* Role */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-3">
                            Select Role
                        </label>

                        <div className="flex gap-8">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={form.role === "student"}
                                    onChange={handleChange}
                                    className="accent-indigo-700 w-5 h-5"
                                />
                                <span className="text-lg text-gray-700">Student</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="faculty"
                                    checked={form.role === "faculty"}
                                    onChange={handleChange}
                                    className="accent-indigo-700 w-5 h-5"
                                />
                                <span className="text-lg text-gray-700">Faculty</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full h-10 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

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
                            className="w-full h-10 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Create Password
                        </label>

                        <input
                            type="password"
                            name="Password"
                            value={form.Password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            className="w-full h-10 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPass"
                            value={form.confirmPass}
                            onChange={handleChange}
                            placeholder="Re-enter your password"
                            className="w-full h-10 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full h-10 bg-indigo-700 text-white rounded-xl text-lg font-semibold hover:bg-indigo-800 transition duration-300 shadow-lg hover:shadow-xl"
                    >
                        Sign Up
                    </button>

                    {/* Login Link */}
                    <div className="text-center text-gray-600">
                        Already have an account?{" "}
                        <a
                            href="/"
                            className="text-indigo-700 font-semibold hover:underline"
                        >
                            Login
                        </a>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register