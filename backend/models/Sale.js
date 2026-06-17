const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  qty: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sale", saleSchema);
