const mongoose = require("mongoose");
const dayjs = require("dayjs");
const {getTagsInfos} = require("../helpers/taxonomies");


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

    const tagsFieldsWithAssociatedTaxonomy = [
        {field: "brands", taxonomyName: "brands"},
        {field: "categories", taxonomyName: "categories"},
        {field: "labels", taxonomyName: "labels"},
        {field: "origins", taxonomyName: "origins"},
        {field: "countries", taxonomyName: "countries"},
        {field: "traces", taxonomyName: "allergens"},
        {field: "allergens", taxonomyName: "allergens"},
        {field: "additives", taxonomyName: "additives"},
        {field: "ingredients", taxonomyName: "ingredients"},
        {field: "ingredients_analysis", taxonomyName: "ingredients_analysis"},
    ];

    // Replace the current tags list by the list of infos about each tag
    for (const {field, taxonomyName} of tagsFieldsWithAssociatedTaxonomy) {
        const fieldName = `${field}_tags`;
        product.data[fieldName] = getTagsInfos(product.data[fieldName], taxonomyName);
    }

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
