const {USEFUL_NUTRIMENTS_KEYS, DEFAULT_UNITS} = require("../constants");
const {convertValueToBaseUnit} = require("./sizes");
const {round} = require("lodash");

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

    // TODO : Won't rounding compromise some data?
    const value100g = round(nutriments[`${nutrimentKey}_100g`], 8);// Round because openFoodFacts nutriments values have floating point rounding error sometimes
    const valueServing = round(nutriments[`${nutrimentKey}_serving`], 8);
    const unit = nutriments[`${nutrimentKey}_unit`] || DEFAULT_UNITS.mass // We assume that if there is no unit, the is the default mass unit

    if (!value100g && !valueServing) {
        return null;
    }

    // We only get the converted unit here because it will be the same for 100g and serving because it's the same unit in entry
    const [convertedValue100g, convertedUnit, convert100gSuccess] = convertValueToBaseUnit(value100g, unit)
    const [convertedValueServing, , convertServingSuccess] = convertValueToBaseUnit(valueServing, unit)

    return {
        key: nutrimentKey,
        unit: (convert100gSuccess || convertServingSuccess) ? convertedUnit : DEFAULT_UNITS.mass, // if at least one conversion is successful, we use the converted unit
        "100g": convert100gSuccess ? convertedValue100g : null,
        serving: convertServingSuccess ? convertedValueServing : null,
    };
}


module.exports = {
    transformNutriments
};