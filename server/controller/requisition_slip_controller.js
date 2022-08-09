import asyncHandler from "express-async-handler";
import RequisitionSlip from "../model/requisition_slip_model.js";

// @desc    Get Requisition Slip
// @routes  GET /api/requisition_slip
// @access  Private
const getReqSlip = asyncHandler(async (req, res) => {
  const requisition_slip = await RequisitionSlip.find();
  res.status(200).json(requisition_slip);
});

// @desc    Set Requisition Slip
// @routes  POST /api/requisition_slip
// @access  Private
const setReqSlip = asyncHandler(async (req, res) => {
  const {
    particular,
    ref_no,
    booking_no,
    rs_no,
    acr,
    customer,
    product_service,
    product_service_compute,
    passenger,
    grand_total_cost,
    grand_total_selling,
    payment_due,
    encode_by,
    handler_by,
    remarks,
    payment_detail,
    status,
  } = req.body;
  // Create Requisition Slip
  const requisition_slip = await RequisitionSlip.create({
    particular,
    ref_no,
    booking_no,
    rs_no,
    acr,
    customer,
    product_service,
    product_service_compute,
    passenger,
    grand_total_cost,
    grand_total_selling,
    payment_due,
    encode_by,
    handler_by,
    remarks,
    payment_detail,
    status,
  });
  res.status(200).json(requisition_slip);
});

// @desc    Update Requisition Slip
// @routes  PUT /api/requisition_slip/:id
// @access  Private
const updateReqSlip = asyncHandler(async (req, res) => {
  const requisition_slip = await RequisitionSlip.findById(req.params.id);
  if (!requisition_slip) {
    res.status(400);
    throw new Error("Booking not found");
  }

  if (requisition_slip) {
    requisition_slip.particular =
      req.body.particular || requisition_slip.particular;
    requisition_slip.ref_no = req.body.ref_no || requisition_slip.ref_no;
    requisition_slip.booking_no =
      req.body.booking_no || requisition_slip.booking_no;
    requisition_slip.rs_no = req.body.rs_no || requisition_slip.rs_no;
    requisition_slip.acr = req.body.acr || requisition_slip.acr;
    requisition_slip.customer = req.body.customer || requisition_slip.customer;
    requisition_slip.product_service =
      req.body.product_service || requisition_slip.product_service;
    requisition_slip.product_service_compute =
      req.body.product_service_compute ||
      requisition_slip.product_service_compute;
    requisition_slip.passenger =
      req.body.passenger || requisition_slip.passenger;
    requisition_slip.grand_total_cost =
      req.body.grand_total_cost || requisition_slip.grand_total_cost;
    requisition_slip.grand_total_selling =
      req.body.grand_total_selling || requisition_slip.grand_total_selling;
    requisition_slip.payment_due =
      req.body.payment_due || requisition_slip.payment_due;
    requisition_slip.payment_detail =
      req.body.payment_detail || requisition_slip.payment_detail;
    requisition_slip.encode_by =
      req.body.encode_by || requisition_slip.encode_by;
    requisition_slip.handler_by =
      req.body.handler_by || requisition_slip.handler_by;
    requisition_slip.status = req.body.status || requisition_slip.status;

    const updatedReqSlip = await requisition_slip.save();

    res.json({
      _id: updatedReqSlip._id,
      particular: updatedReqSlip.particular,
      ref_no: updatedReqSlip.ref_no,
      booking_no: updatedReqSlip.booking_no,
      rs_no: updatedReqSlip.rs_no,
      acr: updatedReqSlip.acr,
      customer: updatedReqSlip.customer,
      product_service: updatedReqSlip.product_service,
      product_service_compute: updatedReqSlip.product_service_compute,
      passenger: updatedReqSlip.passenger,
      grand_total_cost: updatedReqSlip.grand_total_cost,
      grand_total_selling: updatedReqSlip.grand_total_selling,
      payment_due: updatedReqSlip.payment_due,
      payment_detail: updatedReqSlip.payment_detail,
      encode_by: updatedReqSlip.encode_by,
      handler_by: updatedReqSlip.handler_by,
      status: updatedReqSlip.status,
    });
  } else {
    res.status(404);
    throw new Error("Booking not found");
  }
});

export { getReqSlip, setReqSlip, updateReqSlip };
