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
    let status = 200;
    let message = "OK";
    const userId = req.body.userId;
    const dataDonation = await openDonationModel.findAll({
      where: {
        userId,
      },
    });
    res.status(status).send({
      status: status,
      message: message,
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
donationController.getAllById = async (req, res) => {
  try {
    let status = 200;
    let message = "OK";
    const openDonationId = req.params.openDonationId;
    const dataDonation = await openDonationModel.findOne({
      where: {
        id: openDonationId,
      },
    });
    res.status(status).send({
      status: status,
      message: message,
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
donationController.delete = async (req, res) => {
  try {
    let status = 200;
    let message = "OK";
    const openDonationId = req.params.openDonationId;
    const userId = req.body.userId;
    const dataOpenDonationById = await openDonationModel.findOne({
      where: { id: openDonationId },
    });
    if (userId === dataOpenDonationById.userId) {
      const dataDonation = await openDonationModel.destroy({
        where: {
          id: openDonationId,
        },
      });
      const dataOpenDonation = await openDonationModel.findAll({
        where: { id: openDonationId },
      });
      res.status(status).send({
        status: status,
        message: message,
        rowEffected: dataDonation,
        data: dataOpenDonation,
      });
    } else {
      status = 500;
      message = "failed delete, you are not the owner of this data";
      res.status(status).send({
        status: status,
        message: message,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Failed to delete",
      erorr: error,
    });
  }
};
donationController.update = async (req, res) => {
  try {
    let status = 200;
    let message = "OK";
    const openDonationId = req.params.openDonationId;
    const userId = req.body.userId;
    const dataOpenDonationById = await openDonationModel.findOne({
      where: { id: openDonationId },
    });
    if (userId === dataOpenDonationById.userId) {
      const update = await openDonationModel.update(
        { ...req.body },
        { where: { id: openDonationId } }
      );
      const dataOpenDonation = await openDonationModel.findAll({
        where: { id: openDonationId },
      });
      res.status(status).send({
        status,
        message,
        totalRowChanged: update,
        data: dataOpenDonation,
      });
    } else {
      status = 500;
      message = "failed Update, you are not the owner of this data";
      res.status(status).send({
        status: status,
        message: message,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "failed Update",
    });
  }
};

module.exports = donationController;
