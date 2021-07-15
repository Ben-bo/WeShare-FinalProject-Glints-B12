const express = require("express");

const router = express.Router();

//==Import Controller===================================================================================================================
const { createPayment } = require("../controllers/paymentControllers");

//==Router===================================================================================================================
router.post("/createPayment", createPayment);

//==Export Routes===================================================================================================================

module.exports = router;
