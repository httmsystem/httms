import mongoose from "mongoose";

const suppliers_schema = mongoose.Schema(
  {
    product_services_type: {
      type: String,
    },
    name: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Suppliers = mongoose.model("tbl_suppliers", suppliers_schema);

export default Suppliers;
