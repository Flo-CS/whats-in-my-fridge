const jsonfile = require("jsonfile");
const {OpenFoodFactsError, openFoodFactsErrors} = require("../errors");
const {OPEN_FOOD_FACTS_TRANSLATIONS_FILE_PATH} = require("../constants");

let translations;
try {
    translations = jsonfile.readFileSync(OPEN_FOOD_FACTS_TRANSLATIONS_FILE_PATH); // Doesn't come from OpenFoodFacts
} catch (error) {
    throw new OpenFoodFactsError(openFoodFactsErrors.readTranslationsFile);
}


function getTranslation(text, lang) {
    return translations?.[text]?.[lang];
}

module.exports = {
    getTranslation
};



