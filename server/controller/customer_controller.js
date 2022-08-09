import asyncHandler from "express-async-handler";
import Customer from "../model/customer_model.js";

// @desc    Get Customer
// @routes  GET /api/customer
// @access  Private
const getCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.find();
  res.status(200).json(customer);
});

// @desc    Search Customer
// @routes  GET /api/customer
// @access  Private
const searchCustomer = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        // Only acct_name of the customer can search
        acct_name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const customer = await Customer.find({
    ...keyword,
  });
  res.status(200).json(customer);
});

// @desc    Set Customer
// @routes  POST /api/customer
// @access  Private
const setCustomer = asyncHandler(async (req, res) => {
  const {
    customer_type,
    acct_name,
    address,
    contact_no,
    contact_person,
    credit_limit_default_value,
    payment_term,
    email,
    remarks,
    status,
  } = req.body;

  // Create Customer
  const customer = await Customer.create({
    customer_type,
    acct_name,
    address,
    contact_no,
    contact_person,
    credit_limit_default_value,
    payment_term,
    email,
    remarks,
    status,
  });
  res.status(200).json(customer);
});

// @desc    Update Customer
// @routes  PUT /api/customer/:id
// @access  Private
const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(400);
    throw new Error("Customer not found");
  }

  if (customer) {
    customer.customer_type = req.body.customer_type || customer.customer_type;
    customer.acct_name = req.body.acct_name || customer.acct_name;
    customer.address = req.body.address || customer.address;
    customer.contact_no = req.body.contact_no || customer.contact_no;
    customer.contact_person =
      req.body.contact_person || customer.contact_person;
    customer.credit_limit_default_value =
      req.body.credit_limit_default_value ||
      customer.credit_limit_default_value;
    customer.payment_term = req.body.payment_term || customer.payment_term;
    customer.email = req.body.email || customer.email;
    customer.remarks = req.body.remarks || customer.remarks;
    customer.status = req.body.status || customer.status;

    const updatedCustomer = await customer.save();

    res.json({
      _id: updatedCustomer._id,
      customer_type: updatedCustomer.customer_type,
      acct_name: updatedCustomer.acct_name,
      address: updatedCustomer.address,
      contact_no: updatedCustomer.contact_no,
      contact_person: updatedCustomer.contact_person,
      credit_limit_default_value: updatedCustomer.credit_limit_default_value,
      payment_term: updatedCustomer.payment_term,
      email: updatedCustomer.email,
      remarks: updatedCustomer.remarks,
      status: updatedCustomer.status,
    });
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
  // ARIEL NEED MO PA BA ETO KPAG HNDI NA DELETE MO NA

  // const user = await Users.findById(req.user.id);
  // //   Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error("User not found");
  // }
  // // Make sure the logged in user matches the user
  // if (customer.user.toString() !== user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  // const updated_customer = await Customer.findByIdAndUpdate(
  //   req.params.id,
  //   req.body,
  //   { new: true }
  // );
  // res.status(200).json(updated_customer);
});

// @desc    Delete Customer
// @routes  DELETE /api/customer/:id
// @access  Private
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(400);
    throw new Error("Customer are not found");
  }
  //   Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // // Make sure the logged in user matches the user
  // if (customer.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  await customer.remove();
  res.status(200).json({ id: req.params.id });
});

export {
  getCustomer,
  setCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomer,
};