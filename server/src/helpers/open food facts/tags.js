// To clean the tag if he was not present in taxonomy or if there is no taxonomy for this type of tag
const {TAGS_CORRECTIONS} = require("../constants");
const {OpenFoodFactsError, openFoodFactsErrors} = require("../errors");

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

function getTagData(tag, taxonomyName) {
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

        const tagData = getTagData(tag, taxonomyName);

        if (!tagData)
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
        } = tagData;

        // TODO: Is the "miscellaneous" taxonomy file really necessary? Isn't it better to just translate on the fly?
        return {
            key: tag,
            name: name?.fr || formatTag(tag),
            isInTaxonomy: !!name?.fr,
            description: description?.fr,
            wikidata: wikidata?.en,
            vegetarian: vegetarian?.en,
            vegan: vegan?.en,
            from_palm_oil: from_palm_oil?.en,
            additives_classes: additives_classes?.en
                ?.split(",").map(additiveClass => getTagInfos(additiveClass, "additives_classes")),
            efsa_evaluation_overexposure_risk: efsa_evaluation_overexposure_risk?.en,
            efsa_evaluation_adi: efsa_evaluation_adi?.en,
            efsa_evaluation_exposure_mean_greater_than_adi: efsa_evaluation_exposure_mean_greater_than_adi?.en
                ?.split(","),
            efsa_evaluation_exposure_95th_greater_than_adi: efsa_evaluation_exposure_95th_greater_than_adi?.en
                ?.split(","),
            country: country?.en,
            origins: origins?.en
                ?.split(",").map(origin => getTagInfos(origin, "origins")),
            region: region?.fr,
        };

    } catch (error) {
        throw new OpenFoodFactsError(openFoodFactsErrors.getTagInfos);
    }
}


// Translate tags (that come from a field preceded with _tags, this fields are lists containing tags ids, like en:chocolate or fr:label-rouge), for example, traduce "en:beverages" to an object containing the associated name: Beverages (or Boissons in french) as well as other infos: wikidata QID etc.
function getTagsInfos(tags, taxonomyName) {
    return tags?.map((tag) => getTagInfos(tag, taxonomyName));
}

module.exports = {
    getTagsInfos,
    getTagInfos
};