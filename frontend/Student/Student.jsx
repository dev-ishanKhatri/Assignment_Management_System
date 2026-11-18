import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getStudentAssignments } from '../src/APIs/api';
import Assignments from '../src/Faculty/Assignments';
import Student_Dashboard from './Content/Student_Dashboard';
import Submission from './Content/Submission';

const Student = () => {
    const navigate = useNavigate();

    const [active, setActive] = useState("Student_Dashboard");

    const [assignment, setAssignment] = useState([]);
    const [submissions, setSubmissions] = useState([]);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/"); // Change this if your login route is different
    };

    const fetchAssignment = async () => {
        try {
            const res = await getStudentAssignments();
            setAssignment(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchAssignment();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Top Navbar */}
            <header className="h-20 bg-linear-to-r from-indigo-700 to-blue-600 shadow-lg flex items-center justify-between px-10">
                <h1 className="text-3xl font-bold text-white">
                    Student Portal
                </h1>

                <div className="text-white text-lg">
                    Welcome Student 👋
                </div>
            </header>

            {/* Main Content */}
            <div className="flex">

                {/* Sidebar */}
                <aside className="w-72 min-h-[calc(100vh-5rem)] bg-slate-900 shadow-xl">

                    <div className="py-8 text-center border-b border-slate-700">
                        <h2 className="text-2xl font-bold text-white">
                            Menu
                        </h2>
                    </div>

                    <nav className="flex flex-col gap-3 p-6 text-lg">

                        <button
                            onClick={async () => {
                                await fetchAssignment();
                                setActive("Student_Dashboard");
                            }}
                            className="text-left px-5 py-3 rounded-xl text-white hover:bg-indigo-600 transition duration-300"
                        >
                            🏠 Dashboard
                        </button>

                        <button
                            onClick={() => setActive("Assignments")}
                            className="text-left px-5 py-3 rounded-xl text-white hover:bg-indigo-600 transition duration-300"
                        >
                            📚 Assignments
                        </button>

                        <button
                            onClick={async () => {
                                await fetchAssignment();
                                setActive("Submission");
                            }}
                            className="text-left px-5 py-3 rounded-xl text-white hover:bg-indigo-600 transition duration-300"
                        >
                            📄 My Submission
                        </button>

                        <button
                            onClick={logout}
                            className="text-left px-5 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition duration-300 mt-8"
                        >
                            🚪 Logout
                        </button>

                    </nav>
                </aside>

                {/* Content */}
                <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">

                    <Student_Dashboard active={active} />

                    <Assignments
                        active={active}
                        assignment={assignment}
                    />

                    <Submission
                        active={active}
                        assignment={assignment}
                        setAssignment={setAssignment}
                    />

                </main>

            </div>

        </div>
    )
}

export default Student