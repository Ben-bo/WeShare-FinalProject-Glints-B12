const { Patient, Category, OpenDonation, DonationType, Donature } = require("../models");
const routes = {};

routes.createPatient = async (req, res) => {
  try {
    const patients = await Patient.create({
      ...req.body,
    });
    const patientsResult = {
      statusCode: 200,
      statusText: "Success",
      message: "Patient has been create",
      data: patients,
    };
    res.json(patientsResult);
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

routes.getAllPatient = async (req, res) => {
  try {
    const allPatient = await Patient.findAll();
    res.send({
      statusCode: 200,
      statusText: "success",
      message: " Success to get all Patients",
      data: allPatient,
    });
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: `Sorry, we failed to get all activities data`,
      Error: err,
    });
  }
};

routes.getAllPatientIncludeDonature = async (req, res) => {
  try {
    const patient = await Patient.findAll({
      include: [{ model: Donature }],
    });
    const patientResult = {
      statusCode: 200,
      statusText: "Show all Patient include donature",
      data: patient,
    };
    res.json(patientResult);
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

routes.getDetailDonation = async (req, res) => {
  try {
    const patientId = req.params.id;
    const detailDonation = await Patient.findOne({
      include: [{ model: Category, include: [{ model: DonationType, include: [Donature] }, OpenDonation] }],

      where: { id: patientId },
    });
    if (detailDonation) {
      const Result = {
        statusCode: 200,
        statusText: "Success",
        message: `Show detail Donation for Patient Id : ${patientId}`,
        patient: detailDonation,
      };
      res.json(Result);
    } else {
      res.status(500).json("Data not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

module.exports = routes;
