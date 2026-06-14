const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET /api/products - List products (public)
router.get("/", async (req, res) => {
  try {
    const { search, filter, brand } = req.query;
    let query = {};

    if (filter === "new") query.isNewArrival = true;
    if (filter === "sale") query.isOnSale = true;
    if (brand) query.brand = brand;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:id - Get single product (public)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
