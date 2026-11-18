import React, {useEffect,useState} from "react";

import {getAllAssignmentStats} from "../APIs/api";



const Dashboard = ({active}) => {

    const [assignments,setAssignments] = useState([]);


    const [loading,setLoading] = useState(true);


    // =================================
    // Fetch Dashboard Data
    // =================================

    useEffect(() => {
        if ( active === "Dashboard") {
            fetchDashboardData();
        }
    }, [active]);


    const fetchDashboardData =
        async () => {

            try {

                setLoading(true);

                const res = await getAllAssignmentStats();
                setAssignments(res.data);

            } catch (error) {

                console.error("Dashboard Error:",error);

            } finally {

                setLoading(false);
            }

        };


    // =================================
    // Loading
    // =================================

    if (loading) {

        return (
            <div className="p-8">

                <h1 className="text-2xl font-bold">
                    Loading Dashboard...
                </h1>

            </div>
        );

    }


    // =================================
    // UI
    // =================================

    return (

        <>

            {active ===
                "Dashboard" && (

                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8">
                            Faculty Dashboard
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">


                        {assignments.map((assignment) => (
                            <div key={assignment.assignmentId} className=" bg-white rounded-2xl shadow-lg p-6 border">

                                <h2 className="text-xl font-bold  text-gray-800 mb-6">
                                    {assignment.title}
                                </h2>
                                
                                <div className=" bg-blue-100 rounded-xl p-4 mb-4">
                                    <p className=" text-blue-700 font-semibold">
                                        Total Students
                                    </p>

                                    <h3 className="text-4xl font-bold text-blue-700">
                                        {assignment.totalStudents}
                                    </h3>
                            </div>
                            <div className=" bg-green-100 rounded-xl p-4 mb-4">
                                            <p className=" text-green-700 font-semibold">
                                                Submitted
                                            </p>
                                            <h3 className="text-4xl font-bold text-green-700">
                                                {assignment.submittedStudents}
                                            </h3>
                                        </div>
                                        <div className=" bg-yellow-100 rounded-xl p-4">
                                            <p className=" text-yellow-700 font-semibold">
                                                Remaining
                                            </p>
                                            <h3 className="text-4xl font-bold text-yellow-700">
                                                {assignment.remainingStudents}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {assignments.length === 0 && (
                            <div className="text-center mt-10 text-gray-500">
                                No assignments found.
                            </div>
                        )}
                    </div>
                )}
        </>
    );
};


export default Dashboard;