import axios from "axios";

const API_URL = "/api/suppliers/";

// Create New Supplier
const createSuppliers = async (suppliersData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, suppliersData, config);
  return response.data;
};

// Get All Suppliers Data
const getSuppliers = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const deleteSuppliers = async (supplierId, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + supplierId, config);
  return response.data;
};
const supplierService = {
  createSuppliers,
  getSuppliers,
  deleteSuppliers,
};

export default supplierService;
