const express = require("express");

const router = express.Router();
//==Import Controller===================================================================================================================

const {
  createDonature,
  getAllDonature,
  getDonatureById,
  getMyDonation,
} = require("../controllers/donatureControllers");

const {
  tokenVerify,
  donatureValidate,
} = require("../middleware/donatureMiddleware");

//==Donature===================================================================================================================

router.get("/myDonation", getMyDonation);
router.get("/allDonature", getAllDonature);
router.get("/donatureById/:id", getDonatureById);
router.post("/createDonature", tokenVerify, donatureValidate, createDonature);

//==Export Routes===================================================================================================================

module.exports = router;
