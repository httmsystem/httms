import axios from "axios";

const API_URL = "/api/release/";

// CREATE INVOICE
const createRelease = async (releaseData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, releaseData, config);
  return response.data;
};

// GET ALL INVOICE
const getRelease = async (token) => {
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
const updateRelease = async (releaseData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + releaseData._id,
    releaseData,
    config
  );
  return response.data;
};

const releaseService = {
  createRelease,
  getRelease,
  updateRelease,
};

export default releaseService;
