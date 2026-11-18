import React, { useState } from 'react'
import { CreateAssignment } from "../APIs/api";

const CreateForm = ({active}) => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [duedate, setDuedate] = useState("")
    const [file, setFile] = useState(null)


    const createassignment = async() => {

        const formData = new FormData();

        formData.append("title",title);
        formData.append("desc",desc);
        formData.append("duedate",duedate);
        formData.append("file",file);

            await CreateAssignment(formData);
            alert("Assignment Created");

    }; 
  return (
    <div className='mx-50'>
        {
            active==="CreateForm" && 
        <form action="">
            <div className='h-150 w-200 bg-white border-2 border-black flex  items-center flex-col gap-5 text-2xl  rounded-2xl'>
                <div className='text-4xl mt-5 mb-5'>
                    Create Assignment
                </div>
                <div>
                    Enter Subject Name:<br/> <input type="text" value={title}  placeholder='Title' onChange={(e) => { setTitle(e.target.value) }} className='h-10 w-180 border-2 border-black rounded'/>
                </div>
                <div>
                    Enter Assignment Description:<br/> <input type='text' value={desc} placeholder='Description' onChange={(e) => { setDesc(e.target.value) }} className='h-25 w-180 border-2 border-black rounded'/>
                </div>
                <div>
                    Upload File <br/> <input type="file" onChange={(e) => setFile(e.target.files[0])} className='h-10 w-180 border-2 border-black'/>
                </div>
                <div>
                    Choose Due Date: <br/><input type="date" value={duedate} onChange={(e) =>{ setDuedate(e.target.value) }}  placeholder='dd-mm-yyyy' className='h-10 w-180 border-2 border-black'/>
                </div>
                <div>
                    <div  onClick={createassignment} className=' bg-blue-600 px-80 py-2 text-white rounded-xl  cursor-pointer'>Upload</div>
                </div> 
            </div>
        </form>
        }
    </div>
  )
}

export default CreateForm