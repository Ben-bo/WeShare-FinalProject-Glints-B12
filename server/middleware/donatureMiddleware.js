const Joi = require("joi");
exports.donationValidate = async (req, res, next) => {
  try {
    const schema = Joi.object({
      fullName: Joi.string().required(),
      quantity: Joi.string().required(),
      comment: Joi.string(),
      donationTypeId: Joi.number().required(),
      openDonationId: Joi.number().required(),
      userId: Joi.number().required(),
    }).options({ abortEarly: false });
    const body = {
      fullName: req.body.fullName,
      quantity: req.body.quantity,
      comment: req.body.comment,
      donationTypeId: req.body.donationTypeId,
      openDonationId: req.body.openDonationId,
      userId: req.user,
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
