// import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import Dashboard from './Dashboard'
// import CreateForm from './CreateForm'
// import { getAssignment } from '../APIs/api';
// import Student_List from './Student_List';

// const Faculty = () => {

//   const navigate = useNavigate();

//   const [active, setActive] = useState("Dashboard")

//   const [assignment, setAssignment] = useState([]);

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/log"); // Change this if your login route is different
//   };


//   const fetchAssignment = async () => {
//     const res = await getAssignment();
//     setAssignment(res.data);
//   };

//   useEffect(() => {
//     fetchAssignment();
//   });

//   return (
//     <div className="min-h-screen bg-gray-100">

//       {/* Top Navbar */}
//       <header className="h-20 bg-linear-to-r from-indigo-700 to-blue-600 shadow-lg flex items-center justify-between px-10">
//         <h1 className="text-3xl font-bold text-white">
//           Faculty Portal
//         </h1>

//         <div className="text-white text-lg">
//           Welcome Faculty 👨‍🏫
//         </div>
//       </header>

//       {/* Main Layout */}
//       <div className="flex">

//         {/* Sidebar */}
//         <aside className="w-72 min-h-[calc(100vh-5rem)] bg-slate-900 shadow-xl">

//           <div className="py-8 border-b border-slate-700 text-center">
//             <h2 className="text-2xl font-bold text-white">
//               Menu
//             </h2>
//           </div>

//           <nav className="flex flex-col gap-3 p-6">

//             <button
//               onClick={async () => {
//                 await fetchAssignment();
//                 setActive("Dashboard");
//               }}
//               className="flex items-center gap-3 text-white text-lg px-5 py-3 rounded-xl hover:bg-indigo-600 transition duration-300"
//             >
//               🏠 Home
//             </button>

//             <button
//               onClick={() => setActive("CreateForm")}
//               className="flex items-center gap-3 text-white text-lg px-5 py-3 rounded-xl hover:bg-indigo-600 transition duration-300"
//             >
//               ➕ Create Assignment
//             </button>

//             <button
//               onClick={() => setActive("Student_List")}
//               className="flex items-center gap-3 text-white text-lg px-5 py-3 rounded-xl hover:bg-indigo-600 transition duration-300"
//             >
//               👨‍🎓 Student List
//             </button>

//             <button
//               onClick={logout}
//               className="flex items-center gap-3 mt-8 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-lg transition duration-300"
//             >
//               🚪 Logout
//             </button>

//           </nav>

//         </aside>

//         {/* Content Area */}
//         <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">

//           <Dashboard
//             active={active}
//             assignment={assignment}
//             setAssignment={setAssignment}
//           />

//           <CreateForm
//             active={active}
//           />

//           <Student_List
//             active={active}
//           />

//         </main>

//       </div>

//     </div>
//   )
// }

// export default Faculty

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CreateForm from './CreateForm';
import { getAssignment } from '../APIs/api';
import Student_List from './Student_List';
import Assignments from './Assignments';
import Dashboard from './Dashboard';

const Faculty = () => {

  const navigate = useNavigate();

  const [active, setActive] = useState("Dashboard");

  const [assignment, setAssignment] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchAssignment = async () => {
    try {
      const res = await getAssignment();
      setAssignment(res.data);
    } catch (error) {
      console.log("Error fetching assignments:", error);
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
          Faculty Portal
        </h1>

        <div className="text-white text-lg">
          Welcome Faculty 👨‍🏫
        </div>

      </header>


      {/* Main Layout */}
      <div className="flex">

        {/* Sidebar */}
        <aside className="w-72 min-h-[calc(100vh-5rem)] bg-slate-900 shadow-xl">

          <div className="py-8 border-b border-slate-700 text-center">

            <h2 className="text-2xl font-bold text-white">
              Menu
            </h2>

          </div>


          <nav className="flex flex-col gap-3 p-6">

            {/* Dashboard */}
            <button
              onClick={() =>
                setActive(
                  "Dashboard"
                )
              }
              className="flex items-center gap-3 text-white text-lg px-5 py-3 rounded-xl hover:bg-indigo-600 transition duration-300"
            >

              🏠 Dashboard

            </button>
            <button
              onClick={async () => {
                await fetchAssignment();
                setActive("Assignments");
              }}
              className="flex items-center gap-3 text-white text-lg px-5 py-3 rounded-xl hover:bg-indigo-600 transition duration-300"
            >
              📚 Assignemnts
            </button>


            {/* Create Assignment */}
            <button
              onClick={() => setActive("CreateForm")}
              className="flex items-center gap-3 text-white text-lg px-5 py-3 rounded-xl hover:bg-indigo-600 transition duration-300"
            >
              ➕ Create Assignment
            </button>


            {/* Student List */}
            <button
              onClick={() => setActive("Student_List")}
              className="flex items-center gap-3 text-white text-lg px-5 py-3 rounded-xl hover:bg-indigo-600 transition duration-300"
            >
              👨‍🎓 Student List
            </button>


            {/* Logout */}
            <button
              onClick={logout}
              className="flex items-center gap-3 mt-8 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-lg transition duration-300"
            >
              🚪 Logout
            </button>

          </nav>

        </aside>


        {/* Content Area */}
        <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">

          <Dashboard
            active={active}
          />

          <Assignments
            active={active}
            assignment={assignment}
            setAssignment={setAssignment} />

          <CreateForm
            active={active}
          />

          <Student_List
            active={active}
          />

        </main>

      </div>

    </div>
  );
};

export default Faculty;