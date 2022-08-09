import asyncHandler from "express-async-handler";
import Bank from "../model/bank_model.js";

// @desc    Get Bank
// @routes  GET /api/bank
// @access  Private
const getBank = asyncHandler(async (req, res) => {
  const bank = await Bank.find();
  res.status(200).json(bank);
});

// @desc    Set Bank
// @routes  POST /api/bank
// @access  Private
const setBank = asyncHandler(async (req, res) => {
  const { bank_name, acct_no, status } = req.body;

  // Create Bank
  const bank = await Bank.create({
    bank_name,
    acct_no,
    status,
  });
  res.status(200).json(bank);
});

export { getBank, setBank };