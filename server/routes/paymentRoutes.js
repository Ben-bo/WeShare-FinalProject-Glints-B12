const express = require("express");

const router = express.Router();

//==Import Controller===================================================================================================================
const {
  createPayment,
  getPayment,
  updatePayment,
} = require("../controllers/paymentControllers");
const { uploadImg } = require("../middleware/paymentMiddleware");

//==Router===================================================================================================================
router.post("/createPayment", uploadImg, createPayment);
router.get("/getPayment", getPayment);
router.put("/updatePayment");

//==Export Routes===================================================================================================================

module.exports = router;
