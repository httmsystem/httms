import express from "express";
import { getPayment, setPayment } from "../controller/payment_controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getPayment).post(protect, setPayment);

export default router;
