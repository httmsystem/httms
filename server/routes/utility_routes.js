import express from "express";
import protect from "../middleware/authMiddleware.js";

import { getUtility, setUtility } from "../controller/utility_controller.js";

const router = express.Router();

router.route("/").get(protect, getUtility).post(protect, setUtility);

export default router;