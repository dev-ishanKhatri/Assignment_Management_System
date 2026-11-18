import express from "express";
import multer from "multer";
import { CreateAssignment,getAssignment,Deleteassignment } from "../Controllers/AssignmentController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads/");
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + "-" + file.originalname);
    }
});

const upload = multer({storage:storage});

router.post("/create",upload.single("file"),CreateAssignment);

router.get("/",getAssignment);

router.delete("/delete/:id", Deleteassignment);

export default router;
