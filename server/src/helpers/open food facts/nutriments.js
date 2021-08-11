import {MAIN_NUTRIMENTS_NAMES, OTHERS_NUTRIMENTS_NAMES} from "../constants";
import {getTraduction} from "./traductions";

// Transform the nutriments object which come from the Open Food Facts into a more convenient object to use (with, if available, the traduction for the nutriment)
function transformNutriments(oldNutriments) {
    const nutriments = {
        main: {},
        others: {}
    };

    for (const nutrimentName of MAIN_NUTRIMENTS_NAMES) {
        nutriments.main[nutrimentName] = getNutrimentInfos(oldNutriments, nutrimentName);
    }

    for (const nutrimentName of OTHERS_NUTRIMENTS_NAMES) {
        nutriments.others[nutrimentName] = getNutrimentInfos(oldNutriments, nutrimentName);
    }

    return nutriments;
}

function getNutrimentInfos(nutriments, nutrimentName) {
    return {
        name: getTraduction(nutrimentName, "fr") || nutrimentName,
        unit: nutriments[`${nutrimentName}_unit`],
        "100g": nutriments[`${nutrimentName}_100g`],
        serving: nutriments[`${nutrimentName}_serving`],
    };
}

module.exports = {
    transformNutriments
};