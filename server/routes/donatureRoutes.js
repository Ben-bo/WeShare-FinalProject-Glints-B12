const express = require("express");

const router = express.Router();
const {
  createDonature,
  getAllDonature,
  getDonatureById,
  putDonature,
  getMyDonation,
} = require("../controllers/donatureControllers");

//========================================Donature==============================
router.get("/myDonation", getMyDonation);

//========================================Export Router===============================
module.exports = router;
