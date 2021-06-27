const { Patient } = require("../models");

const routes = {};

routes.createPatient = async (req, res) => {
  try {
    const patients = await Patient.create({
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

module.exports = routes;