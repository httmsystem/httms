import mongoose from "mongoose";

const gds_schema = mongoose.Schema(
  {
    series: {
      type: Array,
    },
    header: {
      type: String,
    },
    gds_type: {
      type: String,
    },
    airline: {
      type: String,
    },
  },

  { timestamps: true }
);

const Gds = mongoose.model("tbl_gds", gds_schema);

export default Gds;
