const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.uploadFile = catchAsync(async (req, res) => {
  if (!req.file) {
    res.status(400).json({
      message: "Please upload the file first",
    });
  }

  res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    file: req.file,
  });
});
