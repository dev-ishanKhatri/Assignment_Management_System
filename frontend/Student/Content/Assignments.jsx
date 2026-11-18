import React from "react";

const Assignments = ({ active, assignment }) => {

  return (
    <div id='ContentArea' className='p-5 flex flex-wrap gap-x-5 gap-y-5 content-start'>
      {
        active === "Dashboard" && (assignment.length === 0 ? (
          <div><h1>no assignment created yet</h1></div>
        ) : (

          assignment.map((item) => (
            <div className='h-50 w-70 bg-white rounded-2xl border-2 border-black' key={item._id}>
              <div className='h-2/5'>
                <div className='h-7 w-fit bg-purple-200 ml-35 mt-1 rounded-2xl text-blue-600'> <h3 className=' px-5 py-0.5'>Assignment </h3></div>
                <div className='h-19 mt-1 w-60 text-3xl ml-2'> {item.title} </div>
              </div>
              <hr className='w-60 ml-3' />
              <div className='h-13 mx-2 my-2 '> {item.desc} </div>
              <hr className='w-60 ml-4' />
              <div className='h-1.2/5 flex justify-around mt-1'>
                <div> {item.duedate} </div>
                <div>
                  <button className=' text-white px-6 py-1 rounded-2xl cursor-pointer bg-blue-600'>View</button>
                </div>
              </div>
            </div>
          )
          ))
        )}
    </div>
  );
}

export default Assignments