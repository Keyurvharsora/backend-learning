module.exports = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      error: "API key missing",
    });
  }

  if (apiKey !== "12345") {
    return res.status(403).json({
      error: "Invalid API key",
    });
  }

  next();
};
