import express from "express";

import { getRelease, setRelease, updateRelease } from "../controller/release_controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getRelease).post(protect, setRelease);
router.route("/:id").put(protect, updateRelease);

export default router;
