const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number, default: null },
  stock: { type: Number, required: true, default: 0 },
  images: [{ type: String }],
  isNewArrival: { type: Boolean, default: false },
  isOnSale: { type: Boolean, default: false },
  brand: { type: String, required: true, enum: ["Eveons", "Evee"] },
  specs: {
    topSpeed: String,
    range: String,
    battery: String,
    motor: String,
    weight: String,
    maxLoad: String,
    chargingTime: String,
    tireSize: String,
    brakes: String,
    waterproofRating: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);
