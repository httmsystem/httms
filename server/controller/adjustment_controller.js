import asyncHandler from "express-async-handler";
import Adjustment from "../model/adjustment_model.js";

// @desc    Get Adjustment
// @routes  GET /api/adjustment
// @access  Private
const getAdjustment = asyncHandler(async (req, res) => {
  const adjustment = await Adjustment.find();
  res.status(200).json(adjustment);
});

// @desc    Set Adjustment
// @routes  POST /api/adjustment
// @access  Private
const setAdjustment = asyncHandler(async (req, res) => {
  const { receipt, booking, adjustment_type, amount, tag } = req.body;

  // Create Payment
  const adjustment = await Adjustment.create({
    receipt,
    booking,
    adjustment_type,
    amount,
    tag,
  });
  res.status(200).json(adjustment);
});

export { getAdjustment, setAdjustment };
