import asyncHandler from "express-async-handler";
import Gds from "../model/gds_model.js";

// @desc    Get GDS
// @routes  GET /api/gds
// @access  Private
const getGds = asyncHandler(async (req, res) => {
  const gds = await Gds.find();
  res.status(200).json(gds);
});

// @desc    Set GDS
// @routes  POST /api/gds
// @access  Private
const setGds = asyncHandler(async (req, res) => {
  const { series, header, gds_type, airline } = req.body;

  // Create Gds
  const gds = await Gds.create({
    series,
    header,
    gds_type,
    airline,
  });
  res.status(200).json(gds);
});

export { getGds, setGds };
