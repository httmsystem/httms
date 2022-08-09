import express from "express";
import {
  getReqSlip,
  setReqSlip,
  updateReqSlip,
} from "../controller/requisition_slip_controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getReqSlip).post(setReqSlip);
router.route("/:id").put(protect, updateReqSlip);
export default router;
