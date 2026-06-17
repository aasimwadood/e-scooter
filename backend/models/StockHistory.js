const mongoose = require("mongoose");

const stockHistorySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  oldStock: { type: Number, required: true },
  newStock: { type: Number, required: true },
  change: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  unitPrice: { type: Number, required: true },
  stockValueChange: { type: Number, required: true },
});

module.exports = mongoose.model("StockHistory", stockHistorySchema);
