import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { config } from "dotenv";
import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

config();
const app = express();
const allowedOrigins = [
  "https://expense-tracker-kartikey-guptas-projects.vercel.app/",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/ping", function (req, res) {
  res.send("pong");
});

//* routes of all the modules
app.use("/api/v1/user", userRoutes);
app.use("api/v1/transaction", transactionRoutes);

app.use(errorMiddleware);

export default app;
