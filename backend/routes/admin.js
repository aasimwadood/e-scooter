const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Product = require("../models/Product");
const StockHistory = require("../models/StockHistory");
const Sale = require("../models/Sale");
const { authMiddleware, JWT_SECRET } = require("../middleware/auth");

// POST /api/admin/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const admin = new Admin({ name, email, password });
    await admin.save();

    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// POST /api/admin/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/products - Get all products (admin)
router.get("/products", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/admin/products/:id/stock - Update stock
router.put("/products/:id/stock", authMiddleware, async (req, res) => {
  try {
    const { stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const oldStock = product.stock;
    const change = stock - oldStock;
    const unitPrice = product.salePrice || product.price;

    product.stock = stock;
    await product.save();

    await StockHistory.create({
      productId: product._id,
      productName: product.name,
      oldStock,
      newStock: stock,
      change,
      timestamp: new Date(),
      unitPrice,
      stockValueChange: change * unitPrice,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/admin/products - Add new product
router.post("/products", authMiddleware, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    await StockHistory.create({
      productId: product._id,
      productName: product.name,
      oldStock: 0,
      newStock: product.stock,
      change: product.stock,
      timestamp: product.createdAt,
      unitPrice: product.salePrice || product.price,
      stockValueChange: product.stock * (product.salePrice || product.price),
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/admin/products/:id - Delete product
router.delete("/products/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await StockHistory.create({
      productId: product._id,
      productName: product.name,
      oldStock: product.stock,
      newStock: 0,
      change: -product.stock,
      timestamp: new Date(),
      unitPrice: product.salePrice || product.price,
      stockValueChange: -(product.stock * (product.salePrice || product.price)),
    });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/sales
router.get("/sales", authMiddleware, async (req, res) => {
  try {
    const salesData = await Sale.find();
    res.json(salesData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/stock-history
router.get("/stock-history", authMiddleware, async (req, res) => {
  try {
    const history = await StockHistory.find().sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/admin/reset - Reset all data
router.post("/reset", authMiddleware, async (req, res) => {
  try {
    await Product.deleteMany({});
    await StockHistory.deleteMany({});
    await Sale.deleteMany({});
    res.json({ message: "All data reset" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
