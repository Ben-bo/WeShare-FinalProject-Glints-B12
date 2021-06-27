const Joi = require("joi");
exports.donationValidate = async (req, res, next) => {
  try {
    const schema = Joi.object({
      donationName: Joi.string().required(),
      image: Joi.string().required(),
      description: Joi.string().required(),
      categoryId: Joi.number().required(),
      donationTypeId: Joi.number().required(),
      donationNeeded: Joi.string().required(),
    }).options({ abortEarly: false });
    const body = {
      donationName: req.body.donationName,
      image: req.body.image,
      description: req.body.description,
      categoryId: req.body.categoryId,
      donationTypeId: req.body.donationTypeId,
      donationNeeded: req.body.donationNeeded,
    };
    const validate = await schema.validate(body);
    if (validate.error) {
      res.status(400).json({
        statusText: "Bad Request",
        message: validate.error.message,
      });
    }
    req.body.userId = req.user;
    next();
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "validation failed",
      data: error,
    });
  }
};
