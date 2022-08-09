import mongoose from "mongoose";

const bank_schema = mongoose.Schema(
  {
    bank_name: {
      type: String,
    },
    acct_no: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Bank = mongoose.model("tbl_bank", bank_schema);

export default Bank;
