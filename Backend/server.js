import express from "express";
import cors from "cors";
import connectDB from "./DBConn/db.js";
import authRoutes from "./Routes/AuthRoutes.js";
import assignmentRoutes from "./Routes/AssignmentRoutes.js";
import submissionRoutes from "./Routes/SubmissionRoute.js";
import dashboard from "./Routes/DashboardRoutes.js";
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/uploads",express.static("uploads"));

app.use("/api/auth",authRoutes);
app.use("/api/assignment",assignmentRoutes);
app.use("/api/submission", submissionRoutes);

app.use("/api/dashboard",dashboard);


app.listen(5000, () => console.log("Server running on port 5000"));

