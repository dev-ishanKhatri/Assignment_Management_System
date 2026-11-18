// import React from "react";
// import { Deleteassignment } from "../APIs/api";
// const Dashboard = ({ active, assignment, setAssignment }) => {

//   const handleDelete = async (id) => {
//   try {
//     const response = await Deleteassignment(id);

//     alert(response.data.message);

//   } catch (error) {
//     console.log(error);
//     alert("Failed to delete assignment");
//   }
// };

//   return (
//     <div id='ContentArea' className='p-5 flex flex-wrap gap-x-5 gap-y-5 content-start'>
//       {
//         active === "Dashboard" && (assignment.length === 0 ? (
//           <div><h1>no assignment created yet</h1></div>
//         ) : (

//           assignment.map((item) => (
//             <div className='h-50 w-70 bg-white rounded-2xl border-2 border-black' key={item._id}>
//               <div className='h-2/5'>
//                 <div className='h-7 w-full flex gap-2 p-0.5'>
//                   <div className="w-full flex justify-between p-0.3">
//                     <span className="bg-purple-200 text-blue-800 rounded-2xl px-5"> Assignment </span>
//                     <div className="h-7 w-7 px-2 bg-red-600 text-xl rounded-full"> 
//                       <span className="text-white cursor-pointer" onClick={() => handleDelete(item._id)}> X </span></div>
//                   </div>
//                 </div>
//                 <div className='h-19 mt-1 w-60 text-3xl ml-2'> {item.title} </div>
//               </div>
//               <hr className='w-60 ml-3' />
//               <div className='h-13 mx-2 my-2 '> {item.desc} </div>
//               <hr className='w-60 ml-4' />
//               <div className='h-1.2/5 flex justify-around mt-1'>
//                 <div> {item.duedate} </div>
//                 <div>
//                   <button className=' text-white px-6 py-1 rounded-2xl cursor-pointer bg-blue-600' onClick={() =>{window.open(`http://localhost:5000/uploads/${item.filename}`, "_blank");}}>View</button>
//                 </div>
//               </div>
//             </div>
//           )
//           ))
//         )}
//     </div>
//   );
// }

// export default Dashboard

import React from "react";
import { Deleteassignment } from "../APIs/api";

const Assignments = ({ active, assignment, setAssignment }) => {

  const handleDelete = async (id) => {
    try {

      const response = await Deleteassignment(id);

      alert(response.data.message);

      // Remove deleted assignment from parent state
      setAssignment(
        assignment.filter((item) => item._id !== id)
      );

    } catch (error) {
      console.log(error);
      alert("Failed to delete assignment");
    }
  };

  return (
    <div
      id="ContentArea"
      className="p-5 flex flex-wrap gap-x-5 gap-y-5 content-start"
    >

      {active === "Assignments" && (

        assignment.length === 0 ? (

          <div>
            <h1>No assignment created yet</h1>
          </div>

        ) : (

          assignment.map((item) => (

            <div
              className="h-50 w-70 bg-white rounded-2xl border-2 border-black"
              key={item._id}
            >

              {/* Header */}
              <div className="h-2/5">

                <div className="h-7 w-full flex gap-2 p-0.5">

                  <div className="w-full flex justify-between p-0.3">

                    <span className="bg-purple-200 text-blue-800 rounded-2xl px-5">
                      Assignment
                    </span>

                    {/* Delete Button */}
                    <div className="h-7 w-7 px-2 bg-red-600 text-xl rounded-full">

                      <span
                        className="text-white cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      >
                        X
                      </span>

                    </div>

                  </div>

                </div>


                {/* Assignment Title */}
                <div className="h-19 mt-1 w-60 text-3xl ml-2">
                  {item.title}
                </div>

              </div>


              <hr className="w-60 ml-3" />


              {/* Description */}
              <div className="h-13 mx-2 my-2">
                {item.desc}
              </div>


              <hr className="w-60 ml-4" />


              {/* Due Date + View */}
              <div className="h-1.2/5 flex justify-around mt-1">

                <div>
                  {item.duedate}
                </div>

                <div>

                  <button
                    className="text-white px-6 py-1 rounded-2xl cursor-pointer bg-blue-600"
                    onClick={() => {
                      window.open(
                        `http://localhost:5000/uploads/${item.filename}`,
                        "_blank"
                      );
                    }}
                  >
                    View
                  </button>

                </div>

              </div>

            </div>

          ))

        )

      )}

    </div>
  );
};

export default Assignments;