import mongoose from "mongoose";

const submitSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment"
    },
    solution: String,
    status: {
        type: String,
        enum: ["Pending", "Submitted", "Done"],
        default: "Pending"
    }
});

export default mongoose.model("Submission", submitSchema);