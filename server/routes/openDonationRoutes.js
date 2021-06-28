const router = require("express").Router();
const openDonationMiddleware = require("../middleware/openDonationMiddleware");
const tokenVerify = require("../middleware/tokenOpenDonation");
const donationController = require("../controllers/openDonationControllers");
router.post(
  "/api/openDonation/create",
  tokenVerify.tokenVerify,
  openDonationMiddleware.donationValidate,
  donationController.create
);
router.put(
  "/api/openDonation/update/:openDonationId",
  openDonationMiddleware.donationValidate,
  tokenVerify.tokenVerify,
  donationController.update
);
router.get(
  "/api/openDonation/my",
  tokenVerify.tokenVerify,
  donationController.getAllByUser
);
router.get("/api/openDonation/", donationController.getAll);
router.get(
  "/api/openDonation/detail/:openDonationId",
  tokenVerify.tokenVerify,
  donationController.getAllById
);
router.delete(
  "/api/openDonation/delete/:openDonationId",
  tokenVerify.tokenVerify,
  donationController.delete
);

module.exports = router;
