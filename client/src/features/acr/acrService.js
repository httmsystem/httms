import axios from "axios";

const API_URL = "/api/acr/";

// Create New Acr
const createAcr = async (acrData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, acrData, config);
  return response.data;
};

// Get All Acr Data
const getAcr = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const acrService = {
  createAcr,
  getAcr,
};

export default acrService;
