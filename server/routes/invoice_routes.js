import express from "express";
import {
  getInvoice,
  setInvoice,
  updateInvoice,
} from "../controller/invoice_controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getInvoice).post(protect, setInvoice);
router.route("/:id").put(protect, updateInvoice);

export default router;
