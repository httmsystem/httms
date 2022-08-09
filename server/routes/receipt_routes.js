import express from "express";
import {
  getReceipt,
  setReceipt,
  updateReceipt,
} from "../controller/receipt_controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getReceipt).post(setReceipt);
router.route("/:id").put(protect, updateReceipt);

export default router;
