const router = require("express").Router();
const openDonationMiddleware = require("../middleware/openDonationMiddleware");
const tokenVerify = require("../middleware/tokenOpenDonation");
const donationController = require("../controllers/openDonationControllers");
router.post(
  "/openDonation/create",
  tokenVerify.tokenVerify,
  openDonationMiddleware.donationValidate,
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
router.get("/openDonation/", donationController.getAll);
router.get(
  "/openDonation/detail/:openDonationId",
  donationController.getAllById
);
router.delete(
  "/openDonation/delete/:openDonationId",
  tokenVerify.tokenVerify,
  donationController.delete
);

module.exports = router;
