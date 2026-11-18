// import React from 'react'

// const Student_Dashboard = ({active}) => {
//   return (
//     <div>
//         {

//             active === "Student_Dashboard" &&
//         <div id='container' className='pt-8'>
//             <div className='h-50 w-100 bg-purple-600 rounded-2xl'>

//                 <div className='h-2/3'>
//                     <h1 className='text-5xl p-3'> Number of Assignment </h1>
//                 </div>

//                 <div className='h-1/3 w-full flex justify-end'>
//                     <span className='text-5xl mr-10 mb-5'>20</span>
//                 </div>
//             </div>
//             <div className='h-50 w-100 bg-purple-600 rounded-2xl'>

//                 <div className='h-2/3'>
//                     <h1 className='text-5xl p-3'> Number of Students </h1>
//                 </div>

//                 <div className='h-1/3 w-full flex justify-end'>
//                     <span className='text-5xl mr-10 mb-5'>20</span>
//                 </div>
//             </div>
//         </div>
//         }
//     </div>
//   )
// }

// export default Student_Dashboard
import React, { useEffect, useState } from "react";
import { getStudentAssignments } from "../../src/APIs/api";

const Student_Dashboard = ({ active }) => {
  const [assignment, setAssignment] = useState([]);

  useEffect(() => {
    fetchAssignment();
  }, []);

  const fetchAssignment = async () => {
    try {
      const studname = localStorage.getItem("studname");

      const res = await getStudentAssignments(studname);

      setAssignment(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Dashboard Counts
  const totalAssignments = assignment.length;

  const submittedAssignments = assignment.filter(
    (item) => item.status === "Submitted" || item.status === "Done"
  ).length;

  const pendingAssignments = assignment.filter(
    (item) => item.status === "Pending"
  ).length;

  return (
    <>
      {active === "Student_Dashboard" && (

        <div className="p-8">

          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Student Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {/* Total Assignments */}
            <div className="bg-linear-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <p className="text-lg">Total Assignments</p>

              <h2 className="text-5xl font-bold mt-6">
                {totalAssignments}
              </h2>
            </div>

            {/* Submitted */}
            <div className="bg-linear-to-r from-green-500 to-green-700 rounded-2xl shadow-lg p-6 text-white">
              <p className="text-lg">Submitted</p>

              <h2 className="text-5xl font-bold mt-6">
                {submittedAssignments}
              </h2>
            </div>

            {/* Pending */}
            <div className="bg-linear-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
              <p className="text-lg">Pending</p>

              <h2 className="text-5xl font-bold mt-6">
                {pendingAssignments}
              </h2>
            </div>


          </div>

        </div>
      )}
    </>
  );
};

export default Student_Dashboard;