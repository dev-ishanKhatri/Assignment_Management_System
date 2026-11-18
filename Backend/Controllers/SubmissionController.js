import Assignment from "../Schemas/Assignment.js";
import Submission from "../Schemas/Submission.js";

export const submiteAssignment = async (req, res) => {
    const submit = new Submission(req.body);
    await submit.save();

    res.json({ message: "Assignment Submitted" });
};
export const getAssignment = async (req, res) => {
    const submit = await Submission.find().populate("assignmentId");

    res.json(submit);
};


export const getStudentAssignments = async (req, res) => {
    try {
        const studentId = req.user.id;

        const assignments = await Assignment.find();

        const submissions = await Submission.find({ studentId });

        const result = assignments.map((assignment) => {

            const submit = submissions.find(
                (s) =>
                    s.assignmentId.toString() ===
                    assignment._id.toString()
            );

            return {
                _id: assignment._id,
                title: assignment.title,
                desc: assignment.desc,
                duedate: assignment.duedate,
                status: submit ? submit.status : "Pending",
                submissionDate: submit ? submit.submissionDate : null,
                solution: submit ? submit.solution : null
            };
        });

        res.json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};

export const uploadSubmission = async (req, res) => {
    try {

        const { assignmentId } = req.body;
        const studentId = req.user.id;   // or req.user._id

        const existing = await Submission.findOne({ studentId, assignmentId });

        if (existing) {
            existing.solution = req.file.filename;
            existing.status = "Submitted";
            existing.submissionDate = new Date();

            await existing.save();

            return res.json(existing);
        }

        const submit = await Submission.create({
            studentId,
            assignmentId,
            solution: req.file.filename,
            submissionDate: new Date(),
            status: "Submitted"
        });

        res.json(submit);
    } catch (error) {
        res.status(500).json(error);

    }
}

export const markDone = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);

        submission.status = "Done";

        await submission.save();

        res.json({ message: "Status Updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSubmissions = async (req, res) => {
  try {

    const submissions = await Submission.find()
      .populate({
        path: "studentId",
        model: "User"
      })
      .populate({
        path: "assignmentId",
        model: "Assignment"
      });

    console.log(submissions);

    res.json(submissions);

  } catch (err) {
    console.log(err);
  }
};