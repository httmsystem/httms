import axios from "axios";

const API_URL = "/api/liquidation/";

// CREATE Liquidation
const createLiquidation = async (liquidationData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, liquidationData, config);
  return response.data;
};

// GET ALL Liquidation
const getLiquidation = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update Liquidation
const updateLiquidation = async (liquidationData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + liquidationData._id,
    liquidationData,
    config
  );
  return response.data;
};

const liquidationService = {
  createLiquidation,
  getLiquidation,
  updateLiquidation
};

export default liquidationService;
