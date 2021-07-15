const {
  OpenDonation: openDonationModel,
  Category: categoryModel,
  DonationType: donationTypeModel,
  Donature: donatureModel,
  OpenDonationDetails: openDonationDetailsModel,
  Information: informationModel,
  User: userModel,
} = require("../models");
const { cloudinary } = require("../config/cloudinary");

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
        cloudinaryId: uploadRes.public_id,
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
    // const dataDonation = await openDonationModel.findOne({
    //   include: [{ model: categoryModel }, donationTypeModel],
    //   where: { id: openDonationId },
    // });

    //repair by Budi Hartono
    const dataDonation = await openDonationModel.findOne({
      include: [categoryModel, { model: donationTypeModel, include: [informationModel] }, { model: donatureModel, include: [userModel, informationModel] }],
      where: { id: openDonationId },
    });
    if (!dataDonation) {
      res.status(404).send({
        status: "Not Found or Invalid Id",
        suggestion: "Please cek id openDonation on parameter",
      });
    }
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
      erorr: error.message,
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
        {
          model: donatureModel,
          attributes: ["id"],
          include: [{ model: informationModel, include: [donationTypeModel] }],
        },
      ],
      order: [["createdAt", "DESC"]],
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
    if (!dataOpenDonationById) {
      res.status(404).send({
        status: "Not Found or Invalid Id",
        message: "cannot found id on database",
        suggestion: "Please cek id openDonation on parameter",
      });
    }
    if (userId === dataOpenDonationById.userId) {
      const dataDonation = await openDonationModel.destroy({
        where: {
          id: openDonationId,
        },
      });
      if (dataDonation) {
        await cloudinary.uploader.destroy(dataOpenDonationById.cloudinaryId);
      }
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
    const errorCek = req.error;
    if (errorCek) {
      res.status(500).send({ status: 500, message: errorCek });
    } else {
      const pesanImg = req.img;
      if (!pesanImg) {
        const fileStr = req.file.path;
        const uploadRes = await cloudinary.uploader.upload(fileStr, {
          upload_preset: "dev_setup",
        });
        let status = 200;
        let message = "OK";
        const openDonationId = req.params.openDonationId;
        const userId = req.body.userId;
        console.log(userId);
        const data = {
          donationName: req.body.donationName,
          image: uploadRes.secure_url,
          description: req.body.description,
          cloudinaryId: uploadRes.public_id,
          donationNeeded: req.body.donationNeeded,
          isUrgent: req.body.isUrgent,
          expiredDate: req.body.expiredDate,
          categoryId: req.body.categoryId,
          userId: userId,
        };
        const dataOpenDonationById = await openDonationModel.findOne({
          where: { id: openDonationId },
        });
        if (!dataOpenDonationById) {
          res.status(404).send({
            status: "Not Found or Invalid Id",
            message: "cannot found id on database",
            suggestion: "Please cek id openDonation on parameter",
          });
        }
        if (userId === dataOpenDonationById.userId) {
          await cloudinary.uploader.destroy(dataOpenDonationById.cloudinaryId);
          const update = await openDonationModel.update(data, {
            where: { id: openDonationId },
          });
          const delType = await openDonationDetailsModel.destroy({
            where: { openDonationId },
          });
          if (delType) {
            let donationTypeId = req.body.donationTypeId;
            donationTypeId = donationTypeId.trim();
            donationTypeId = donationTypeId.split(",");
            for (let i = 0; i < donationTypeId.length; i++) {
              await openDonationDetailsModel.create({
                openDonationId,
                donationTypeId: donationTypeId[i],
              });
            }
          }
          const dataOpenDonation = await openDonationModel.findOne(
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
              where: { id: openDonationId },
            }
          );
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
      } else {
        let status = 200;
        let message = "OK";
        const openDonationId = req.params.openDonationId;
        const userId = req.body.userId;
        console.log(userId);
        const data = {
          donationName: req.body.donationName,
          description: req.body.description,
          donationNeeded: req.body.donationNeeded,
          isUrgent: req.body.isUrgent,
          expiredDate: req.body.expiredDate,
          categoryId: req.body.categoryId,
          userId: userId,
        };
        const dataOpenDonationById = await openDonationModel.findOne({
          where: { id: openDonationId },
        });
        if (!dataOpenDonationById) {
          res.status(404).send({
            status: "Not Found or Invalid Id",
            message: "cannot found id on database",
            suggestion: "Please cek id openDonation on parameter",
          });
        }
        if (userId === dataOpenDonationById.userId) {
          const update = await openDonationModel.update(data, {
            where: { id: openDonationId },
          });
          const delType = await openDonationDetailsModel.destroy({
            where: { openDonationId },
          });
          if (delType) {
            let donationTypeId = req.body.donationTypeId;
            donationTypeId = donationTypeId.trim();
            donationTypeId = donationTypeId.split(",");
            for (let i = 0; i < donationTypeId.length; i++) {
              await openDonationDetailsModel.create({
                openDonationId,
                donationTypeId: donationTypeId[i],
              });
            }
          }
          const dataOpenDonation = await openDonationModel.findOne(
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
              where: { id: openDonationId },
            }
          );
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
      }
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
