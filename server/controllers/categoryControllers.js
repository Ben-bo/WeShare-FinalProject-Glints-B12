const { Category, DonationType, OpenDonation, Donature, OpenDonationDetails, Information } = require("../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const routes = {};

/**
 * Get all category include Open Donation
 */
routes.getAllCategoryIncludeDonation = async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [{ model: OpenDonation, include:{model: DonationType, include : Information}}]
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
 * Get all Open donation Urgent
 */
routes.getAllDonationUrgent = async (req, res) => {
  try {
    const donation = await OpenDonation.findAll({
    where: { isUrgent: { [Op.not]: false} },
    include: [{
      model: Category, 
    },{
      model: OpenDonationDetails,
          include: [{ 
            model: DonationType, include : [Information],
          }],
    }],
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
 * Get Open donation by title
 */
routes.getDonationByTitle = async (req, res) => {
  try {
    let description = req.query.description;
    const donation = await OpenDonation.findAll({
      include: [{
        model: Category, 
      },{
        model: OpenDonationDetails,
            include: [{ 
              model: DonationType, include : [Information],
            }],
      }],
      where: { description: { [Op.iLike]: '%' + description + '%'}}
    });
    const donationResult = {
      statusCode: 200,
      statusText: "Show all Open Donation by title",
      data: donation, 
    };
    res.json(donationResult);
  }  catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

/**
 * Get all Open donation filter by createdAt
 */
routes.getAllNewestDonation = async (req, res) => {
  try {
    const donation = await OpenDonation.findAll({
      include: [{
        model: Category, 
      },{
        model: OpenDonationDetails,
            include: [{ 
              model: DonationType, include : [Information],
            }],
      }],
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
 * Get category by id and donationType id include Open donation
 */
routes.getCategoryIdAndDonationTypeId = async (req, res) => {
  try {
    const { categoryId = [], typeId = [] } = req.body;
    const category = await OpenDonation.findAll({
      where: { categoryId: { [Op.in]: categoryId } }, 
      include: [{
        model: Category, 
        attributes: [
          'id', 'categoryName'
        ],
        required: false
      },{
        model: OpenDonationDetails.scope(null),
            include: [{ 
              model: DonationType, include : [Information],
              where: { id: { [Op.in]: typeId } }, 
              attributes: ['typeName', 'icon','isActive'],
              required: false
            }],
        required: false,
      }]
    });
    const categoryResult = {
      statusCode: 200,
      statusText: "Success",
      message: "Show donation by id categories and id donationType",
      data: category,
    };
    res.json(categoryResult);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

/**
 * Get category by id include Open donation
 */
routes.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findOne({
      include: [{ model: OpenDonation, include:{model: DonationType, include : Information}}],
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
