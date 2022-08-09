import express from "express";
import { getGds, setGds } from "../controller/gds_controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getGds).post(protect, setGds);

export default router;
