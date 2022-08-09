import axios from "axios";

const API_URL = "/api/utility/";

// Create New Utility
const createUtility = async (utilityData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, utilityData, config);
  return response.data;
};

// Get All Utility Data
const getUtility = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const utilityService = {
  createUtility,
  getUtility,
};

export default utilityService;
