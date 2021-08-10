// A TAXONOMY IS A REGULATED SYNTAX DEFINITION FOR A PROPERTY; FOR EXAMPLE, ALLERGENS. THE DEFINITION INCLUDES ALL POSSIBLE ENTRIES AND TRANSLATIONS INTO OTHER LANGUAGES (SYNONYMS). TAXONOMIES ARE GLOBAL AND MULTILINGUAL AND DO NOT VARY BY COUNTRY.

// TODO: Transform into class
const axios = require("axios");
const jsonfile = require("jsonfile");
const fs = require("fs");
const path = require("path");
const {OpenFoodFactsError, openFoodFactsErrors} = require("./errors");
const {
    OPEN_FOOD_FACTS_USEFUL_TAXONOMIES,
    OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT,
    TAGS_CORRECTIONS
} = require("./constants");


const taxonomiesFilesPath = path.join(__dirname, "./../../data/taxonomies");

async function downloadTaxonomiesFiles(update = false) {
    try {
        for (const taxonomy of OPEN_FOOD_FACTS_USEFUL_TAXONOMIES) {
            const url = `${OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT}/${taxonomy}.json`;
            const path = `${taxonomiesFilesPath}/${taxonomy}.json`;

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
        global.miscellaneous = jsonfile.readFileSync(`${taxonomiesFilesPath}/miscellaneous.json`); // Doesn't come from OpenFoodFacts
    } catch (error) {
        throw new OpenFoodFactsError(openFoodFactsErrors.readTaxonomiesFiles);
    }
}


// To clean the tag if he was not present in taxonomy or if there is no taxonomy for this type of tag
function formatTag(tag) {
    let tagName = removeCountryCodeFromTag(tag);
    // Remove specials characters
    tagName = tagName.replace(/[-_]/g, " ");
    // First letter in upper case
    return tagName.replace(/^\w/, (c) => c.toUpperCase());
}


function removeCountryCodeFromTag(tag) {
    const splitTag = tag.split(":");

    return splitTag[splitTag.length - 1];
}

function getTagTaxonomy(tag, taxonomyName) {
    const taxonomyFile = global[taxonomyName];

    // Just clean the tag string
    tag = tag.trim().toLowerCase();

    // Try to find a manual correction of the writing of the tag (in the case where the tag is very often "used" but not found in the taxonomy because of a writing error)
    tag = TAGS_CORRECTIONS[tag] || tag;

    let tagTaxonomy = taxonomyFile[tag];

    // If the taxonomy is still not found, try adding the country prefix "en".
    // TODO : Think about its usefulness and the problems it may cause
    if (!tagTaxonomy) {
        tag = `en:${removeCountryCodeFromTag(tag)}`;
        tagTaxonomy = taxonomyFile[tag];
    }

    return tagTaxonomy;
}

function getTagInfos(tag, taxonomyName) {
    try {
        if (!tag) return null;

        const tagTaxonomy = getTagTaxonomy(tag, taxonomyName);

        if (!tagTaxonomy)
            return {
                name: formatTag(tag),
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
        } = tagTaxonomy;

        // TODO: Is the "miscellaneous" taxonomy file really necessary? Isn't it better to just translate on the fly?
        return {
            key: tag,
            name: name?.fr || formatTag(tag),
            isInTaxonomy: !!name?.fr,
            description: description?.fr,
            wikidata: wikidata?.en,
            vegetarian: getTagInfos(vegetarian?.en, "miscellaneous")?.name,
            vegan: getTagInfos(vegan?.en, "miscellaneous")?.name,
            from_palm_oil: getTagInfos(from_palm_oil?.en, "miscellaneous")?.name,
            additives_classes: additives_classes?.en
                ?.split(",").map(additiveClass => getTagInfos(additiveClass, "additives_classes")),
            efsa_evaluation_overexposure_risk: getTagInfos(efsa_evaluation_overexposure_risk?.en, "miscellaneous")?.name,
            efsa_evaluation_adi: efsa_evaluation_adi?.en,
            efsa_evaluation_exposure_mean_greater_than_adi: efsa_evaluation_exposure_mean_greater_than_adi?.en
                ?.split(",").map(populationCategory => getTagInfos(populationCategory, "miscellaneous")),
            efsa_evaluation_exposure_95th_greater_than_adi: efsa_evaluation_exposure_95th_greater_than_adi?.en
                ?.split(",").map(populationCategory => getTagInfos(populationCategory, "miscellaneous")),
            country: country?.en,
            origins: origins?.en
                ?.split(",").map(origin => getTagInfos(origin, "origins")),
            region: region?.fr,
        };

    } catch (error) {
        throw new OpenFoodFactsError(openFoodFactsErrors.getTagInfos);
    }
}


// Translate tags (that come from a field preceded with _tags, this fields are lists containing tags ids, like en:chocolate or fr:label-rouge), for example, traduce "en:beverages" to
// an object containing the associated name: Beverages (or Boissons in french) as well as other infos: wikidata QID etc.
function getTagsInfos(tags, taxonomyName) {
    return tags?.map((tag) => getTagInfos(tag, taxonomyName));
}

module.exports = {
    downloadTaxonomiesFiles,
    loadTaxonomiesFiles,
    getTagsInfos,
    getTagInfos: getTagInfos
};