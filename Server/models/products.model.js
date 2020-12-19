const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    barcode: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    data: { type: Object, default: {} },
    lastDateAdded: { type: Date, default: new Date() }
})

module.exports = mongoose.model("Products", ProductSchema)