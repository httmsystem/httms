import axios from "axios";

const API_URL = "/api/users/";

// Create New User Account
const createUser = async (userData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, userData, config);
  return response.data;
};

// Get All Suppliers Data
const getUser = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update User Account
const updateUser = async (userData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + userData._id, userData, config);
  return response.data;
};

// Delete User Account
const deleteUser = async (userData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + userData, config);
  return response.data;
};


const userService = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};

export default userService;
