const { Donature } = require("../models");

const routes = {};

routes.createDonature = async (req, res) => {
  try {
    const donature = await Donature.create({
      ...req.body,
    });
    const donatureResult = {
      statusCode: 200,
      statusText: "Success",
      message: "Donature has been create",
      data: donature,
    };
    res.json(donatureResult);
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

module.exports = routes;
