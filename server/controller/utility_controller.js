import asyncHandler from "express-async-handler";
import Utility from "../model/utility_model.js";

// @desc    Get Utility
// @routes  GET /api/utility
// @access  Private
const getUtility = asyncHandler(async (req, res) => {
  const utility = await Utility.find();
  res.status(200).json(utility);
});

// @desc    Set Utility
// @routes  POST /api/utility
// @access  Private
const setUtility = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Create ACR
  const utility = await Utility.create({
    name,
  });
  res.status(200).json(utility);
});


export { getUtility, setUtility };