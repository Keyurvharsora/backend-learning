const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user.model");

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    message: "User created successfully",
    data: user,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    message: "Users Fetched Successfully",
    data: users,
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    message: "User Fetched Successfully",
    data: user,
  });
});

exports.updateUserById = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // return updated document
    runValidators: true, // run schema validation
  });

  res.status(200).json({
    message: "User Fetched Successfully",
    data: updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "User Deleted Successfully",
    data: deletedUser,
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;

  const total = await User.countDocuments(features.query.getQuery());

  res.status(200).json({
    success: true,
    results: users.length,
    total,
    data: users,
  });
});
