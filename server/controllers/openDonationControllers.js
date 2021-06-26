const { OpenDonation: openDonationModel } = require("../models");
const donationController = {};
donationController.create = async (req, res) => {
  try {
    let status = 200;
    let message = "OK";
    const result = await openDonationModel.create({ ...req.body });
    res.status(status).send({
      status: status,
      message: message,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Failed Insert",
    });
  }
};
donationController.getAllByUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const dataDonation = await openDonationModel.findAll({
      where: {
        userId,
      },
    });
    res.status(200).send({
      status: 200,
      message: "OK",
      data: dataDonation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Failed to get Data Donation",
      erorr: error,
    });
  }
};

module.exports = donationController;
