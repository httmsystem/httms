import axios from "axios";

const API_URL = "/api/psd/";

// Create New PSD
const createPsd = async (psdData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, psdData, config);
  return response.data;
};

// Get All PSD
const getPsd = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update PSD
const updatePsd = async (psdData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + psdData._id, psdData, config);
  return response.data;
};
const psdService = {
  createPsd,
  getPsd,
  updatePsd,
};

export default psdService;
