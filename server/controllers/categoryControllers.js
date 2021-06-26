const { Category: categoryModels, Patient: patientModels, DonationType: donationTypeModels, Donature: donatureModels } = require("../models");

const categoryController = {};

/**
 * Get all category include patient
 */
categoryController.getAllCategoryIncludePatient = async (req, res) => {
  try {
    const category = await categoryModels.findAll({
      include: [{ model: patientModels }]
    });
    const categoryResult = {
      statusCode: 200,
      statusText: "Show all categories include patients",
      data: category
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
 * Get category by id include patients
 */

categoryController.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryModels.findOne({
      where: { id: categoryId },
      //include: [{model: donationTypeModels, include: [patientModels] }]
      include: [{ model:patientModels }]
    });
    if(category) {
      const categoryResult = {
        statusCode: 200,
        statusText: "Success",
        message: "Show donation by id categories",
        data: category
      }
      res.json(categoryResult);
    }
    else {
      res.status(500).json('Data not found')
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
categoryController.createCategory = async(req, res) => {
  try {
    const createCategory = await categoryModels.create({
        ...req.body
    });
    const categoryResult = {
      statusCode: 200,
      statusText: "Success",
      message: "Category has been create",
      data: createCategory
    };
    res.json(categoryResult)

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
categoryController.editCategory = async (req, res) => {
  try {
    const categoryId  = req.body.id;
    const getCategoryDetails = await categoryModels.update(req.body,{
      where: {
        id: categoryId
      },
    });
    const categoryResult = {
      statusCode: 200,
      statusText: "Success",
      message: "Category has been Update",
      data: getCategoryDetails
    };
    res.json(categoryResult)

  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

module.exports = categoryController;