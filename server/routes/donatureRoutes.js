const express = require("express");

const router = express.Router();

//const { checkUser } = require("../middleware/auth");
const { createDonature } = require("../controllers/donatureControllers");

router.post("/addDonature", createDonature);

module.exports = router;
