//==Import Models===================================================================================================================
const { Payment, Donature, User } = require("../models");

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
        upload_preset: "payment_receipt",
      });

      const user = await User.findOne({
        where: { email: req.body.email },
      });

      const donature = await Donature.findOne({
        where: { userId: user.id },
      });

      let data = await Payment.create({
        donatureId: donature.id,
        description: req.body.description,
        paymentReceipt: uploadRes.secure_url,
        cloudinary_id: uploadRes.public_id,
      });

      res.status(200).json({
        statusText: "Payment Receipt has uploaded",
        data: donature,
      });
    }
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

//==Get All Payment===================================================================================================================
method.getPayment = async (req, res) => {
  try {
    const errorCek = req.error;
    if (errorCek) {
      res.status(500).send({ status: 500, message: errorCek });
    } else {
      // Upload image to cloudinary
      let result = await Payment.findAll();
      res.status(200).json({
        message: "this is List of Payment",
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

//==Update Payment===================================================================================================================
method.updatePayment = async (req, res) => {
  try {
    let payment = await Payment.findOne({ where: { id: req.params.id } });

    await cloudinary.uploader.destroy(payment.cloudinary_id);
    const fileStr = req.file.path;
    const result = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "payment_receipt",
    });

    let data = {
      donatureId: req.body.donatureId || payment.donatureId,
      paymentMethod: req.body.paymentMethod || payment.paymentMethod,
      description: req.body.description || payment.description,
      paymentReceipt: result.secure_url || payment.paymentReceipt,
      cloudinary_id: result.public_id || payment.cloudinary_id,
    };
    await Payment.update(data, {
      where: { id: req.params.id },
    });

    res.status(200).json({
      message: "Update has been successful",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

//==Delete Payment===================================================================================================================
method.deletePayment = async (req, res) => {
  try {
    let payment = await Payment.findOne({ where: { id: req.params.id } });

    await cloudinary.uploader.destroy(payment.cloudinary_id);

    await Payment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      Data: payment,
      statusText: "The data above has been deleted",
    });
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

//==Export method===================================================================================================================
module.exports = method;
