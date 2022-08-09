import express from "express";
import protect from "../middleware/authMiddleware.js";

import { getBank, setBank } from "../controller/bank_controller.js";

const router = express.Router();

router.route("/").get(protect, getBank).post(protect, setBank);

export default router;