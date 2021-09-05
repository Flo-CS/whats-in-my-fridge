const {USEFUL_NUTRIMENTS_KEYS, DEFAULT_UNITS} = require("../constants");
const {convertValueToBaseUnit} = require("./sizes");

// Transform the nutriments object which come from the Open Food Facts into a more convenient object to use (with, if available, the translation for the nutriment)
function transformNutriments(oldNutriments) {
    const nutriments = {};

    for (const nutrimentKey of USEFUL_NUTRIMENTS_KEYS) {
        const nutrimentInfos = extractNutrimentInfos(oldNutriments, nutrimentKey);

        if (!nutrimentInfos) continue;

        nutriments[nutrimentKey] = nutrimentInfos;
    }

    return nutriments;
}

function extractNutrimentInfos(nutriments, nutrimentKey) {

    const value100g = nutriments[`${nutrimentKey}_100g`];
    const valueServing = nutriments[`${nutrimentKey}_serving`];
    const unit = nutriments[`${nutrimentKey}_unit`]

    if (!value100g && !valueServing) {
        return null;
    }
    const [convertedValue100g, , convert100gSuccess] = convertValueToBaseUnit(value100g, unit)
    const [convertedValueServing, , convertServingSuccess] = convertValueToBaseUnit(valueServing, unit)

    return {
        key: nutrimentKey,
        unit: convert100gSuccess || convertServingSuccess ? DEFAULT_UNITS.mass : unit,
        "100g": convert100gSuccess ? convertedValue100g : value100g,
        serving: convertServingSuccess ? convertedValueServing : valueServing,
    };
}


module.exports = {
    transformNutriments
};