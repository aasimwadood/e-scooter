const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Load environment variables
require("dotenv").config();

const productRoutes = require("../backend/routes/products");
const adminRoutes = require("../backend/routes/admin");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection (Lazy load on each request for serverless)
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://aasimwadood_db_user:mYMXdL4dpfY2wk1g@escooter-kohat.iayojxi.mongodb.net/escooter-kohat?retryWrites=true&w=majority&appName=escooter-kohat";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Execute connection globally (Mongoose buffers queries)
connectDB();

// Export as Express app
module.exports = app;
