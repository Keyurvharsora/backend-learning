const express = require("express");
const { upload } = require("../config/multer.config");
const { uploadFile } = require("../controllers/upload.controller");
const router = express.Router();

router.post("/", upload.single("file"), uploadFile);

module.exports = router;
