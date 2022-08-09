import axios from "axios";

const API_URL = "/api/payment/";

// Create New Receipt
const createPayment = async (paymentData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, paymentData, config);
  return response.data;
};

// Get All Receipt Data
const getPayment = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};


const paymentService = {
  createPayment,
  getPayment,
};

export default paymentService;
