const express = require("express");

const router = express.Router();

//==Import Controller===================================================================================================================
const {
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentControllers");
const { uploadImg } = require("../middleware/paymentMiddleware");

//==Router===================================================================================================================
router.post("/createPayment", uploadImg, createPayment);
router.get("/getPayment", getPayment);
router.put("/updatePayment/:id", uploadImg, updatePayment);
router.delete("/deletePayment/:id", deletePayment);

//==Export Routes===================================================================================================================

module.exports = router;
