import express from "express";
import { getAcr, setAcr } from "../controller/acr_controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAcr).post(setAcr);

export default router;
