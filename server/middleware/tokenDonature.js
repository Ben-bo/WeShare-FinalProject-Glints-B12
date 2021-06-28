const jwt = require("jsonwebtoken");
const Joi = require("joi");
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
    req.user = dataUser.id;
    next();
  } catch (error) {
    console.log(error);
    res.send({
      error,
    });
  }
};
