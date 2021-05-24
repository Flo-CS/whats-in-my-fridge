const mongoose = require("mongoose");
const dayjs = require("dayjs");


const productSchema = new mongoose.Schema(
    {
            user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
            barcode: {type: mongoose.Schema.Types.String, required: true},
            data: {type: mongoose.Schema.Types.Object, required: true},
            presences: {
                    type: [{date: mongoose.Schema.Types.Date, value: mongoose.Schema.Types.Boolean}],
                    default: [{date: dayjs(), value: true}]
            },
            quantity: {type: mongoose.Schema.Types.Number, default: 1}
    }
);

module.exports = mongoose.model("Product", productSchema, "Products");
