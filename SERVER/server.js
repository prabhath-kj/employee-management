import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin:"http://localhost:1234"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // Log HTTP requests to the console

// Import routes
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";

// Mount routes
app.use("/", userRouter);
app.use("/admin", adminRouter);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server
mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
