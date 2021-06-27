const { User, Donature, Patient } = require("../models");
const openDonation = require("../models/openDonation");
const method = {};

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
