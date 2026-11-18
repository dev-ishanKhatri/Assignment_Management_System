import express from "express";
import multer from "multer";
import { submiteAssignment,getAssignment,getStudentAssignments,uploadSubmission,markDone,getSubmissions   } from "../Controllers/SubmissionController.js";
import verifyToken from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/",submiteAssignment);
router.get("/",getAssignment);

const storage = multer.diskStorage({destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({storage});

router.get("/student", verifyToken, getStudentAssignments);
router.post(
    "/upload",
    verifyToken,
    upload.single("solution"),
    uploadSubmission
);
router.put("/done/:id", markDone);
router.get("/all", getSubmissions);

export default router;



