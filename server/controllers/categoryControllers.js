const { Category, DonationType, OpenDonation, Donature, OpenDonationDetails, Information } = require("../models");

const Sequelize = require('sequelize');
const Op = Sequelize.Op

const routes = {};

/**
 * Get all category include Open Donation
 */
routes.getAllCategoryIncludePatient = async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [{ model: OpenDonation, include: [{model:OpenDonationDetails,include: [DonationType]}]}],
    });
    const categoryResult = {
      statusCode: 200,
      statusText: "Show all categories include Open Donation",
      data: category,
    };
    res.json(categoryResult);
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

/**
 * Get all OpenDonation isUrgent true
 */
routes.getAllDonationUrgent = async (req, res) => {
  try {
    const donation = await OpenDonation.findAll({
      include: [{model:OpenDonationDetails,include: [DonationType]}],
      where: { isUrgent: {[Op.not]: false} },
    });
    const donationResult = {
      statusCode: 200,
      statusText: "Show all Open Donation urgently need help",
      data: donation,
    };
    res.json(donationResult);
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

/**
 * Get all openDonation filter by createdAt
 */
routes.getAllNewestDonation = async (req, res) => {
  try {
    const donation = await OpenDonation.findAll({
      include: [{model:OpenDonationDetails,include: [DonationType]}],
      order: [["createdAt", "DESC"]]
    });
    const donationResult = {
      statusCode: 200,
      statusText: "Show all Newest Open Donation",
      data: donation,
    };
    res.json(donationResult);
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

/**
 * Get category by id and donationType id include openDonation
 */
routes.getCategoryByIdIncludePatient = async (req, res) => {
  try {
    const { categoryId = [] } = req.body;
    const category = await Category.findAll({
      // include: [{ model: OpenDonation,include:[{model:Donature, include :[Information]}],include : [{model: DonationType}]}],
      include: [{ model: OpenDonation,include:[{model : DonationType}]}],
    
     where: { id: { [Op.in]: categoryId } }
    });
    
    if (category) {
      const categoryResult = {
        statusCode: 200,
        statusText: "Success",
        message: "Show donation by id categories",
        data: category,
      };
      res.json(categoryResult);
    } else {
      res.status(500).json("Data not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

/**
 * Get category by id include donationType, patients and donature
 */
routes.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findAll({
      include: [{ model: OpenDonation, include: [{model:OpenDonationDetails,include: [DonationType]}]}],
      where: { id: categoryId },
    });
    if (category) {
      const categoryResult = {
        statusCode: 200,
        statusText: "Success",
        message: "Show donation by id categories",
        data: category,
      };
      res.json(categoryResult);
    } else {
      res.status(500).json("Data not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

/**
 * Create categories
 */
routes.createCategory = async (req, res) => {
  try {
    const createCategory = await Category.create({
      ...req.body,
    });
    const categoryResult = {
      statusCode: 200,
      statusText: "Success",
      message: "Category has been create",
      data: createCategory,
    };
    res.json(categoryResult);
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

/**
 * edit category by id
 */
routes.editCategory = async (req, res) => {
  try {
    const categoryId = req.body.id;
    const getCategoryDetails = await Category.update(req.body, {
      where: {
        id: categoryId,
      },
    });
    const categoryResult = {
      statusCode: 200,
      statusText: "Success",
      message: "Category has been Update",
      data: getCategoryDetails,
    };
    res.json(categoryResult);
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

module.exports = routes;
