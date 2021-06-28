const { User } = require("../models");
const bcrypt = require("bcrypt");

const routes = {};

//===============================REGISTER====================================
//register user
routes.register = async (req, res) => {
  const reqBoPass = req.body.password;
  const confirmPass = req.body.confirmPassword;
  const userEmail = req.body.email;
  try {
    const findEmail = await User.findOne({ where: { email: userEmail } });
    if (findEmail) {
      res.status(208).json({
        statusText: "Already Reported",
        messsage: "Email already exist on server, please login!",
      });
    } else {
      if (reqBoPass !== confirmPass) {
        return res.status(409).json({
          statusText: "Conflict",
          messsage: "Password didn't match, please try again!",
        });
      }
      const encryptUserPass = await User.create({
        ...req.body,
        password: bcrypt.hashSync(reqBoPass, 10),
        confirmPassword: bcrypt.hashSync(reqBoPass, 10),
      });
      req.user = encryptUserPass;
      const userResult = {
        statusCode: 200,
        statusText: "Success",
        message: "Register Success!",
        data: {
          userDetails: encryptUserPass,
        },
      };
      res.json(userResult);
    }
    //if sign up error
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

//===============================LOGIN===================================
//user login
routes.login = async (req, res, next) => {
  try {
    //getting email from body and compare with email on database
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email } });

    //if email doesn't exist
    if (!user) {
      return res.status(404).json({
        statusText: "Not Found",
        message: "Incorrect email, please check it and try again!",
      });
    }
    // verify the password
    const verifyPassword = await bcrypt.compare(req.body.password, user.password);
    // If password doesn't match
    if (!verifyPassword) {
      return res.status(401).json({
        statusText: "Unauthorized",
        message: "Wrong password, please check your password and try again!",
      });
    }
    //proceed to GET TOKEN LOGIN
    next();

    //if login Error
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err.message,
    });
  }
};

//===============================UPDATE USER===================================
//update User
routes.putUser = async (req, res) => {
  try {
    const reqBoPass = req.body.password;
    const idParPut = req.params.id;
    const confirmPass = req.body.confirmPassword;

    const findUser = await User.findOne({ where: { id: idParPut } });
    if (reqBoPass !== confirmPass || confirmPass == null) {
      return res.status(409).json({
        statusText: "Conflict",
        messsage: "Password didn't match, please try again!",
      });
    } else {
      if (findUser) {
        await User.update(
          { ...req.body, password: bcrypt.hashSync(reqBoPass, 10), confirmPassword: bcrypt.hashSync(reqBoPass, 10) },
          {
            where: {
              id: idParPut,
            },
          }
        );
        res.status(200).json({
          statusText: "Updated",
          message: `User with ID: ${idParPut} has been updated!`,
        });
      } else {
        res.status(404).json({
          statusText: "Not Found",
          message: `User with ID: ${idParPut} not found, please try again`,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: `Sorry, we failed to update your profile`,
      Error: err.message,
    });
  }
};

module.exports = routes;
