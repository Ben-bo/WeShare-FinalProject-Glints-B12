//==Import Models===================================================================================================================
const { Payment } = require("../models");

//==ORM===================================================================================================================
const sequelize = require("sequelize");

//==Middleware===================================================================================================================
const { cloudinary } = require("../config/cloudinary");

//==Method===================================================================================================================
const method = {};

//==Create Payment===================================================================================================================
method.createPayment = async (req, res) => {
  try {
    const errorCek = req.error;
    if (errorCek) {
      res.status(500).send({ status: 500, message: errorCek });
    } else {
      // Upload image to cloudinary
      const fileStr = req.file.path;
      const uploadRes = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "dev_setup",
      });

      const data = await Payment.create({
        donatureId: req.body.donatureId,
        paymentMethod: req.body.paymentMethod,
        description: req.body.description,
        paymentReceipt: uploadRes.secure_url,
        cloudinary_id: uploadRes.public_id,
      });

      res.status(200).json({
        statusText: "Payment Receipt has uploaded",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

//==Delete===================================================================================================================

//==Export method===================================================================================================================
module.exports = method;
