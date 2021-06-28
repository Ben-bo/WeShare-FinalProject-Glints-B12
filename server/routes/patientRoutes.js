const express = require("express");

const router = express.Router();

const { checkUser } = require("../middleware/auth");
const { createPatient, getAllPatientIncludeDonature, getAllPatient, getDetailDonation } = require("../controllers/patientControllers");

router.post("/addPatient", checkUser, createPatient);
router.get("/patient%donature", getAllPatientIncludeDonature);
router.get("/getAllPatients", getAllPatient);
router.get("/detailDonation/:id", getDetailDonation);

module.exports = router;
