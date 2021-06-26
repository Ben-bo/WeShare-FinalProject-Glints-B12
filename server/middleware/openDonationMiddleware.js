const Joi = require("joi");
exports.donationValidate = async (req, res, next) => {
  try {
    const schema = Joi.object({
      donationName: Joi.string().required(),
      description: Joi.string().required(),
      categoryId: Joi.number().required(),
      donationTypeId: Joi.number().required(),
      donationNeeded: Joi.string().required(),
      expiredDate: Joi.date().required(),
    }).options({ abortEarly: false });
    const validate = await schema.validate(req.body);
    if (validate.error) {
      res.status(400).json({
        statusText: "Bad Request",
        message: validate.error.message,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "invalid token",
      data: error,
    });
  }
};
