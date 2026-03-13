const express = require("express");
const router = express.Router();

const createUser = require("../controllers/user.controller").createUser;
const apiKeyMiddleware = require("../middlewares/apiKey.middleware");
const { protect } = require("../middlewares/authentication.middleware");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser,
  getUsers,
} = require("../controllers/user.controller");
const { signup } = require("../controllers/signup.controller");
const { login } = require("../controllers/login.controller");
const { refreshToken } = require("../controllers/refresh.controller");
const { validate } = require("../models/user.model");
const { z } = require("zod");
const { authorize } = require("../middlewares/authorization.middleware");

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

router.post("/signup", signup);

router.get("/login", login);

router.post("/", apiKeyMiddleware, createUser);

router.get("/users", protect, getAllUsers);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.patch("/:id", updateUserById);

router.delete("/:id", deleteUser);

router.post("/refresh-token", refreshToken);

module.exports = router;
