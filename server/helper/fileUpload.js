const { cloudinary } = require("../config/cloudinary");
const { User } = require("../models");
routes = {};

routes.imageUpload = async (req, res, next) => {
  try {
    const idParPut = req.params.id;
    const { id: userId } = req.params;
    const getUser = await User.findOne({
      where: { id: userId },
    });
    if (getUser) {
      const { cloudinaryId } = getUser;
      if (cloudinaryId) {
        await cloudinary.uploader.destroy(cloudinaryId, (err, result) => {
          console.log(result);
        });
        return next();
      } else if (!cloudinaryId || cloudinaryId == null) {
        return next();
      }
    } else {
      res.status(404).json({
        statusText: "Not Found",
        message: `User with ID: ${idParPut} not found, please try again`,
      });
    }

    //next();
    //next to update user on userControllers
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message, statusText: "something wrong on uploadImage in Helper" });
  }
};

routes.filterImage = async (req, res, next) => {
  try {
    const idParPut = req.params.id;
    const { id: userId } = req.params;
    const getUser = await User.findOne({
      where: { id: userId },
    });
    if (getUser) {
      const { cloudinaryKtpId } = getUser;
      if (cloudinaryKtpId) {
        await cloudinary.uploader.destroy(cloudinaryKtpId, (err, result) => {
          console.log(result);
        });
        return next();
      } else if (!cloudinaryKtpId || cloudinaryKtpId == null) {
        return next();
      }
    } else {
      res.status(404).json({
        statusText: "Not Found",
        message: `User with ID: ${idParPut} not found, please try again`,
      });
    }

    //next();
    //next to update user on userControllers
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message, statusText: "something wrong on uploadImage in Helper" });
  }
};

module.exports = routes;
