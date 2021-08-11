const {NUTRIMENTS_KEYS} = require("../constants");
const {getTraduction} = require("./traductions");

// Transform the nutriments object which come from the Open Food Facts into a more convenient object to use (with, if available, the traduction for the nutriment)
function transformNutriments(oldNutriments) {
    const nutriments = {};

    for (const nutrimentKey of NUTRIMENTS_KEYS) {
        const nutrimentInfos = getNutrimentInfos(oldNutriments, nutrimentKey);

        if (!nutrimentInfos) continue;

        nutriments[nutrimentKey] = nutrimentInfos;
    }

    return nutriments;
}

function getNutrimentInfos(nutriments, nutrimentKey) {
    const value100g = nutriments[`${nutrimentKey}_100g`];
    const valueServing = nutriments[`${nutrimentKey}_serving`];

    if (!value100g && !valueServing) {
        return null;
    }

    return {
        name: getTraduction(nutrimentKey, "fr") || nutrimentKey,
        unit: nutriments[`${nutrimentKey}_unit`],
        "100g": value100g,
        serving: valueServing,
    };
}

module.exports = {
    transformNutriments
};