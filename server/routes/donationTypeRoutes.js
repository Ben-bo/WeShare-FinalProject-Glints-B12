const express = require("express");

const router = express.Router();

const {createDonationType} = require("../controllers/donationTypeControllers");

router.post("/donationType", createDonationType);

module.exports = router;