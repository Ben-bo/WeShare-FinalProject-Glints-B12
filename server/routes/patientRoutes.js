const express = require("express");

const router = express.Router();

const patientController = require("../controllers/patientControllers");

router.post("/patient", patientController.createPatient);

module.exports = router;