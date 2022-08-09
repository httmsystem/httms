import axios from "axios";

const API_URL = "/api/requisition_slip/";

// CREATE RS
const createRs = async (rsData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, rsData, config);
  return response.data;
};

// Get All RS Data
const getRs = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update RS
const updateRs = async (rsData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + rsData._id, rsData, config);
  return response.data;
};

const rsService = {
  createRs,
  getRs,
  updateRs,
};
export default rsService;
