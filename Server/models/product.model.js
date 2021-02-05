const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    barcode: { type: String, required: true },
    data: { type: Object, default: {} },
    quantity: { type: Number, default: 1 },
    lastDateModified: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema, "Products");
