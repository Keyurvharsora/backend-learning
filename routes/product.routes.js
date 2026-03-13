const express = require("express");
const { protect } = require("../middlewares/authentication.middleware");
const { authorize } = require("../middlewares/authorization.middleware");
const router = express.Router();

// router.post(
//   "/create-product",
//   protect,
//   authorize("admin", "user"),
//     createProduct,
// );
