import Assignment from "../Schemas/Assignment.js";
import fs from "fs";

export const CreateAssignment = async (req,res) => {

    const assignment = new Assignment({
        title: req.body.title,
        desc: req.body.desc,
        facultyId : req.body.facultyId,
        duedate: req.body.duedate,
        filename: req.file.filename,
        filepath: req.file.path 
    });
    await assignment.save();
    
    res.json({message:"Assignment Created"});
};

export const getAssignment = async (req,res) => {
    const assignment = await Assignment.find();
    res.json(assignment);
};

export const Deleteassignment = async (req,res) => {
    try {
        const {id} = req.params;

        const assignment = await Assignment.findById(id);

         if (assignment.filepath) {
            fs.unlink(assignment.filepath, (err) => {
                if (err) {
                    console.log("File delete error:", err.message);
                }
            });
        }

        // Delete assignment from MongoDB
        await Assignment.findByIdAndDelete(id);

        res.status(200).json({
            message: "Assignment deleted successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error deleting assignment"
        });
    }
}