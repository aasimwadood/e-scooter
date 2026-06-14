const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Product = require("../models/Product");
const { authMiddleware, JWT_SECRET } = require("../middleware/auth");

// Stock history (in-memory for simplicity, could be a model)
let stockHistory = [];

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

    stockHistory.unshift({
      id: `hist-${Date.now()}`,
      productId: product._id.toString(),
      productName: product.name,
      oldStock,
      newStock: stock,
      change,
      timestamp: new Date().toISOString(),
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

    stockHistory.unshift({
      id: `hist-${product._id}-init`,
      productId: product._id.toString(),
      productName: product.name,
      oldStock: 0,
      newStock: product.stock,
      change: product.stock,
      timestamp: product.createdAt.toISOString(),
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

    stockHistory.unshift({
      id: `hist-${Date.now()}-del`,
      productId: product._id.toString(),
      productName: product.name,
      oldStock: product.stock,
      newStock: 0,
      change: -product.stock,
      timestamp: new Date().toISOString(),
      unitPrice: product.salePrice || product.price,
      stockValueChange: -(product.stock * (product.salePrice || product.price)),
    });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/stock-history
router.get("/stock-history", authMiddleware, (req, res) => {
  res.json(stockHistory);
});

// POST /api/admin/reset - Reset all data
router.post("/reset", authMiddleware, async (req, res) => {
  try {
    await Product.deleteMany({});
    stockHistory = [];
    res.json({ message: "All data reset" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
