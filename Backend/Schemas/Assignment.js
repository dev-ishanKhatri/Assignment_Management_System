import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: String,
    desc : String,
    facultyId : String,
    duedate: String,
    filename: String,
    filepath: String
});

export default mongoose.model("Assignment",assignmentSchema);