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
    if (err.code == "LIMIT_FILE_SIZE") {
      res.status(500).send({
        statusText: "Internal Server Error",
        error: err.message,
        suggestion: "Max file size is 500kb",
      });
    } else {
      res.status(415).send({
        error: err.message,
        suggestion: "please provide image with .jpg, .jpeg or .png extension",
      });
    }
    next();
  });
};
