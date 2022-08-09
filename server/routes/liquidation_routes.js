import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getLiquidation, setLiquidation, updateLiquidation } from "../controller/liquidation_controller.js";

const router = express.Router();

router.route("/").get(protect, getLiquidation).post(protect, setLiquidation);
router.route("/:id").put(protect, updateLiquidation);
export default router;
