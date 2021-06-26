const router = require("express").Router();
const openDonationMiddleware = require("../middleware/openDonationMiddleware");
const tokenVerify = require("../middleware/tokenOpenDonation");
const donationController = require("../controllers/openDonationControllers");
router.post(
  "/openDonation",
  openDonationMiddleware.donationValidate,
  tokenVerify.tokenVerify,
  donationController.create
);
router.put(
  "/openDonation/update/:openDonationId",
  openDonationMiddleware.donationValidate,
  tokenVerify.tokenVerify,
  donationController.update
);
router.get(
  "/openDonation/my",
  tokenVerify.tokenVerify,
  donationController.getAllByUser
);
router.get(
  "/openDonation/my/:openDonationId",
  tokenVerify.tokenVerify,
  donationController.getAllById
);
router.delete(
  "/openDonation/delete/:openDonationId",
  tokenVerify.tokenVerify,
  donationController.delete
);

module.exports = router;
