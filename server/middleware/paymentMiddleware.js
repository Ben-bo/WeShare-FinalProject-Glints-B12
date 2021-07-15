const uploadImg = require("../controllers/multer");
routes = {};

exports.uploadImg = async (req, res, next) => {
  let upload = uploadImg.single("paymentReceipt");
  upload(req, res, function (err) {
    if (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        res.status(500).send({
          statusText: "Internal Server Error",
          error: err.message,
          suggestion: "Max file size is 500kb",
        });
      }
      res.status(415).send({
        error: err.message,
        suggestion: "please provide image with .jpg, .jpeg or .png extension",
      });
    }
    next();
  });
};
