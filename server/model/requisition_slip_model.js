import mongoose from "mongoose";

const requisition_slip_schema = mongoose.Schema(
  {
    particular: {
      type: String,
    },
    ref_no: {
      type: String,
    },
    acr: {},
    booking_no: {
      type: String,
    },
    rs_no: {
      type: String,
    },
    customer: {},
    product_service: {
      type: Array,
    },
    product_service_compute: {},
    grand_total_cost: {},
    passenger: {
      type: Array,
    },
    grand_total_selling: {},
    payment_due: {
      type: String,
    },
    encode_by: {},
    handler_by: {},
    remarks: { type: String },

    payment_detail: {},
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const RequisitionSlip = mongoose.model("tbl_req_slip", requisition_slip_schema);

export default RequisitionSlip;
