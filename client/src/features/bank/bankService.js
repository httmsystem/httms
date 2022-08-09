import axios from "axios";

const API_URL = "/api/bank/";

// Create New Bank
const createBank = async (bankData, token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL, bankData, config);
    return response.data;
  };

  // Get All Bank Data
const getBank = async (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(API_URL, config);
    return response.data;
  };

  const bankService = {
    createBank,
    getBank,
  };
  
  export default bankService;