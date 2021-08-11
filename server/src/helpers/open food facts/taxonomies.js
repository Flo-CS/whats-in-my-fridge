// A TAXONOMY IS A REGULATED SYNTAX DEFINITION FOR A PROPERTY; FOR EXAMPLE, ALLERGENS. THE DEFINITION INCLUDES ALL POSSIBLE ENTRIES AND TRANSLATIONS INTO OTHER LANGUAGES (SYNONYMS). TAXONOMIES ARE GLOBAL AND MULTILINGUAL AND DO NOT VARY BY COUNTRY.

const axios = require("axios");
const jsonfile = require("jsonfile");
const fs = require("fs");
const {OpenFoodFactsError, openFoodFactsErrors} = require("../errors");
const {
    OPEN_FOOD_FACTS_USEFUL_TAXONOMIES,
    OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT,
    OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH,
} = require("../constants");


async function downloadTaxonomiesFiles(update = false) {
    try {
        for (const taxonomy of OPEN_FOOD_FACTS_USEFUL_TAXONOMIES) {
            const url = `${OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT}/${taxonomy}.json`;
            const path = `${OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH}/${taxonomy}.json`;

            if (fs.existsSync(path) && !update)
                continue;

            const response = await axios.get(url);
            jsonfile.writeFileSync(path, response.data);
            console.log(url);
        }
    } catch (error) {
        throw new OpenFoodFactsError(openFoodFactsErrors.downloadTaxonomiesFiles);
    }
}


// TAXONOMIES
function loadTaxonomiesFiles() {
    try {
        global.additives_classes = jsonfile.readFileSync(`${OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH}/additives_classes.json`);
        global.ingredients_analysis = jsonfile.readFileSync(`${OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH}/ingredients_analysis.json`);
        global.categories = jsonfile.readFileSync(`${OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH}/categories.json`);
        global.labels = jsonfile.readFileSync(`${OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH}/labels.json`);
        global.countries = jsonfile.readFileSync(`${OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH}/countries.json`);
        global.origins = jsonfile.readFileSync(`${OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH}/origins.json`);
        global.allergens = jsonfile.readFileSync(`${OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH}/allergens.json`);
        global.additives = jsonfile.readFileSync(`${OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH}/additives.json`);
        global.ingredients = jsonfile.readFileSync(`${OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH}/ingredients.json`);
        global.brands = jsonfile.readFileSync(`${OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH}/brands.json`);
    } catch (error) {
        throw new OpenFoodFactsError(openFoodFactsErrors.readTaxonomiesFiles);
    }
}


module.exports = {
    downloadTaxonomiesFiles,
    loadTaxonomiesFiles
};