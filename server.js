require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const connectDB = require("./config/db");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/errorMiddleware");
const { rateLimiter } = require("./middlewares/rateLimiters.middleware");
const uploadRouter = require("./routes/upload.routes");
const { logger } = require("./config/logger");
const { swaggerUi, swaggerSpec } = require("./config/swagger");
const app = express();

connectDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(morgan("dev"));

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.use(errorMiddleware);

app.use("/api/user", rateLimiter, userRoutes);

app.use("/api/upload", uploadRouter);

app.listen(8001, () => {
  // console.log("Server running on port 8001");
  logger.info("Server running on port 8001");
});
