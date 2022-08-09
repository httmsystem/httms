import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    customer_type: {
      type: String,
    },
    acct_name: {
      type: String,
    },
    address: {
      type: String,
    },
    contact_no: {
      type: String,
    },
    contact_person: {
      type: String,
    },
    credit_limit_default_value: {
      type: String,
    },
    payment_term: {
      type: String,
    },
    email: {
      type: String,
    },
    remarks: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("tbl_customer", customerSchema);

export default Customer;
