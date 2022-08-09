import asyncHandler from "express-async-handler";
import Payment from "../model/payment_model.js";

// @desc    Get Payment
// @routes  GET /api/payment
// @access  Private
const getPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.find();
  res.status(200).json(payment);
});

// @desc    Set GDS
// @routes  POST /api/payment
// @access  Private
const setPayment = asyncHandler(async (req, res) => {
  const { receipt, booking, amount, tag } = req.body;

  // Create Payment
  const payment = await Payment.create({
    receipt,
    booking,
    amount,
    tag,
  });
  res.status(200).json(payment);
});

export { getPayment, setPayment };
