require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Admin = require("./models/Admin");
const StockHistory = require("./models/StockHistory");
const Sale = require("./models/Sale");

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://aasimwadood_db_user:mYMXdL4dpfY2wk1g@escooter-kohat.iayojxi.mongodb.net/escooter-kohat?retryWrites=true&w=majority&appName=escooter-kohat";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing
    await Product.deleteMany({});
    await Admin.deleteMany({});
    await StockHistory.deleteMany({});
    await Sale.deleteMany({});
    console.log("Cleared existing data");

    // Seed admin
    const admin = new Admin({
      name: "Admin",
      email: process.env.ADMIN_EMAIL || "admin@escooter-kohat.com",
      password: process.env.ADMIN_PASSWORD || "KohatEbike2024!",
    });
    await admin.save();
    console.log("Seeded admin user");

    console.log("Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
