import express from "express";
import { login,reg } from "../Controllers/Authcontroller.js";

const router = express.Router();

router.post("/register",reg);
router.post("/login",login);

export default router;