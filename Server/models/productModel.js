const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        barcode: {type: String, required: true},
        data: {type: Object, required: true},
        quantity: {type: Number, default: 1},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema, "Products");
