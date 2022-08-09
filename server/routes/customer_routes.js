import express from "express";
import {
  getCustomer,
  setCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomer,
} from "../controller/customer_controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getCustomer).post(protect, setCustomer);
router.route("/search").get(protect, searchCustomer);
router
  .route("/:id")
  .delete(protect, deleteCustomer)
  .put(protect, updateCustomer);
export default router;
