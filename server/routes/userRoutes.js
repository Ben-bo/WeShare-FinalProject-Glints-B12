const express = require("express");

const router = express.Router();
const { register, login, putUser, getUserById, forgetPassword, verifyAccount } = require("../controllers/userControllers");
const { getTokenLogin } = require("../middleware/auth");
const { uploadImgArr } = require("../middleware/openDonationMiddleware");
const { imageUpload, filterImage } = require("../helper/fileUpload");
//======================= USER =============================
router.post("/user/register", register);
router.post("/user/login", login, getTokenLogin);
router.put("/user/verifyAccount/:id", uploadImgArr, filterImage, verifyAccount);
router.put("/user/editProfile/:id", uploadImgArr, imageUpload, putUser);
router.get("/user/:id", getUserById);
router.put("/user/forgetPassword", forgetPassword);

module.exports = router;
