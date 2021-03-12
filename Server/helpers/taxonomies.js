// A TAXONOMY IS A REGULATED SYNTAX DEFINITION FOR A PROPERTY; FOR EXAMPLE, ALLERGENS. THE DEFINITION INCLUDES ALL POSSIBLE ENTRIES AND TRANSLATIONS INTO OTHER LANGUAGES (SYNONYMS). TAXONOMIES ARE GLOBAL AND MULTILINGUAL AND DO NOT VARY BY COUNTRY.

const axios = require("axios");
const path = require("path");
const _ = require("lodash");
const jsonfile = require("jsonfile");

const OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT = "https://world.openfoodfacts.org/data/taxonomies";
const OPEN_FOOD_FACTS_TAXONOMIES = [
    "categories",
    "additives_classes",
    "ingredients_analysis",
    "nova_groups",
    "nutrient_levels",
    "additives",
    "allergens",
    "ingredients",
    "countries",
    "origins",
    "labels"];


const TAXONOMIES_FILES_PATH = path.join(__dirname, "./../data/taxonomies");

async function downloadTaxonomiesFiles() {
    for (const taxonomy of OPEN_FOOD_FACTS_TAXONOMIES) {
        const url = `${OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT}/${taxonomy}.json`;
        const response = await axios.get(url);
        console.log("Taxonomy: ", url);
        jsonfile.writeFileSync(`${TAXONOMIES_FILES_PATH}/${taxonomy}.json`, response.data);
    }
}


// TAXONOMIES
try {
    global.additivesClasses = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/additives_classes.json`);
    global.ingredientsAnalysis = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/ingredients_analysis.json`);
    global.novaGroups = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/nova_groups.json`);
    global.nutrientLevels = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/nutrient_levels.json`);
    global.categories = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/categories.json`);
    global.labels = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/labels.json`);
    global.countries = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/countries.json`);
    global.origins = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/origins.json`);
    global.allergens = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/allergens.json`);
    global.additives = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/additives.json`);
    global.ingredients = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/ingredients.json`);
} catch (error) {
    console.log(error);
}

// To clean the tag if he was not present in taxonomy or if there is no taxonomy for this type of tag
function cleanTag(tag) {

    const splitTag = tag.split(":");
    let tagName = splitTag[splitTag.length - 1];
    // Remove specials characters
    tagName = tagName.replace(/[-_]/g, " ");

    // First letter in upper case
    tagName = tagName.replace(/^\w/, (c) => c.toUpperCase());

    return tagName;

}

function getTagName(tag, taxonomyName, langCode) {
    const taxonomy = global[taxonomyName];

    if (!taxonomy) {
        return {
            converted: false,
            name: cleanTag(tag)
        };
    }

    const tagTaxonomy = taxonomy[tag];
    const tagName = _.get(tagTaxonomy, `name.${langCode}`);

    return {
        converted: !!tagName, // For the frontend: to know if the tag was present in the taxonomy
        name: !!tagName ? tagName : cleanTag(tag)
    };
}

// Translate tags from fields preceded with _tags which are lists containing tags ids, for example, traduce "en:beverages" to Beverages (or Boissons in french)
// TODO: Do this in a cleaner way
function convertTagsWithTaxonomies(productData, langCode) {
    const {
        brands_tags,
        categories_tags,
        labels_tags,
        origins_tags,
        countries_tags,
        traces_tags,
        allergens_tags,
        additives_tags,
        ingredients_tags
    } = productData;

    return {
        ...productData,
        brands_tags: brands_tags?.map(tag => getTagName(tag, "brands", langCode)), // No taxonomy for brands
        categories_tags: categories_tags?.map(tag => getTagName(tag, "categories", langCode)),
        labels_tags: labels_tags?.map(tag => getTagName(tag, "labels", langCode)),
        origins_tags: origins_tags?.map(tag => getTagName(tag, "origins", langCode)),
        countries_tags: countries_tags?.map(tag => getTagName(tag, "countries", langCode)),
        traces_tags: traces_tags?.map(tag => getTagName(tag, "allergens", langCode)),
        allergens_tags: allergens_tags?.map(tag => getTagName(tag, "allergens", langCode)),
        additives_tags: additives_tags?.map(tag => getTagName(tag, "additives", langCode)),
        ingredients_tags: ingredients_tags?.map(tag => getTagName(tag, "ingredients", langCode)),
    };

}


module.exports = {downloadTaxonomiesFiles, convertTagsWithTaxonomies};