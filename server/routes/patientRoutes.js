const express = require("express");

const router = express.Router();

const {createPatient} = require("../controllers/patientControllers");

router.post("/patient", createPatient);

module.exports = router;