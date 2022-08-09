import axios from "axios";

const API_URL = "/api/adjustment/";

// Create New Receipt
const createAdjustment = async (adjustmentData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, adjustmentData, config);
  return response.data;
};

// Get All Receipt Data
const getAdjustment = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const adjustmentService = {
  createAdjustment,
  getAdjustment,
};

export default adjustmentService;
