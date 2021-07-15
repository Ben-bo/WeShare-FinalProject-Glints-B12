const express = require("express");

const router = express.Router();

//==Import Controller===================================================================================================================
const { createPayment } = require("../controllers/paymentControllers");
const { uploadImg } = require("../middleware/paymentMiddleware");

//==Router===================================================================================================================
router.post("/createPayment", uploadImg, createPayment);

//==Export Routes===================================================================================================================

module.exports = router;
