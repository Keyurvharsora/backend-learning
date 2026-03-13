const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../utils/sendEmail");
const { emailQueue } = require("../queues/email.queue");

exports.signup = async (req, res) => {
  const { email } = req.body;

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  // await sendEmail({
  //   to: email,
  //   subject: "Welcome to our app",
  //   html: "<h1>Welcome 🎉</h1><p>Your account was created.</p>",
  // });

  await emailQueue.add(
    "sendWelcomeEmail",
    {
      email: email,
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
    },
  );

  const user = await User.create({ ...req.body, password: hashedPassword });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
