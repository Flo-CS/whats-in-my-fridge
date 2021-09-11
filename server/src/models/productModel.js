const mongoose = require("mongoose");
const {Schema} = require("mongoose")
const dayjs = require("dayjs");
const {capitalize, mapValues} = require("lodash")
const {getTagInfos} = require("../helpers/open food facts/tags");
const {transformNutriments} = require("../helpers/open food facts/nutriments");
const {getOFFdata} = require("../helpers/open food facts/api");
const {
    letterScoreToScore,
    isValidScore,
    VALID_LETTER_SCORES,
    VALID_NOVA_GROUPS
} = require("../helpers/open food facts/scores");
const {getTranslation} = require("../helpers/open food facts/translations");
const {parseSizeString, convertValueToBaseUnit} = require("../helpers/open food facts/sizes");


const productSchema = new mongoose.Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: "User", required: true},
        barcode: {type: String, required: true, trim: true},
        presences: {
            type: [{
                value: Boolean,
                date: Date
            }],
            required: true
        },
        quantity: {type: Number, default: 1, min: 0},
        // Data from Open Food Facts
        name: String,
        size: {
            value: Number,
            unit: String
        },
        serving_size: {
            value: Number,
            unit: String
        },
        nutriscore: {
            grade: {type: String, enum: VALID_LETTER_SCORES.concat([null])},
            score: {type: Number, min: 1, max: 5}
        },
        ecoscore: {
            grade: {type: String, enum: VALID_LETTER_SCORES.concat([null])},
            score: {type: Number, min: 1, max: 5}
        },
        nova: {
            grade: {type: Number, enum: VALID_NOVA_GROUPS.concat([null])},
            score: {type: Number, min: 1, max: 4}
        },
        image_url: {type: String, trim: true},
        brands: [{
            type: String,
            get: tag => getTagInfos(tag, "brands")
        }],
        categories: [{
            type: String,
            get: tag => getTagInfos(tag, "categories")
        }],
        labels: [{
            type: String,
            get: tag => getTagInfos(tag, "labels")
        }],
        origins: [{
            type: String,
            get: tag => getTagInfos(tag, "origins")
        }],
        countries: [{
            type: String,
            get: tag => getTagInfos(tag, "countries")
        }],
        ingredients: [{
            type: String,
            get: tag => getTagInfos(tag, "ingredients")
        }],
        allergens: [{
            type: String,
            get: tag => getTagInfos(tag, "allergens")
        }],
        traces: [{
            type: String,
            get: tag => getTagInfos(tag, "allergens")
        }],
        ingredients_analysis: [{
            type: String,
            get: tag => getTagInfos(tag, "ingredients_analysis")
        }],
        additives: [{
            type: String,
            get: tag => getTagInfos(tag, "additives")
        }],
        nutrient_levels: {
            fat: String,
            salt: String,
            "saturated-fat": String,
            sugars: String
        },
        nutriments: {
            type: Object,
            of: {
                key: String,
                unit: String,
                "100g": Number,
                serving: Number,
            },
            get: (nutriments) => {
                return mapValues(nutriments, (nutriment) => {
                    return {
                        ...nutriment,
                        name: getTranslation(nutriment.key, "fr")
                    }
                })
            }
        }
    },
    {toJSON: {getters: true}}
);


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

productSchema.statics.createFromOFFData = async function (barcode, user) {

    let {
        product_name: name,
        quantity: size,
        serving_size,
        nutriscore_grade,
        ecoscore_grade,
        nova_group: nova_grade,
        image_small_url: image_url,
        brands_tags: brands,
        categories_tags: categories,
        labels_tags: labels,
        origins_tags: origins,
        countries_tags: countries,
        ingredients_tags: ingredients,
        allergens_tags: allergens,
        traces_tags: traces,
        ingredients_analysis_tags: ingredients_analysis,
        additives_tags: additives,
        nutrient_levels,
        nutriments
    } = await getOFFdata(barcode);

    const [sizeValue, sizeUnit] = parseSizeString(size);
    const [servingSizeValue, servingSizeUnit] = parseSizeString(serving_size);

    const [convertedSizeValue, convertedSizeUnit] = convertValueToBaseUnit(sizeValue, sizeUnit)
    const [convertedServingSizeValue, convertedServingSizeUnit] = convertValueToBaseUnit(servingSizeValue, servingSizeUnit)

    nutriscore_grade = isValidScore(nutriscore_grade, true) ? nutriscore_grade.toUpperCase() : null
    ecoscore_grade = isValidScore(ecoscore_grade, true) ? ecoscore_grade.toUpperCase() : null
    nova_grade = isValidScore(nova_grade) ? nova_grade : null

    return new Product({
        user: user,
        barcode: barcode,
        presences: [{date: dayjs.utc().format(), value: true}],
        quantity: 1,
        name: capitalize(name),
        size: {
            value: convertedSizeValue,
            unit: convertedSizeUnit,
        },
        serving_size: {
            value: convertedServingSizeValue,
            unit: convertedServingSizeUnit,
        },
        nutriscore: {
            grade: nutriscore_grade,
            score: letterScoreToScore(nutriscore_grade)
        },
        ecoscore: {
            grade: ecoscore_grade,
            score: letterScoreToScore(ecoscore_grade)
        },
        nova: {
            grade: nova_grade,
            score: nova_grade,
        },
        image_url: image_url,
        brands,
        categories,
        labels,
        origins,
        countries,
        ingredients,
        allergens,
        traces,
        ingredients_analysis,
        additives,
        nutrient_levels,
        nutriments: transformNutriments(nutriments)
    })

}

const Product = mongoose.model("Product", productSchema, "Products");

module.exports = Product
