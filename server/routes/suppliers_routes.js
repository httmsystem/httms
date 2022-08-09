import express from "express";
import {
  getSuppliers,
  setSuppliers,
  updateSuppliers,
  deleteSuppliers,
} from "../controller/suppliers_controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getSuppliers).post(protect, setSuppliers);
router.route("/:id").delete(protect, deleteSuppliers).put(protect, updateSuppliers);

export default router;
