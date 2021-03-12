const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        barcode: {type: mongoose.Schema.Types.String, required: true},
        data: {type: mongoose.Schema.Types.Object, required: true},
        quantity: {type: mongoose.Schema.Types.Number, default: 1},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema, "Products");
