import React, { useEffect, useState } from "react";
import { getSubmissions } from "../APIs/api";

const Student_List = ({ active }) => {

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await getSubmissions();
      setSubmissions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {active === "Student_List" && (
        <div className="p-5">

          <h1 className="text-3xl font-bold mb-5">
            Student Submission List
          </h1>

          <table className="w-full border">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Assignment</th>
                <th className="p-3">Submission Date</th>
                <th className="p-3">Solution</th>
                <th className="p-3">Status</th>
              </tr>

            </thead>

            <tbody>

              {submissions.map((item) => (

                <tr key={item._id} className="text-center border-b">

                  <td className="p-3">{item.studentId?.name}</td>

                  <td className="p-3">{item.assignmentId?.title}</td>

                  <td className="p-3">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <a
                      href={`http://localhost:5000/uploads/${item.solution}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View File
                    </a>
                  </td>

                  <td 
                        className={`px-2 py-0 rounded-full text-sm font-semibold
                      ${item.status === "Submitted"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "Done"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }`}>
                    {item.status}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}
    </>
  );
};

export default Student_List;