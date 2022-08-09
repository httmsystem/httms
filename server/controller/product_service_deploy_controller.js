import asyncHandler from "express-async-handler";
import Productservicedeploy from "../model/product_service_deploy_model.js";

// @desc    Get Prouct Service Deploy
// @routes  GET /api/psd
// @access  Private
const getPsd = asyncHandler(async (req, res) => {
  const product_service_deploy = await Productservicedeploy.find();
  res.status(200).json(product_service_deploy);
});

// @desc    Set GDS
// @routes  POST /api/psd
// @access  Private
const setPsd = asyncHandler(async (req, res) => {
  // Create Prouct Service Deploy
  const product_service_deploy = await Productservicedeploy.insertMany(
    req.body
  );
  res.status(200).json(product_service_deploy);
});

// @desc    Update Prouct Service Deploy
// @routes  PUT /api/psd/:id
// @access  Private
const updatePsd = asyncHandler(async (req, res) => {
  const product_service_deploy = await Productservicedeploy.findById(
    req.params.id
  );
  if (!product_service_deploy) {
    res.status(400);
    throw new Error("Payable not found");
  }

  if (product_service_deploy) {
    product_service_deploy.no = req.body.no || product_service_deploy.no;
    product_service_deploy.supplier_no =
      req.body.supplier_no || product_service_deploy.supplier_no;
    product_service_deploy.product_no =
      req.body.product_no || product_service_deploy.product_no;
    product_service_deploy.currency =
      req.body.currency || product_service_deploy.currency;
    product_service_deploy.cost_in_php =
      req.body.cost_in_php || product_service_deploy.cost_in_php;
    product_service_deploy.cost_in_usd =
      req.body.cost_in_usd || product_service_deploy.cost_in_usd;
    product_service_deploy.status =
      req.body.status || product_service_deploy.status;

    const updatedPsd = await product_service_deploy.save();

    res.json({
      _id: updatedPsd._id,
      no: updatedPsd.no,
      supplier_no: updatedPsd.supplier_no,
      product_no: updatedPsd.product_no,
      currency: updatedPsd.currency,
      cost_in_php: updatedPsd.cost_in_php,
      cost_in_usd: updatedPsd.cost_in_usd,
      status: updatedPsd.status,
    });
  } else {
    res.status(404);
    throw new Error("Payable not found");
  }
});

export { getPsd, setPsd, updatePsd };
