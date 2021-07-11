const {
  OpenDonation: openDonationModel,
  Category: categoryModel,
  DonationType: donationTypeModel,
  Donature: donatureModel,
  OpenDonationDetails: openDonationDetailsModel,
  Information: informationModel,
} = require("../models");
const { cloudinary } = require("../config/cloudinary");
// const path = require("path");
const donationController = {};
donationController.create = async (req, res) => {
  try {
    const errorCek = req.error;
    if (errorCek) {
      res.status(500).send({ status: 500, message: errorCek });
    } else {
      let status = 200;
      let message = "OK";
      const fileStr = req.file.path;
      const uploadRes = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "dev_setup",
      });
      const data = {
        donationName: req.body.donationName,
        image: uploadRes.secure_url,
        description: req.body.description,
        donationNeeded: req.body.donationNeeded,
        isUrgent: req.body.isUrgent,
        expiredDate: req.body.expiredDate,
        categoryId: req.body.categoryId,
        userId: req.body.userId,
      };
      const result = await openDonationModel.create(data);
      if (result) {
        let donationTypeId = req.body.donationTypeId;
        donationTypeId = donationTypeId.trim();
        donationTypeId = donationTypeId.split(",");
        for (let i = 0; i < donationTypeId.length; i++) {
          await openDonationDetailsModel.create({
            openDonationId: result.dataValues.id,
            donationTypeId: donationTypeId[i],
          });
        }
      }

      res.status(status).send({
        status: status,
        message: message,
      });
    }
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
    const dataDonation = await openDonationModel.findAll(
      {
        include: [
          { model: categoryModel },
          {
            model: openDonationDetailsModel,
            attributes: ["id"],
            include: [donationTypeModel],
          },
        ],
      },
      {
        where: {
          userId,
        },
      }
    );
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
    const openDonationId = req.params.id;
    const dataDonation = await openDonationModel.findOne({
      include: [
        { model: categoryModel },
        {
          model: openDonationDetailsModel,
          attributes: ["id"],
          include: [donationTypeModel],
        },
        {
          model: donatureModel,
          attributes: ["id"],
          include: [{ model: informationModel, include: [donationTypeModel] }],
        },
      ],
      where: { id: openDonationId },
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
donationController.getAll = async (req, res) => {
  try {
    let status = 200;
    let message = "OK";
    const dataDonation = await openDonationModel.findAll({
      include: [
        { model: categoryModel },
        {
          model: openDonationDetailsModel,
          attributes: ["id"],
          include: [donationTypeModel],
        },
      ],
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
