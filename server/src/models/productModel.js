const mongoose = require("mongoose");
const dayjs = require("dayjs");
const {convertTagsFieldsWithTaxonomies} = require("../helpers/taxonomies");


const productSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        barcode: {type: mongoose.Schema.Types.String, required: true},
        data: {type: mongoose.Schema.Types.Object, required: true},
        presences: {type: mongoose.Schema.Types.Array, required: true},
        quantity: {type: mongoose.Schema.Types.Number, default: 1}
    }
);

productSchema.methods.export = function () {
    const product = this.toJSON();

    product.data = convertTagsFieldsWithTaxonomies(product.data);

    return product;
};
productSchema.methods.updateQuantity = function (quantity) {
    this.quantity = quantity;

    const lastIndex = this.presences.length - 1;


    if (dayjs.utc().isSame(this.presences[lastIndex].date, "day")) {
        this.presences[lastIndex] = {date: dayjs.utc().format(), value: this.quantity >= 1};
    } else {
        this.presences.push({date: dayjs.utc().format(), value: this.quantity >= 1});
    }

    this.markModified("presences");
};
productSchema.methods.wasPresentOn = function (date, granularity) {
    return this.presences.some((currentPresence, i, presences) => {
        const nextPresence = presences[i + 1];

        const presenceStartDate = dayjs.utc(currentPresence.date);
        const presenceEndDate = nextPresence ? dayjs.utc(nextPresence.date) : dayjs.utc().add(1, granularity);

        return date.isBetween(presenceStartDate, presenceEndDate, granularity, "[)")
            && currentPresence.value === true;
    });

};


module.exports = mongoose.model("Product", productSchema, "Products");
