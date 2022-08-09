import mongoose from "mongoose";

const liquidation_schema = mongoose.Schema(
  {
    no: {
      type: String,
    },
    passenger: {},
    received_php: {
      type: Number,
    },
    received_usd: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Liquidation = mongoose.model("tbl_liquidation", liquidation_schema);

export default Liquidation;
