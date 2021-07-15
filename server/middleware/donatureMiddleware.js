const Joi = require("joi");
exports.donatureValidate = async (req, res, next) => {
  try {
    const schema = Joi.object({
      amount: Joi.number().required(),
      unAmount: Joi.string().valid(null, ""),
      notes: Joi.string(),
      isAnonymous: Joi.boolean().required(),
      donationTypeId: Joi.number().required(),
      donatureId: Joi.number().valid(null, ""),
    }).options({ abortEarly: false });

    const body = {
      amount: req.body.amount,
      unAmount: req.body.unAmount,
      notes: req.body.notes,
      isAnonymous: req.body.isAnonymous,
      donationTypeId: req.body.donationTypeId,
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

exports.tokenVerify = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const schemaAuth = Joi.object({
      authorization: Joi.string().required(),
    }).options({ abortEarly: false });
    const validateAuth = await schemaAuth.validate({ authorization: token });
    if (validateAuth.error) {
      res.status(400).json({
        statusText: "Bad Request",
        message: validateAuth.error.message,
      });
    }
    const dataUser = jwt.verify(token, process.env.SECRET_KEY);
    req.user = dataUser.userId;
    next();
  } catch (error) {
    console.log(error);
    res.send({
      error,
    });
  }
};
