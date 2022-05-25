const multer = require("multer");

exports.uploadFile = function () {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  // checking file image types
  const fileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|PNG|png|gif|GIF|mp3)$/)) {
      req.fileValidationError = {
        message: "only image or music files are allowed",
      };
      return cb(new Error("Only image or music files are allowed"));
    }
    cb(null, true);
  };

  // file size

  const sizeInMb = 10;
  const maxSize = sizeInMb * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attache", maxCount: 1 },
  ]);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }
      if (!req.files && !err) {
        return res.status(400).send({
          message: "Please select files to upload",
        });
      }

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file size 10MB",
          });
        }
        return res.status(400).send(err);
      }
      return next();
    });
  };
};
