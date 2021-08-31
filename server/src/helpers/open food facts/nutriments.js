const {USEFUL_NUTRIMENTS_KEYS} = require("../constants");
const {getTranslation} = require("./translations");

// Transform the nutriments object which come from the Open Food Facts into a more convenient object to use (with, if available, the translation for the nutriment)
function transformNutriments(oldNutriments) {
    const nutriments = {};

    for (const nutrimentKey of USEFUL_NUTRIMENTS_KEYS) {
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
        name: getTranslation(nutrimentKey, "fr") || nutrimentKey,
        unit: nutriments[`${nutrimentKey}_unit`],
        "100g": value100g,
        serving: valueServing,
    };
}

module.exports = {
    transformNutriments
};