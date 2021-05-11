const mongoose = require("mongoose");
const dayjs = require("dayjs");
const {DATE_FORMAT} = require("../config");


const productSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        barcode: {type: mongoose.Schema.Types.String, required: true},
        data: {type: mongoose.Schema.Types.Object, required: true},
        presences: {type: mongoose.Schema.Types.Array, default: [[dayjs().format(DATE_FORMAT), true]]},
        quantity: {type: mongoose.Schema.Types.Number, default: 1}
    }
);


module.exports = mongoose.model("Product", productSchema, "Products");
