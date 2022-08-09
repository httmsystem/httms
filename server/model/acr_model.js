import mongoose from "mongoose";

const acr_schema = mongoose.Schema(
  {
    rate: {
      type: Number,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const Acr = mongoose.model("tbl_acr", acr_schema);

export default Acr;
