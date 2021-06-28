const { DonationType } = require("../models");

const routes = {};

routes.createDonationType = async (req, res) => {
  try {
    const donationType = await DonationType.create({
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

module.exports = routes;