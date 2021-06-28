const express = require("express");

const router = express.Router();

//const { checkUser } = require("../middleware/auth");
const { checkUser } = require("../middleware/auth");
const { createOpenDonation } = require("../controllers/openDonationControllers");

router.post("/addOpenDonation", checkUser, createOpenDonation);

module.exports = router;
