import Assignment from "../Schemas/Assignment.js";
import Submission from "../Schemas/Submission.js";
import User from "../Schemas/User.js";

export const getAllAssignmentStats = async (req, res) => {
  try {
    // Get total students
    const totalStudents = await User.countDocuments({
      role: "student"
    });

    // Get all assignments
    const assignments = await Assignment.find()
      .sort({ createdAt: -1 });

    const result = await Promise.all(
      assignments.map(async (assignment) => {

        // Count submitted students
        const submittedStudents =
          await Submission.countDocuments({
            assignmentId: assignment._id,

            status: {
              $in: ["Submitted", "Done"]
            }
          });

        // Calculate remaining
        const remainingStudents =
          totalStudents - submittedStudents;

        return {
          assignmentId: assignment._id,

          title: assignment.title,

          desc: assignment.desc,

          duedate: assignment.duedate,

          totalStudents,

          submittedStudents,

          remainingStudents
        };
      })
    );

    res.status(200).json(result);

  } catch (error) {
    console.error(
      "All Dashboard Stats Error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to get all assignment statistics",

      error: error.message
    });
  }
};