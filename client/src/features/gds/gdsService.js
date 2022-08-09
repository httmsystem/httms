import axios from "axios";

const API_URL = "/api/gds/";

// Create New Gds
const createGds = async (gdsData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, gdsData, config);
  return response.data;
};

// Get All Gds Data
const getGds = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const gdsService = {
  createGds,
  getGds,
};

export default gdsService;
