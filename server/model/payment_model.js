import mongoose from "mongoose";

const payment_schema = mongoose.Schema(
  {
    // CURRENCY WILL BE BASED ON RECEIPT
    receipt: {},
    booking: {},
    amount: {
      type: Number,
    },
    tag: {
      type: String,
    },
  },

  { timestamps: true }
);

const Payment = mongoose.model("tbl_payment", payment_schema);

export default Payment;
