const router = require("express").Router();
const openDonationMiddleware = require("../middleware/openDonationMiddleware");
const tokenVerify = require("../middleware/tokenOpenDonation");
const donationController = require("../controllers/openDonationControllers");
router.post("/openDonation/create", openDonationMiddleware.uploadImg, tokenVerify.tokenVerify, openDonationMiddleware.donationValidate, donationController.create);
router.put("/openDonation/update/:openDonationId", openDonationMiddleware.uploadImg, tokenVerify.tokenVerify, openDonationMiddleware.donationValidateUpdate, donationController.update);
router.get("/openDonation/my", tokenVerify.tokenVerify, donationController.getAllByUser);
router.get("/openDonation/", donationController.getAll);
router.get("/openDonation/detail/:id", donationController.getAllById);
router.delete("/openDonation/delete/:openDonationId", tokenVerify.tokenVerify, donationController.delete);

module.exports = router;
