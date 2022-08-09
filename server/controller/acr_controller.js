import asyncHandler from "express-async-handler";
import Acr from "../model/acr_model.js";

// @desc    Get ACR
// @routes  GET /api/acr
// @access  Private
const getAcr = asyncHandler(async (req, res) => {
  const acr = await Acr.find();
  res.status(200).json(acr);
});

// @desc    Set ACR
// @routes  POST /api/acr
// @access  Private
const setAcr = asyncHandler(async (req, res) => {
  const { rate, date } = req.body;

  // Create ACR
  const acr = await Acr.create({
    rate,
    date,
  });
  res.status(200).json(acr);
});


export { getAcr, setAcr };
