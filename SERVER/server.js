import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route files
import auth from "./routes/auth.routes.js";
import transactions from "./routes/transactions.routes.js";

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/transactions", transactions);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
