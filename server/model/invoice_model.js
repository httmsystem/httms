import mongoose from "mongoose";

const invoice_schema = mongoose.Schema(
  {
    no: {},
    invoice_no: {
      type: String,
    },
    desc: { type: String },
    payment_type: { type: String },
    currency: { type: String },
    supplier_account: {},
    payee: { type: String },
    date_invoice: {},
    term: { type: String },
    due_date: {},
    remark: { type: String },
    amount: {
      type: Number,
    },
    payable_list: {
      type: Array,
    },
    status: {
      type: String,
    },
  },

  { timestamps: true }
);

const Invoice = mongoose.model("tbl_invoice", invoice_schema);

export default Invoice;
