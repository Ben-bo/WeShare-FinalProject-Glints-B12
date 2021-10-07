const { User } = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const nodemailer = require("nodemailer");
const log = console.log;
const { cloudinary } = require("../config/cloudinary");

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
      return res.status(208).json({
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

      //mailSections
      const output = `
    <p>Hello ${userEmail} Welcome to <a href="#">WeShare Family.</a>, You have a new account request</p>
    <h3>Account Details</h3>
    <ul>  
      <li>Email: ${userEmail}</li>
      <li>Password: ${reqBoPass}</li>
    </ul>

    <b><p>Best Regards,</p>
    <p>WeShare Team</p></b>
    <br>

    <p>You received this email because you are request a new account in WeShare App.</p>
    <p>Indonesia,</p>
    <p>Copyright@WeShare2021</p>
   <br>

    <b><p>this is an automated email, please don't reply to this email!</p></b>`;
      // transporter
      let transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL || "teamweshare4@gmail.com", // TODO: your gmail account
          pass: process.env.PASSWORD || "Weshare99", // TODO: your gmail password
        },
      });

      // mailOption
      let mailOptions = {
        from: "teamweshare4@gmail.com", // TODO: email sender
        to: userEmail, // TODO: email receiver
        subject: "WeShare Team - Registration Completed!",
        text: `Welcome to WeShare ${userEmail}, this is your terms details for Login!`,
        html: output,
      };

      //Confirm sendMail
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          return log("Error sending email notification....!");
        }
        log(`Email has been send Successfully to : ${userEmail}`);
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
    const userEmail = req.body.email;
    const newDate = new Date();
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

    //mailSections
    const output = `
    <p>Hello ${userEmail}, We Noticed a New Login</p>
    <h3>Login Details</h3>
    <ul>  
      <li>Email: ${userEmail}</li>
      <li>Date: ${newDate}</li>
      
    </ul>

    <p>If this was you, you can safely disregard this email. If this wasn't you, you can <a href="#">changed your password here.</a></p>
   <br>

    <b><p>Best Regards,</p>
    <p>WeShare Team</p></b>
    <br>

    <b><p>this is an automated email, please don't reply to this email!</p></b>`;
    // transporter
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL || "teamweshare4@gmail.com", // TODO: your gmail account
        pass: process.env.PASSWORD || "Weshare99", // TODO: your gmail password
      },
    });

    // mailOption
    let mailOptions = {
      from: "teamweshare4@gmail.com", // TODO: email sender
      to: userEmail, // TODO: email receiver
      subject: "WeShare Team - New Login Detected!",
      text: `Welcome to WeShare ${userEmail}, New Login detected!`,
      html: output,
    };

    //Confirm sendMail
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        return log("Error sending email notification....!");
      }
      log(`Email has been send Successfully to : ${userEmail}`);
    });

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
    const idParPut = req.params.id;
    // const fileStr = req.file.path;

    const findUser = await User.findOne({ where: { id: idParPut } });

    if (findUser) {
      const uploadRes = async (path) =>
        await cloudinary.uploader.upload(path, {
          upload_preset: "dev_setup",
        });

      // if (req.method === "PUT") {
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploadRes(path);
        urls.push(newPath);
        // fs.unlinkSync(path);
        await User.update(
          { ...req.body, image: newPath.url, cloudinaryId: newPath.public_id },
          {
            where: {
              id: idParPut,
            },
          }
        );
        res.status(200).json({
          statusText: "Updated",
          message: `User with ID: ${idParPut} has been updated!`,
          data: urls,
        });
        console.log(urls);
      }
      // } else {
      //   res.status(500).json({
      //     statusText: "Internal server error",
      //     message: "Methode don't support",
      //   });
      // }
    } else {
      res.status(404).json({
        statusText: "Not Found",
        message: `User with ID: ${idParPut} not found, please try again`,
      });
    }
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: `Sorry, we failed to update your profile`,
      Error: err.message,
    });
    console.log(err);
  }
};

//============================================================

routes.verifyAccount = async (req, res) => {
  try {
    const idParPut = req.params.id;
    // const fileStr = req.file.path;
    const findUser = await User.findOne({ where: { id: idParPut } });

    if (findUser) {
      const uploadRes = async (path) =>
        await cloudinary.uploader.upload(path, {
          upload_preset: "dev_setup",
        });

      if (req.method === "PUT") {
        const urls = [];
        const files = req.files;
        for (const file of files) {
          const { path } = file;
          const newPath = await uploadRes(path);
          urls.push(newPath);
          // fs.unlinkSync(path);

          // const ktp = req.files.ktpPicture;
          // ktp = image;
          await User.update(
            { ...req.body, ktpPicture: newPath.url, cloudinaryKtpId: newPath.public_id },
            {
              where: {
                id: idParPut,
              },
            }
          );
          res.status(200).json({
            statusText: "Updated",
            message: `User with ID: ${idParPut} has been Verify!`,
            data: urls,
          });
          console.log(urls);
        }
      } else {
        res.status(500).json({
          statusText: "Internal server error",
          message: "Methode don't support",
        });
      }
    } else {
      res.status(404).json({
        statusText: "Not Found",
        message: `User with ID: ${idParPut} not found, please try again`,
      });
    }
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: `Sorry, we failed to update your profile`,
      Error: err.message,
    });
    console.log(err);
  }
};

//============================Forgot Password=======================================
routes.forgetPassword = async (req, res) => {
  try {
    const reqBoPass = req.body.password;
    // const idParPut = req.params.id;
    const userEmail = req.body.email;
    const confirmPass = req.body.confirmPassword;
    const newDate = new Date();

    const findUser = await User.findOne({ where: { email: userEmail } });

    if (reqBoPass !== confirmPass || confirmPass == null) {
      return res.status(409).json({
        statusText: "Conflict",
        messsage: "Password didn't match, please try again!",
      });
    } else {
      if (findUser) {
        await User.update(
          { password: bcrypt.hashSync(reqBoPass, 10), confirmPassword: bcrypt.hashSync(reqBoPass, 10) },
          {
            where: {
              email: userEmail,
            },
          }
        );
        //mailSections
        const output = `
      <p>Hello, ${userEmail}</p>
      <p>The password for your WeShare account on <a href="#">https://WeShare.com</a> has successfully been changed.</p>
      <h3>Account Details</h3>
      <ul>  
        <li>Email: ${userEmail}</li>
        <li>Password: ${reqBoPass}</li>
      </ul>
      <h3>Password has been changed on</h3>
      <ul>
        <li>Date : ${newDate} </li>
      </ul>
      <br>
      <p>If you did not initiate this change, please contact your administrator immediately.<p>
      <b><p>Best Regards,</p>
      <p>WeShare Team</p></b>
      <br>
  
      <b><p>this is an automated email, please don't reply to this email!</p></b>`;
        // transporter
        let transporter = await nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.MAIL || "teamweshare4@gmail.com", // TODO: your gmail account
            pass: process.env.PASSWORD || "Weshare99", // TODO: your gmail password
          },
        });

        // mailOption
        let mailOptions = {
          from: "teamweshare4@gmail.com", // TODO: email sender
          to: userEmail, // TODO: email receiver
          subject: "WeShare Team - Changed Password Request!",
          text: `Welcome to WeShare ${userEmail}, Changed Password Request!`,
          html: output,
        };

        //Confirm sendMail
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            return log("Error sending email notification....!");
          }
          log(`Email has been send Successfully to : ${userEmail}`);
        });
        res.status(200).json({
          statusText: "Updated",
          message: `Password User with Email: ${userEmail} has been Changed Successfully!`,
        });
      } else {
        return res.status(404).json({
          statusText: "Not Found",
          message: `User with email : ${userEmail} not found.`,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: `Sorry, we failed to changed your password`,
      Error: err.message,
    });
  }
};
//===============================Get User By Id======================================
routes.getUserById = async (req, res) => {
  try {
    const byId = req.params.id;
    const users = await User.findOne({ where: { id: byId } });
    if (users) {
      res.status(200).json({
        statusText: "Success",
        message: `Successfully get user with Id : ${byId}`,
        userDetails: users,
      });
    } else {
      res.status(404).json(`This member with ID: ${byId} not found`);
    }
  } catch (err) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: `Sorry, we failed to find your requested ID`,
      Error: err,
    });
  }
};

module.exports = routes;
