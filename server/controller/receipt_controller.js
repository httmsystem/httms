import asyncHandler from "express-async-handler";
import Receipt from "../model/receipt_model.js";

// @desc    Get Receipt
// @routes  GET /api/receipt
// @access  Private
const getReceipt = asyncHandler(async (req, res) => {
  const receipt = await Receipt.find();
  res.status(200).json(receipt);
});

// @desc    Set Receipt
// @routes  POST /api/receipt
// @access  Private
const setReceipt = asyncHandler(async (req, res) => {
  const {
    currency,
    customer_type,
    customer,
    pay_details,
    receipt_details,
    total_amount,
    liq_amount,
    unliq_amount,
    remarks,
    status,
  } = req.body;

  // Create Receipt
  const receipt = await Receipt.create({
    currency,
    customer_type,
    customer,
    pay_details,
    receipt_details,
    total_amount,
    liq_amount,
    unliq_amount,
    remarks,
    status,
  });
  res.status(200).json(receipt);
});

// @desc    Update Receipt 
// @routes  PUT /api/receipt/:id
// @access  Private
const updateReceipt = asyncHandler(async (req, res) => {
  const receipt = await Receipt.findById(req.params.id);
  if (!receipt) {
    res.status(400);
    throw new Error("Receipt not found");
  }

  if (receipt) {
    receipt.date_issued = req.body.date_issued || receipt.date_issued;

    receipt.receipt_type = req.body.receipt_type || receipt.receipt_type;

    receipt.receipt_no = req.body.receipt_no || receipt.receipt_no;

    receipt.customer = req.body.customer || receipt.customer;

    receipt.currency = req.body.currency || receipt.currency;

    receipt.pay_info = req.body.pay_info || receipt.pay_info;

    receipt.total_amount = req.body.total_amount || receipt.total_amount;

    receipt.liq_amount = req.body.liq_amount || receipt.liq_amount;

    receipt.unliq_amount = req.body.unliq_amount || receipt.unliq_amount;

    receipt.status = req.body.status || receipt.status;

    const updatedReceipt = await receipt.save();

    res.json({
      _id: updatedReceipt._id,
      date_issued: updatedReceipt.date_issued,
      receipt_type: updatedReceipt.receipt_type,
      receipt_no: updatedReceipt.receipt_no,
      customer: updatedReceipt.customer,
      currency: updatedReceipt.currency,
      pay_info: updatedReceipt.pay_info,
      total_amount: updatedReceipt.total_amount,
      liq_amount: updatedReceipt.liq_amount,
      unliq_amount: updatedReceipt.unliq_amount,
      status: updatedReceipt.status,
    });
  } else {
    res.status(404);
    throw new Error("Receipt not found");
  }
});

export { getReceipt, setReceipt, updateReceipt };
