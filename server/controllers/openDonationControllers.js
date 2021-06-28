const { OpenDonation } = require("../models");

const routes = {};

routes.createOpenDonation = async (req, res) => {
  try {
    const openDonation = await OpenDonation.create({
      ...req.body,
    });
    const result = {
      statusCode: 200,
      statusText: "Success",
      message: "Open Donation has been create",
      data: openDonation,
    };
    res.json(result);
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

module.exports = routes;
