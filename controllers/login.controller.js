const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_JWT_SECRET,
    { expiresIn: process.env.REFRESH_EXPIRES_IN },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({
    status: "success",
    token: accessToken,
  });
};
