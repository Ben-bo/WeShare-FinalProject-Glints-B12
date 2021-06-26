const { Patient: patientModels } = require("../models");

const patientController = {};

patientController.createPatient = async (req, res) => {
  try {
    const patients = await patientModels.create({
      ...req.body
    });
    const patientsResult = {
      statusCode: 200,
      statusText: "Success",
      message: "Patient has been create",
      data: patients
    };
    res.json(patientsResult);
    
  } catch (err) {
    res.status(500).json({
    statusText: "Internal Server Error",
    message: err.message,
    });
  }
};

module.exports = patientController;