const rateLimit = require("express-rate-limit");

exports.rateLimiter = rateLimit({
  max: 5,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this device",
});
