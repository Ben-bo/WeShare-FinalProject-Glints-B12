const express = require("express");

const router = express.Router();
const {
  createDonature,
  getAllDonature,
  getDonatureById,
  getMyDonation,
} = require("../controllers/donatureControllers");

const { tokenVerify } = require("../middleware/tokenDonature");
const { donationValidate } = require("../middleware/donatureMiddleware");

//========================================Donature==============================
router.get("/myDonation", getMyDonation);
router.get("/allDonature", getAllDonature);
router.get("/donatureById/:id", getDonatureById);
router.post("/createDonature", tokenVerify, createDonature);

//========================================Export Router===============================
module.exports = router;
