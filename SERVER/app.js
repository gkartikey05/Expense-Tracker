import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { config } from "dotenv";
import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import errorMiddleware from './middleware/error.middleware.js'

config();
const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL_PROD || process.env.FRONTEND_URL_DEV

app.use(express.json());
app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/ping", function (req, res) {
  res.send("pong");
});

//* routes of all the modules
app.use("/api/v1/user", userRoutes);
app.use("api/v1/transaction", transactionRoutes);

app.use(errorMiddleware)

export default app;
