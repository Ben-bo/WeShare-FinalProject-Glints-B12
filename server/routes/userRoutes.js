const express = require("express");

const router = express.Router();
const { register, login, putUser, getUserById, forgetPassword } = require("../controllers/userControllers");
const { getTokenLogin } = require("../middleware/auth");
const { uploadImg } = require("../middleware/openDonationMiddleware");
const { imageUpload } = require("../helper/fileUpload");
//======================= USER =============================
router.post("/user/register", register);
router.post("/user/login", login, getTokenLogin);
router.put("/user/editProfile/:id", uploadImg, imageUpload, putUser);
router.get("/user/:id", getUserById);
router.put("/user/forgetPassword", forgetPassword);

module.exports = router;
