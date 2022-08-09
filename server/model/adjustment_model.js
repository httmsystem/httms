import mongoose from "mongoose";

const adjustmentSchema = mongoose.Schema(
  {
    // CURRENCY WILL BE BASED ON RECEIPT
    receipt: {},
    booking: {},
    adjustment_type: {
      type: String,
    },
    amount: {
      type: Number,
    },
    tag: {
      type: String,
    },
  },
  { timestamps: true }
);

const Adjustment = mongoose.model("tbl_adjustment", adjustmentSchema);

export default Adjustment;
