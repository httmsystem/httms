import express from "express";
import {
  getMeUser,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/user_controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getUser);
// router.route("/:id").delete(deleteUsers).put(updateUsers);

router.get("/me", protect, getMeUser);

router.post("/", protect, registerUser);

router.post("/login", loginUser);

router.route("/:id").put(protect, updateUser);
router.route("/:id").delete(protect, deleteUser);

export default router;
