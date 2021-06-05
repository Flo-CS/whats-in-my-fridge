const mongoose = require("mongoose");
const dayjs = require("dayjs");
const {convertTagsFieldsWithTaxonomies} = require("../helpers/taxonomies");


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

productSchema.methods.export = function() {
    const product = this.toJSON()

    product.data = convertTagsFieldsWithTaxonomies(product.data)

    return product
}
productSchema.methods.updateQuantity =  function(quantity) {
    this.quantity = quantity;

    this.presences.push({date: dayjs(), value: this.quantity >= 1});
    this.markModified("presences");

}
productSchema.methods.wasPresentOn = function (date) {
    return this.presences.find((currentPresence, i, presences) => {
        const nextPresence = presences[i + 1];

        const presenceStartDate = dayjs(currentPresence.date);
        const presenceEndDate = nextPresence ? dayjs(nextPresence.date) : dayjs();

        return date.isBetween(presenceStartDate, presenceEndDate, null, "[)")
            && currentPresence.value === true
    });
}

productSchema.methods.wasPresentBetween = function(startDate, endDate) {
    return this.presences.some(presence => {
        return dayjs(presence.date).isBetween(startDate, endDate, null, "[]") && presence.value === true;
    });
}

module.exports = mongoose.model("Product", productSchema, "Products");
