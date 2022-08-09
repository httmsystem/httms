import asyncHandler from "express-async-handler";
import Release from "../model/release_model.js";

// @desc    Get Release
// @routes  GET /api/release
// @access  Private
const getRelease = asyncHandler(async (req, res) => {
  const release = await Release.find();
  res.status(200).json(release);
});

// @desc    Set Release
// @routes  POST /api/release
// @access  Private
const setRelease = asyncHandler(async (req, res) => {
  const { no, invoice_no, particular, release_details, total_amount } =
    req.body;

  // Create Invoice
  const release = await Release.create({
    no,
    invoice_no,
    particular,
    release_details,
    total_amount,
  });
  res.status(200).json(release);
});

// @desc    Update Invoice
// @routes  PUT /api/invoice/:id
// @access  Private
const updateRelease = asyncHandler(async (req, res) => {
  const release = await Release.findById(req.params.id);
  if (!release) {
    res.status(400);
    throw new Error("Release not found");
  }

  if (release) {
    release.no = req.body.no || release.no;
    release.invoice_no = req.body.invoice_no || release.invoice_no;
    release.particular = req.body.particular || release.particular;
    release.release_details =
      req.body.release_details || release.release_details;
    release.total_amount = req.body.total_amount || release.total_amount;

    const updatedRelease = await release.save();

    res.json({
      _id: updatedRelease._id,
      no: updatedRelease.no,
      invoice_no: updatedRelease.invoice_no,
      desc: updatedRelease.desc,
      release_details: updatedRelease.release_details,
      total_amount: updatedRelease.total_amount,
    });
  } else {
    res.status(404);
    throw new Error("Release not found");
  }
});

export { getRelease, setRelease, updateRelease };
