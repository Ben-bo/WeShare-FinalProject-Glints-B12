const { Donature, Information } = require("../models");

const sequelize = require("sequelize");
const method = {};

// Create All Donation, "when someone donation"
method.createDonature = async (req, res) => {
  try {
    const pivot = await Donature.create({
      userId: req.user,
      openDonationId: req.body.openDonationId,
    });

    const donature = await Information.create({
      amount: req.body.amount,
      unAmount: req.body.unAmount,
      notes: req.body.notes,
      isAnonymous: req.body.isAnonymous,
      donationTypeId: req.body.donationTypeId,
      isSelect: req.body.isSelect,
      donatureId: pivot.id,
    });

    res.status(200).json({
      statusText: "Donate Success",
      data: donature,
    });
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

// Get All Donature
method.getAllDonature = async (req, res) => {
  try {
    const result = await Donature.findAll({
      include: { model: Information },
    });
    res.status(200).json({
      message: "this is List of Donature",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//GET Donature by Id
method.getDonatureById = async (req, res) => {
  try {
    const result = await Donature.findAll({
      where: { id: req.params.id },
      include: { model: Information },
    });
    res.status(200).json({
      message: `this is List of Donature with id : ${req.params.id}`,
      result: { result },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET My Donation
method.getMyDonation = async (req, res) => {
  try {
    const { UserId, Type } = req.query;
    const result = await Donature.findAll({
      where: {
        userId: UserId,
      },
      // attributes: ["quantity"],
      include: {
        model: Information,
        where: { donationTypeId: Type },
      },
    });

    res.status(200).json({
      message: "Donasi saya",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = method;
