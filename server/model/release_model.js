import mongoose from "mongoose";

const release_schema = mongoose.Schema(
  {
    no: {},
    invoice_no: {
      type: String,
    },
    particular: { type: String },
    release_details: { type: Array },
    total_amount: { type: String },
  },

  { timestamps: true }
);

const Release = mongoose.model("tbl_release", release_schema);

export default Release;
