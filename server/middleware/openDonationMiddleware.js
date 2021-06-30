const Joi = require("joi");
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
    console.log(req.file);
    const schema = Joi.object({
      donationName: Joi.string().required(),
      description: Joi.string().required(),
      categoryId: Joi.number().required(),
      donationTypeId: Joi.number().required(),
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
