import axios from "axios";

const API_URL = "/api/customer/";

// Create New Customer
const createCustomer = async (customerData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, customerData, config);
  return response.data;
};

// Get All Customer Data
const getCustomer = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Search for Customer
const searchCustomer = async (keyword, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `/api/customer/search?keyword=${keyword}`,
    config
  );
  return response.data;
};

// Update Customer Account
const updateCustomer = async (customerData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + customerData._id,
    customerData,
    config
  );
  return response.data;
};

// Delete Customer Data
const deleteCustomer = async (customerId, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + customerId, config);
  return response.data;
};

const customerService = {
  updateCustomer,
  createCustomer,
  getCustomer,
  deleteCustomer,
  searchCustomer,
};

export default customerService;
