const { Category, DonationType, Patient, Donature } = require("../models");

const routes = {};

/**
 * Get all category include patient
 */
routes.getAllCategoryIncludePatient = async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [{ model: Patient }]
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
 * Get category by id iclude patient
*/
routes.getCategoryByIdIncludePatient = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findAll({
      include : [{ model: Patient, include : [Donature]}],
      where: { id: categoryId }});
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
 * Get category by id include donationType, patients and donature
 */

routes.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findAll({
      include: [{ model:DonationType, include : [{ model: Patient, include : [Donature]}]}],
      where: { id: categoryId }});
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
routes.createCategory = async(req, res) => {
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
routes.editCategory = async (req, res) => {
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

module.exports = routes;