const {OpenFoodFactsError, openFoodFactsErrors} = require("../errors");

// This class represent a tag and its associated data (like, translated name, vegetarian status etc.)
class Tag {
    constructor(tagKey, type, autoUpdate = true) {
        // Tag key is a string with this shape "<country code>:<name>",
        // it's useful because we can traduce and get infos about the tag (an additive for example) in different languages without storing this data in the database
        this.key = tagKey
        this.type = type
        this.name = this.getFormattedTagKey()
        this.isInTaxonomy = false
        this.description = undefined
        this.wikidata = undefined
        this.vegetarian = undefined
        this.vegan = undefined
        this.fromPalmOil = undefined
        this.additivesClasses = undefined
        this.overexposureRisk = undefined
        this.populationCategories5pctPeopleRiskOverexposure = undefined
        this.populationCategories50pctPeopleRiskOverexposure = undefined
        this.country = undefined
        this.origins = undefined
        this.region = undefined
        this.countryCode = undefined

        if (autoUpdate) {
            this.updateWithTaxonomyInfos()
        }
    }

    getFormattedTagKey() {
        let tagName = this.getTagWithoutCountryCode(this.key);
        // Remove specials characters
        tagName = tagName.replace(/[-_]/g, " ");
        // First letter in upper case
        return tagName.replace(/^\w/, (c) => c.toUpperCase());
    }

    getTagWithoutCountryCode() {
        const splitTag = this.key.split(":");
        return splitTag[splitTag.length - 1];
    }

    getTagTaxonomyInfos() {
        if (!this.key || !this.type) return null
        const taxonomyFile = global[this.type];
        // Just clean the tag string
        const cleanedTag = this.key.trim().toLowerCase();

        return taxonomyFile[cleanedTag];
    }

    updateWithTaxonomyInfos() {
        try {
            const tagInfos = this.getTagTaxonomyInfos()
            if (!tagInfos) return

            const {
                name, // For all type of tag (specific to user language)
                description, // For all type of tag (specific to user language)
                wikidata, // For all type of tag
                vegetarian, // For ingredients, additives
                vegan, // For ingredients, additives
                from_palm_oil: fromPalmOil, // For ingredients, additives
                additives_classes: additivesClasses, // For additives
                efsa_evaluation_overexposure_risk: overexposureRisk, // For additives (tag string)
                efsa_evaluation_exposure_mean_greater_than_adi: populationCategories50pctPeopleRiskOverexposure, // For additives (tags string)
                efsa_evaluation_exposure_95th_greater_than_adi: populationCategories5pctPeopleRiskOverexposure, // For additives (tags string)
                country, // For categories
                origins, // For categories (tags string)
                region, // For categories (specific to user language)
                country_code_2: countryCode2, // For countries and origins
                official_country_code_2: officialCountryCode2 // For countries and origins
            } = tagInfos;

            this.name = name?.fr || this.name
            this.isInTaxonomy = !!tagInfos
            this.description = description?.fr
            this.wikidata = wikidata?.en
            this.vegetarian = vegetarian?.en
            this.vegan = vegan?.en
            this.fromPalmOil = fromPalmOil?.en
            this.additivesClasses = additivesClasses?.en?.split(",").map(additiveClass => new Tag(additiveClass, "additives_classes"))
            this.overexposureRisk = overexposureRisk?.en
            this.populationCategories50pctPeopleRiskOverexposure = populationCategories50pctPeopleRiskOverexposure?.en?.split(",")
            this.populationCategories5pctPeopleRiskOverexposure = populationCategories5pctPeopleRiskOverexposure?.en?.split(",")
            this.country = country?.en
            this.origins = origins?.en?.split(",").map(origin => new Tag(origin, "origins"))
            this.region = region?.fr
            this.countryCode = (officialCountryCode2?.en || countryCode2?.en)?.toLowerCase()

        } catch (error) {
            throw new OpenFoodFactsError(openFoodFactsErrors.getTagInfos);
        }
    }

    toJSON() {
        return {
            key: this.key,
            name: this.name,
            is_in_taxonomy: this.isInTaxonomy,
            description: this.description,
            wikidata: this.wikidata,
            vegetarian: this.vegetarian,
            vegan: this.vegan,
            from_palm_oil: this.fromPalmOil,
            additives_classes: this.additivesClasses?.map(additiveClass => additiveClass.toJSON()),
            overexposure_risk: this.overexposureRisk,
            population_categories_50pct_people_risk_overexposure: this.populationCategories50pctPeopleRiskOverexposure,
            population_categories_5pct_people_risk_overexposure: this.populationCategories5pctPeopleRiskOverexposure,
            country: this.country,
            origins: this.origins?.map(origin => origin.toJSON()),
            region: this.region,
            country_code: this.countryCode,
        }
    }
}

module.exports = {
    Tag
}