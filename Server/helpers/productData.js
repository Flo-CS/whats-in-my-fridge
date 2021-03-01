// A TAXONOMY IS A REGULATED SYNTAX DEFINITION FOR A PROPERTY; FOR EXAMPLE, ALLERGENS. THE DEFINITION INCLUDES ALL POSSIBLE ENTRIES AND TRANSLATIONS INTO OTHER LANGUAGES (SYNONYMS). TAXONOMIES ARE GLOBAL AND MULTILINGUAL AND DO NOT VARY BY COUNTRY.
// A FACET REFERS TO ALL THE VALUES THAT CONTRIBUTORS ADD TO A PROPERTY. A FACET INCLUDES THE VALUES DEFINED IN THE TAXONOMY AND THE NEW VALUES ADDED BY THE CONTRIBUTORS. FACET CHANGE CONSTANTLY AND THEIR VALUES ARE NOT VALIDATED. FACETS VARY BY COUNTRY.

const axios = require("axios");
const path = require("path");
const _ = require("lodash");
const jsonfile = require("jsonfile");

const OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT = "https://world.openfoodfacts.org/data/taxonomies";
const OPEN_FOOD_FACTS_TAXONOMIES = [
    "additives_classes",
    "ingredients_analysis",
    "nova_groups",
    "nutrient_levels",];

const OPEN_FOOD_FACTS_FACETS_ENDPOINT = "https://world.openfoodfacts.org";
const OPEN_FOOD_FACTS_FACETS = ["categories",
    "additives",
    "allergens",
    "brands",
    "ingredients",
    "countries",
    "labels"];

const TAXONOMIES_FILES_PATH = path.join(__dirname, "./../data/taxonomies");
const FACETS_FILES_PATH = path.join(__dirname, "./../data/facets");

async function downloadTaxonomiesFiles() {
    for (const taxonomy of OPEN_FOOD_FACTS_TAXONOMIES) {
        const url = `${OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT}/${taxonomy}.json`;
        const response = await axios.get(url);
        console.log("Taxonomy: ", url);
        jsonfile.writeFileSync(`${TAXONOMIES_FILES_PATH}/${taxonomy}.json`, response.data);
    }
}

async function downloadFacetsFiles() {
    for (const facet of OPEN_FOOD_FACTS_FACETS) {
        const url = `${OPEN_FOOD_FACTS_FACETS_ENDPOINT}/${facet}.json`;
        const response = await axios.get(url);
        console.log("Facet: ", url);
        jsonfile.writeFileSync(`${FACETS_FILES_PATH}/${facet}.json`, response.data);
    }
}


// TAXONOMIES
const additivesClasses = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/additives_classes.json`);
const ingredientsAnalysis = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/ingredients_analysis.json`);
const novaGroups = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/nova_groups.json`);
const nutrientLevels = jsonfile.readFileSync(`${TAXONOMIES_FILES_PATH}/nutrient_levels.json`);

// FACETS
const brands = jsonfile.readFileSync(`${FACETS_FILES_PATH}/brands.json`).tags;
const categories = jsonfile.readFileSync(`${FACETS_FILES_PATH}/categories.json`).tags;
const labels = jsonfile.readFileSync(`${FACETS_FILES_PATH}/labels.json`).tags;
const countries = jsonfile.readFileSync(`${FACETS_FILES_PATH}/countries.json`).tags;
const allergens = jsonfile.readFileSync(`${FACETS_FILES_PATH}/allergens.json`).tags;
const additives = jsonfile.readFileSync(`${FACETS_FILES_PATH}/additives.json`).tags;
const ingredients = jsonfile.readFileSync(`${FACETS_FILES_PATH}/ingredients.json`).tags;

function createAbsentFacet(tagId) {
    const splittedTagId = tagId.split(":");
    let tagName = splittedTagId[splittedTagId.length - 1];
    tagName = tagName.replace("_", " ");
    tagName = tagName.replace(/^\w/, (c) => c.toUpperCase());

    return {
        known: 0,
        name: tagName,
        id: tagId,
        products: null,
        url: null,
        originalFacet: false,
    };
}

// Transform tags from fields preceded with _tags which are lists containing codes (tags ids), for example; "en:beverages" (=> categories)
function transformProductDataTagsIdIntoFacets(productData) {
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
        brands_tags: brands_tags?.map(tagId => _.find(brands, {id: tagId}) || createAbsentFacet(tagId)),
        categories_tags: categories_tags?.map(tagId => _.find(categories, {id: tagId}) || createAbsentFacet(tagId)),
        labels_tags: labels_tags?.map(tagId => _.find(labels, {id: tagId}) || createAbsentFacet(tagId)),
        origins_tags: origins_tags?.map(tagId => _.find(countries, {id: tagId}) || createAbsentFacet(tagId)),
        countries_tags: countries_tags?.map(tagId => _.find(countries, {id: tagId}) || createAbsentFacet(tagId)),
        traces_tags: traces_tags?.map(tagId => _.find(allergens, {id: tagId}) || createAbsentFacet(tagId)),
        allergens_tags: allergens_tags?.map(tagId => _.find(allergens, {id: tagId}) || createAbsentFacet(tagId)),
        additives_tags: additives_tags?.map(tagId => _.find(additives, {id: tagId}) || createAbsentFacet(tagId)),
        ingredients_tags: ingredients_tags?.map(tagId => _.find(ingredients, {id: tagId}) || createAbsentFacet(tagId)),
    };

}


module.exports = {downloadTaxonomiesFiles, downloadFacetsFiles, transformProductDataTagsIdIntoFacets};