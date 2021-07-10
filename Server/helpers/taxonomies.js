// A TAXONOMY IS A REGULATED SYNTAX DEFINITION FOR A PROPERTY; FOR EXAMPLE, ALLERGENS. THE DEFINITION INCLUDES ALL POSSIBLE ENTRIES AND TRANSLATIONS INTO OTHER LANGUAGES (SYNONYMS). TAXONOMIES ARE GLOBAL AND MULTILINGUAL AND DO NOT VARY BY COUNTRY.

// TODO: Transform into class
const axios = require("axios");
const _ = require("lodash");
const jsonfile = require("jsonfile");
const path = require("path")
const {OPEN_FOOD_FACTS_USEFUL_TAXONOMIES, OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT} = require("../config");


const taxonomiesFilesPath = path.join(__dirname, "./../data/taxonomies");

async function downloadTaxonomiesFiles() {
    for (const taxonomy of OPEN_FOOD_FACTS_USEFUL_TAXONOMIES) {
        const url = `${OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT}/${taxonomy}.json`;
        const response = await axios.get(url);
        console.log("Taxonomy: ", url);
        jsonfile.writeFileSync(`${taxonomiesFilesPath}/${taxonomy}.json`, response.data);
    }
}


// TAXONOMIES
try {
    global.additives_classes = jsonfile.readFileSync(`${taxonomiesFilesPath}/additives_classes.json`);
    global.ingredients_analysis = jsonfile.readFileSync(`${taxonomiesFilesPath}/ingredients_analysis.json`);
    global.nova_groups = jsonfile.readFileSync(`${taxonomiesFilesPath}/nova_groups.json`);
    global.categories = jsonfile.readFileSync(`${taxonomiesFilesPath}/categories.json`);
    global.labels = jsonfile.readFileSync(`${taxonomiesFilesPath}/labels.json`);
    global.countries = jsonfile.readFileSync(`${taxonomiesFilesPath}/countries.json`);
    global.origins = jsonfile.readFileSync(`${taxonomiesFilesPath}/origins.json`);
    global.allergens = jsonfile.readFileSync(`${taxonomiesFilesPath}/allergens.json`);
    global.additives = jsonfile.readFileSync(`${taxonomiesFilesPath}/additives.json`);
    global.ingredients = jsonfile.readFileSync(`${taxonomiesFilesPath}/ingredients.json`);
} catch (error) {
    console.error(error);
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

function getTagInfos(tag, taxonomyName) {
    const taxonomy = global[taxonomyName];

    if (!taxonomy) {
        return {
            converted: false, // For the frontend: to know if the tag was present in the taxonomy
            name: cleanTag(tag)
        };
    }

    const tagTaxonomy = taxonomy[tag];
    const tagName = _.get(tagTaxonomy, `name.fr`);

    return {
        converted: !!tagName,
        name: tagName ? tagName : cleanTag(tag)
    };
}

// Translate tags from fields preceded with _tags which are lists containing tags ids, for example, traduce "en:beverages" to Beverages (or Boissons in french)
// TODO: Do this in a cleaner way
function convertTagsFieldsWithTaxonomies(productData) {
    const {
        brands_tags,
        categories_tags,
        labels_tags,
        origins_tags,
        countries_tags,
        traces_tags,
        allergens_tags,
        additives_tags,
        ingredients_tags,
        ingredients_analysis_tags,
    } = productData;

    return {
        ...productData,
        brands_tags: brands_tags?.map(tag => getTagInfos(tag, "brands_tags")), // No taxonomy for brands
        categories_tags: categories_tags?.map(tag => getTagInfos(tag, "categories_tags")),
        labels_tags: labels_tags?.map(tag => getTagInfos(tag, "labels_tags")),
        origins_tags: origins_tags?.map(tag => getTagInfos(tag, "origins_tags")),
        countries_tags: countries_tags?.map(tag => getTagInfos(tag, "countries_tags")),
        traces_tags: traces_tags?.map(tag => getTagInfos(tag, "allergens_tags")),
        allergens_tags: allergens_tags?.map(tag => getTagInfos(tag, "allergens_tags")),
        additives_tags: additives_tags?.map(tag => getTagInfos(tag, "additives_tags")),
        ingredients_tags: ingredients_tags?.map(tag => getTagInfos(tag, "ingredients")),
        ingredients_analysis_tags: ingredients_analysis_tags?.map(tag => getTagInfos(tag, "ingredients_analysis_tags")),
    };

}

module.exports = {downloadTaxonomiesFiles, convertTagsFieldsWithTaxonomies, getTagName: getTagInfos};