const router = require("express").Router();
const openDonationMiddleware = require("../middleware/openDonationMiddleware");
const tokenVerify = require("../middleware/tokenOpenDonation");
const donationController = require("../controllers/openDonationControllers");
router.post(
  "/openDonation",
  tokenVerify.tokenVerify,
  openDonationMiddleware.donationValidate,
  donationController.create
);
router.get("/my", tokenVerify.tokenVerify, donationController.getAllByUser);

module.exports = router;
