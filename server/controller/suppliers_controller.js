import asyncHandler from "express-async-handler";
import Suppliers from "../model/suppliers_model.js";

// @desc    Get Supplier
// @routes  GET /api/suppliers
// @access  Private
const getSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Suppliers.find();
  res.status(200).json(suppliers);
});

// @desc    Set Supplier
// @routes  POST /api/suppliers
// @access  Private
const setSuppliers = asyncHandler(async (req, res) => {
  const { product_services_type, name, status } = req.body;

  // Create Supplier
  const suppliers = await Suppliers.create({
    product_services_type,
    name,
    status,
  });
  res.status(200).json(suppliers);
});

// @desc    Update Supplier
// @routes  PUT /api/suppliers/:id
// @access  Private
const updateSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Suppliers.findById(req.params.id);
  if (!suppliers) {
    res.status(400);
    throw new Error("Supplier are not found");
  }
  const user = await Users.findById(req.user.id);
  //   Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Make sure the logged in user matches the user
  if (suppliers.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updated_suppliers = await Suppliers.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updated_suppliers);
});

// @desc    Delete Supplier
// @routes  DELETE /api/suppliers/:id
// @access  Private
const deleteSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Suppliers.findById(req.params.id);
  if (!suppliers) {
    res.status(400);
    throw new Error("Suppliers are not found");
  }
  //   Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Make sure the logged in user matches the user
  // if (suppliers.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  await suppliers.remove();
  res.status(200).json({ id: req.params.id });
});

export { getSuppliers, setSuppliers, updateSuppliers, deleteSuppliers };
