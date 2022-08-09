import express from "express";
import { getPsd, setPsd, updatePsd } from "../controller/product_service_deploy_controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getPsd).post(protect, setPsd);
router.route("/:id").put(protect, updatePsd);


export default router;
