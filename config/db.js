const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://keyurharsora09_db_user:bvOVKxqGwySPOZmm@cluster0.s3ot4zo.mongodb.net/?appName=Cluster0",
    );
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
