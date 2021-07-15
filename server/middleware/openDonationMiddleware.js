const Joi = require("joi");
const uploadImg = require("../controllers/multer");
exports.donationValidate = async (req, res, next) => {
  try {
    const img = req.file;
    if (!img) {
      res.status(500).send({
        status: 500,
        message: "Image Cannot be Empty",
      });
    }
    const body = {
      donationName: req.body.donationName,
      description: req.body.description,
      categoryId: req.body.categoryId,
      donationTypeId: req.body.donationTypeId,
      donationNeeded: req.body.donationNeeded,
    };
    const schema = Joi.object({
      donationName: Joi.string().required(),
      description: Joi.string().required(),
      categoryId: Joi.number().required(),
      donationTypeId: Joi.string().required(),
      donationNeeded: Joi.string().required(),
    }).options({ abortEarly: false });
    const validate = await schema.validate(body);

    if (validate.error) {
      req.error = validate.error.message;
      next();
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "validation failed",
      data: error,
    });
  }
};
exports.donationValidateUpdate = async (req, res, next) => {
  try {
    const img = req.file;
    if (!img) {
      req.img = "img kosong";
    }
    const body = {
      donationName: req.body.donationName,
      description: req.body.description,
      categoryId: req.body.categoryId,
      donationTypeId: req.body.donationTypeId,
      donationNeeded: req.body.donationNeeded,
    };
    const schema = Joi.object({
      donationName: Joi.string().required(),
      description: Joi.string().required(),
      categoryId: Joi.number().required(),
      donationTypeId: Joi.string().required(),
      donationNeeded: Joi.string().required(),
    }).options({ abortEarly: false });
    const validate = await schema.validate(body);

    if (validate.error) {
      req.error = validate.error.message;
      next();
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "validation failed",
      data: error,
    });
  }
};
exports.uploadImg = async (req, res, next) => {
  let upload = uploadImg.single("image");
  upload(req, res, function (err) {
    if (err) {
      res.status(500).send({
        statusText: "Bad Request",
        error: err.message,
        suggestion: "Min file size is 500kb",
      });
    }
    next();
  });
};

exports.uploadImgArr = async (req, res, next) => {
  let upload = uploadImg.array("image", "ktpPicture");
  upload(req, res, function (err) {
    if (err) {
      res.status(500).send({
        statusText: "Bad Request",
        error: err.message,
        suggestion: "Min file size is 500kb",
      });
    }
    next();
  });
};
