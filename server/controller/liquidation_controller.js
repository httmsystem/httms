import asyncHandler from "express-async-handler";
import Liquidation from "../model/liquidation_model.js";

// @desc    Get Liquidation
// @routes  GET /api/liquidation
// @access  Private
const getLiquidation = asyncHandler(async (req, res) => {
  const liquidation = await Liquidation.find();
  res.status(200).json(liquidation);
});

// @desc    Set Liquidation
// @routes  POST /api/liquidation
// @access  Private
const setLiquidation = asyncHandler(async (req, res) => {
  const { no, passenger, received_php, received_usd, status } = req.body;

  // Create Liquidation
  const liquidation = await Liquidation.create({
    no,
    passenger,
    received_php,
    received_usd,
    status,
  });
  res.status(200).json(liquidation);
});

// @desc    Update Liquidation
// @routes  PUT /api/liquidation/:id
// @access  Private
const updateLiquidation = asyncHandler(async (req, res) => {
  const liquidation = await Liquidation.findById(req.params.id);
  if (!liquidation) {
    res.status(400);
    throw new Error("Liquidation not found");
  }

  if (liquidation) {
    liquidation.no = req.body.no || liquidation.no;
    liquidation.passenger = req.body.passenger || liquidation.passenger;
    liquidation.received_php =
      req.body.received_php || liquidation.received_php;
    liquidation.received_usd =
      req.body.received_usd || liquidation.received_usd;
    liquidation.status = req.body.status || liquidation.status;

    const updatedLiquidation = await liquidation.save();

    res.json({
      _id: updatedLiquidation._id,
      no: updatedLiquidation.no,
      passenger: updatedLiquidation.passenger,
      received_php: updatedLiquidation.received_php,
      received_usd: updatedLiquidation.received_usd,
      status: updatedLiquidation.status,
    });
  } else {
    res.status(404);
    throw new Error("Liquidation not found");
  }
});

export { getLiquidation, setLiquidation, updateLiquidation };
