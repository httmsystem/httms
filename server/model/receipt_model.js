import mongoose from "mongoose";

const receipt_schema = mongoose.Schema(
  {
    currency: {
      type: String,
    },
    customer_type: { type: String },
    customer: {},
    pay_details: {},
    receipt_details: {},
    total_amount: {
      type: Number,
    },
    liq_amount: {
      type: Number,
    },
    unliq_amount: {
      type: Number,
    },
    remarks: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Receipt = mongoose.model("tbl_receipt", receipt_schema);

export default Receipt;
