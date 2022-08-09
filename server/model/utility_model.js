import mongoose from "mongoose";

const utility_schema = mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const Utility = mongoose.model("tbl_utility", utility_schema);

export default Utility;
