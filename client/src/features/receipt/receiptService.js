import axios from "axios";

const API_URL = "/api/receipt/";

// Create New Receipt
const createReceipt = async (receiptData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, receiptData, config);
  return response.data;
};

// Get All Receipt Data
const getReceipt = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update Receipt
const updateReceipt = async (receiptData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + receiptData._id,
    receiptData,
    config
  );
  return response.data;
};

const receiptService = {
  createReceipt,
  getReceipt,
  updateReceipt,
};

export default receiptService;
