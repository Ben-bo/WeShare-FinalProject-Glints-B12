const express = require("express");

const router = express.Router();

const donationTypeController = require("../controllers/donationTypeControllers");

router.post("/donationType", donationTypeController.createDonationType);

module.exports = router;