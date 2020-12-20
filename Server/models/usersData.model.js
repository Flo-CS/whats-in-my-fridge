const mongoose = require("mongoose");


const UserDataSchema = mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        barcode: { type: String, required: true },
        quantity: { type: Number, default: 1 },
        data: { type: Object, default: {} },
        lastDateQuantityModified: { type: Date, default: new Date() }
    }]
})

module.exports = mongoose.model("UsersData", UserDataSchema)