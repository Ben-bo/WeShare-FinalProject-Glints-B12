const { User, Donature, Patient } = require("../models");
const openDonation = require("../models/openDonation");
const method = {};

// Create All Donation, "when someone donation"
method.createDonature = async (req, res) => {
  try {
    const result = await Donature.create({ ...req.body });
    res.status(200).json({
      message: "Donation Successfull",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Donation
method.getAllDonature = async (req, res) => {
  try {
    const result = await User.findAll({
      include: { model: Donature },
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

//GET Donatur by Id
method.getDonatureById = async (req, res) => {
  try {
    const result = await Donature.findAll({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: `this is List of Donature with id : ${req.params.id}`,
      data: result,
    });
  } catch (err) {
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
        donationTypeId: Type,
      },
      attributes: ["quantity"],
      include: {
        model: Patient,
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
