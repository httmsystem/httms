import mongoose from "mongoose";

const psdSchema = mongoose.Schema(
  {
    no: { type: String },
    supplier_no: { type: String },
    product_no: {
      type: String,
    },
    passenger_no: {
      type: String,
    },
    currency: {
      type: String,
    },
    cost_in_php: {
      type: Number,
    },
    cost_in_usd: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Productservicedeploy = mongoose.model(
  "tbl_product_service_deploy",
  psdSchema
);

export default Productservicedeploy;
