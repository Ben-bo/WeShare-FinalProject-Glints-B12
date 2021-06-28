//AUTHENTICATION
const jwt = require("jsonwebtoken"); //import jwt
const { User } = require("../models"); // Import user model
routes = {};

//===================== GET TOKEN LOGIN ========================
//authentication
routes.getTokenLogin = async (req, res) => {
  try {
    //req email from body
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email } });

    const token = jwt.sign(
      {
        userId: user.dataValues.id,
        email: user.dataValues.email,
      },
      process.env.SECRET_KEY
    );

    //if sign up success
    const userResult = {
      statusCode: 200,
      statusText: "Success",
      message: "Login Success!",
      userToken: {
        token: token,
        detailUser: user.dataValues,
      },
    };

    res.json(userResult);
    //if sign up error
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err,
    });
  }
};

routes.checkUser = async (req, res, next) => {
  try {
    const findUserId = req.body.userId;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded.userId == findUserId) {
      return next();
    } else {
      res.status(401).json({
        statusText: "Unauthorized",
        message: "Sorry you are not recognized for doing this request, please register before doing this action!",
      });
    }
  } catch (err) {
    // If error it will make status code 500 (Internal Server Error) and send the error message
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};
module.exports = routes;
