import express from "express";
import {
  getAdjustment,
  setAdjustment,
} from "../controller/adjustment_controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAdjustment).post(protect, setAdjustment);

export default router;
