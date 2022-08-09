import axios from "axios";

const API_URL = "/api/invoice/";

// CREATE INVOICE
const createInvoice = async (invoiceData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, invoiceData, config);
  return response.data;
};

// GET ALL INVOICE
const getInvoice = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// UPDATE INVOICE
const updateInvoice = async (invoiceData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + invoiceData._id,
    invoiceData,
    config
  );
  return response.data;
};

const invoiceService = {
  createInvoice,
  getInvoice,
  updateInvoice,
};

export default invoiceService;
