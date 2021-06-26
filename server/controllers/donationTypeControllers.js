const { DonationType: donationTypeModels } = require("../models");

const donationTypeController = {};

donationTypeController.createDonationType = async (req, res) => {
  try {
    const donationType = await donationTypeModels.create({
      ...req.body
    });
    const donationTypeResult = {
      statusCode: 200,
      statusText: "Success",
      message: "donation has been create",
      data: donationType
    };
    res.json(donationTypeResult);
    
  } catch (err) {
    res.status(500).json({
    statusText: "Internal Server Error",
    message: err.message,
    });
  }
};

module.exports = donationTypeController;