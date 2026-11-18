import express from "express";
import { getAllAssignmentStats } from "../Controllers/DashboardController.js";

const router = express.Router();

router.get(
  "/assignments",
  getAllAssignmentStats
);
 

 export default router;