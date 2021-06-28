const express = require("express");

const router = express.Router();
const { register, login, putUser } = require("../controllers/userControllers");
const { getTokenLogin } = require("../middleware/auth");

//======================= USER =============================
router.post("/user/register", register);
router.post("/user/login", login, getTokenLogin);
router.put("/user/editProfile/:id", putUser);

module.exports = router;
