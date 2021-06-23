const express = require("express");

const router = express.Router();
const { register, login, putUser } = require("../controllers/userControllers");
const { getTokenLogin, getTokenRegister } = require("../middleware/auth");

//======================= USER =============================
router.post("/register", register);
router.post("/login", login, getTokenLogin);
router.put("/editProfile/:id", putUser);

module.exports = router;
