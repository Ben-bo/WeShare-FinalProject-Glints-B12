const { cloudinary } = require("../config/cloudinary");
const { User } = require("../models");
routes = {};

routes.imageUpload = async (req, res, next) => {
  try {
    const fileStr = req.file.path;
    const { id: userId } = req.params;
    const getUser = await User.findOne({
      where: { id: userId },
    });
    const { cloudinaryId } = getUser;
    if (cloudinaryId) {
      await cloudinary.uploader.destroy(cloudinaryId, (err, result) => {
        console.log(result);
      });
      return next();
    }
    //next to update user on userControllers
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "something wrong on uploadImage in Helper" });
  }
};

module.exports = routes;
