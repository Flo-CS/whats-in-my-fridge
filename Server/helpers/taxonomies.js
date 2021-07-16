// A TAXONOMY IS A REGULATED SYNTAX DEFINITION FOR A PROPERTY; FOR EXAMPLE, ALLERGENS. THE DEFINITION INCLUDES ALL POSSIBLE ENTRIES AND TRANSLATIONS INTO OTHER LANGUAGES (SYNONYMS). TAXONOMIES ARE GLOBAL AND MULTILINGUAL AND DO NOT VARY BY COUNTRY.

// TODO: Transform into class
const axios = require("axios");
const jsonfile = require("jsonfile");
const path = require("path");
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
    global.categories = jsonfile.readFileSync(`${taxonomiesFilesPath}/categories.json`);
    global.labels = jsonfile.readFileSync(`${taxonomiesFilesPath}/labels.json`);
    global.countries = jsonfile.readFileSync(`${taxonomiesFilesPath}/countries.json`);
    global.origins = jsonfile.readFileSync(`${taxonomiesFilesPath}/origins.json`);
    global.allergens = jsonfile.readFileSync(`${taxonomiesFilesPath}/allergens.json`);
    global.additives = jsonfile.readFileSync(`${taxonomiesFilesPath}/additives.json`);
    global.ingredients = jsonfile.readFileSync(`${taxonomiesFilesPath}/ingredients.json`);
    global.brands = jsonfile.readFileSync(`${taxonomiesFilesPath}/brands.json`);
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
    tag = tag.trim().toLowerCase();

    const taxonomy = global[taxonomyName];

    const tagTaxonomy = taxonomy[tag];

    if (!tagTaxonomy)
        return {
            name: cleanTag(tag),
            isInTaxonomy: false,
        };


    const {
        name, // For all type of tag (specific to user language)
        description, // For all type of tag (specific to user language)
        wikidata, // For all type of tag
        vegetarian, // For ingredients, additives
        vegan, // For ingredients, additives
        from_palm_oil, // For ingredients, additives
        additives_classes, // For additives
        efsa_evaluation_overexposure_risk, // For additives (tag string)
        efsa_evaluation_adi, // For additives
        efsa_evaluation_exposure_mean_greater_than_adi, // For additives (tags string)
        efsa_evaluation_exposure_95th_greater_than_adi, // For additives (tags string)
        country, // For categories
        origins, // For categories (tags string)
        region, // For categories (specific to user language)
        "instanceof": instance_of, // For categories (specific to user language)
        parents, // For all type of tags (tags list)
        children, // For all type of tags (tags list)
        allergens, // For ingredients (tags string)
        daily_value, // For nutrients (string of number separate by commas)
        unit // For nutrients
    } = tagTaxonomy;


    return {
        name: name?.fr ? name?.fr : cleanTag(tag),
        isInTaxonomy: !!name?.fr,
        description: description?.fr,
        wikidata: wikidata?.en,
        vegetarian: vegetarian?.en,
        vegan: vegan?.en,
        from_palm_oil: from_palm_oil?.en,
        additives_classes: additives_classes?.en?.split(",").map(additiveClass => getTagInfos(additiveClass, "additives_classes")),
        efsa_evaluation_overexposure_risk: efsa_evaluation_overexposure_risk?.en,
        efsa_evaluation_adi: efsa_evaluation_adi?.en,
        efsa_evaluation_exposure_mean_greater_than_adi: efsa_evaluation_exposure_mean_greater_than_adi?.en,
        efsa_evaluation_exposure_95th_greater_than_adi: efsa_evaluation_exposure_95th_greater_than_adi?.en,
        country: country?.en,
        origins: origins?.en?.split(",").map(origin => getTagInfos(origin, "origins")),
        region: region?.fr,
        instance_of: instance_of?.fr,
        allergens: allergens?.en?.split(",").map(allergen => getTagInfos(allergen, "allergens")),
        daily_value: daily_value?.en,
        unit: unit?.en
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
        brands_tags: brands_tags?.map(tag => getTagInfos(tag, "brands")),
        categories_tags: categories_tags?.map(tag => getTagInfos(tag, "categories")),
        labels_tags: labels_tags?.map(tag => getTagInfos(tag, "labels")),
        origins_tags: origins_tags?.map(tag => getTagInfos(tag, "origins")),
        countries_tags: countries_tags?.map(tag => getTagInfos(tag, "countries")),
        traces_tags: traces_tags?.map(tag => getTagInfos(tag, "allergens")),
        allergens_tags: allergens_tags?.map(tag => getTagInfos(tag, "allergens")),
        additives_tags: additives_tags?.map(tag => getTagInfos(tag, "additives")),
        ingredients_tags: ingredients_tags?.map(tag => getTagInfos(tag, "ingredients")),
        ingredients_analysis_tags: ingredients_analysis_tags?.map(tag => getTagInfos(tag, "ingredients_analysis")),
    };

}

module.exports = {downloadTaxonomiesFiles, convertTagsFieldsWithTaxonomies, getTagInfos};