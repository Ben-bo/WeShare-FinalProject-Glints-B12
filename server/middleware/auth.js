//AUTHENTICATION
const jwt = require("jsonwebtoken"); //import jwt
const { User } = require("../models"); // Import user model
routes = {};

//===================== GET TOKEN REGISTER ========================
// routes.getTokenRegister = async (req, res) => {
//   try {
//     //req email from body
//     const { email } = req.body;
//     const user = await User.findOne({ where: { email: email } });

//     const token = jwt.sign(
//       {
//         userId: user.dataValues.id,
//         email: user.dataValues.email,
//       },
//       process.env.SECRET_KEY
//     );

//     //if sign up success
//     const userResult = {
//       statusCode: 200,
//       statusText: "Success",
//       message: "Register Success, please login!",
//       data: {
//         token: token,
//         data: user.dataValues,
//       },
//     };
//     res.json(userResult);
//     //if sign up error
//   } catch (err) {
//     res.status(500).json({
//       statusText: "Internal Server Error",
//       message: err.message,
//     });
//   }
// };

//===================== GET TOKEN LOGIN ========================
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

module.exports = routes;
