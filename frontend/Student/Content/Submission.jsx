import React from "react";
import axios from "axios";
import { uploadSubmission } from "../../src/APIs/api";

const Submission = ({ active, assignment, setAssignment }) => {
  const handleFileChange = async (e, assignmentId) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("solution", file);
    formData.append("assignmentId", assignmentId);

    try {
      await uploadSubmission(formData);

      // Update UI immediately
      setAssignment((prev) =>
        prev.map((item) =>
          item._id === assignmentId
            ? {
              ...item,
              status: "Submitted",
              submissionDate: new Date(),
            }
            : item
        )
      );

      alert("File Uploaded Successfully");
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  return (
  <div className="">
    {active === "Submission" &&
      (assignment.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg text-center">
          <h1 className="text-2xl font-semibold text-gray-600">
            No Assignments Available
          </h1>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Heading */}
          <div className="bg-linear-to-r from-indigo-700 to-blue-600 p-5">
            <h1 className="text-2xl font-bold text-white">
              My Submissions
            </h1>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              {/* Table Head */}
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">

                <tr>
                  <th className="px-6 py-4">Assignment</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Submission Date</th>
                  <th className="px-6 py-4">Upload</th>
                  <th className="px-6 py-4">Status</th>
                </tr>

              </thead>

              {/* Table Body */}
              <tbody>

                {assignment.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="px-6 py-4 font-semibold">
                      {item.title}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {item.desc}
                    </td>

                    <td className="px-6 py-4">
                      {item.duedate}
                    </td>

                    <td className="px-6 py-4">
                      {item.submissionDate
                        ? new Date(item.submissionDate).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-6 py-4">

                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileChange(e, item._id)
                        }
                        className="block w-full text-sm
                      file:mr-4
                      file:px-4
                      file:py-2
                      file:rounded-lg
                      file:border-0
                      file:bg-indigo-600
                      file:text-white
                      hover:file:bg-indigo-700
                      cursor-pointer"
                      />

                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold
                      ${item.status === "Submitted"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "Done"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      ))}
  </div>
  );
};

export default Submission;