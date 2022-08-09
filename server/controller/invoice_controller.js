import asyncHandler from "express-async-handler";
import Invoice from "../model/invoice_model.js";

// @desc    Get Invoice
// @routes  GET /api/invoice
// @access  Private
const getInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.find();
  res.status(200).json(invoice);
});

// @desc    Set Invoice
// @routes  POST /api/invoice
// @access  Private
const setInvoice = asyncHandler(async (req, res) => {
  const {
    no,
    invoice_no,
    desc,
    payment_type,
    currency,
    supplier_account,
    payee,
    date_invoice,
    term,
    due_date,
    remark,
    amount,
    payable_list,
    status,
  } = req.body;

  // Create Invoice
  const invoice = await Invoice.create({
    no,
    invoice_no,
    desc,
    payment_type,
    currency,
    supplier_account,
    payee,
    date_invoice,
    term,
    due_date,
    remark,
    amount,
    payable_list,
    status,
  });
  res.status(200).json(invoice);
});

// @desc    Update Invoice
// @routes  PUT /api/invoice/:id
// @access  Private
const updateInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) {
    res.status(400);
    throw new Error("Invoice not found");
  }

  if (invoice) {
    invoice.no = req.body.no || invoice.no;
    invoice.invoice_no = req.body.invoice_no || invoice.invoice_no;
    invoice.desc = req.body.desc || invoice.desc;
    invoice.payment_type = req.body.payment_type || invoice.payment_type;
    invoice.currency = req.body.currency || invoice.currency;

    invoice.supplier_account =
      req.body.supplier_account || invoice.supplier_account;
    invoice.date_invoice = req.body.date_invoice || invoice.date_invoice;
    invoice.term = req.body.term || invoice.term;
    invoice.due_date = req.body.due_date || invoice.due_date;
    invoice.remark = req.body.remark || invoice.remark;
    invoice.amount = req.body.amount || invoice.amount;
    invoice.payable_list = req.body.payable_list || invoice.payable_list;
    invoice.status = req.body.status || invoice.status;

    const updatedPsd = await invoice.save();

    res.json({
      _id: updatedPsd._id,
      no: updatedPsd.no,
      invoice_no: updatedPsd.invoice_no,
      desc: updatedPsd.desc,
      payment_type: updatedPsd.payment_type,
      currency: updatedPsd.currency,
      supplier_account: updatedPsd.supplier_account,
      date_invoice: updatedPsd.date_invoice,
      term: updatedPsd.term,
      due_date: updatedPsd.due_date,
      remark: updatedPsd.remark,
      amount: updatedPsd.amount,
      payable_list: updatedPsd.payable_list,
      status: updatedPsd.status,
    });
  } else {
    res.status(404);
    throw new Error("Invoice not found");
  }
});

export { getInvoice, setInvoice, updateInvoice };
