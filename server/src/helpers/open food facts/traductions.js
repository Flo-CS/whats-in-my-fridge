const jsonfile = require("jsonfile");
const {OpenFoodFactsError, openFoodFactsErrors} = require("../errors");
const {OPEN_FOOD_FACTS_TRADUCTIONS_FILE_PATH} = require("../constants");

let traductions;
try {
    traductions = jsonfile.readFileSync(OPEN_FOOD_FACTS_TRADUCTIONS_FILE_PATH); // Doesn't come from OpenFoodFacts
} catch (error) {
    throw new OpenFoodFactsError(openFoodFactsErrors.readTraductionsFile);
}


function getTraduction(text, lang) {
    return traductions?.[text]?.[lang];
}

module.exports = {
    getTraduction
};



