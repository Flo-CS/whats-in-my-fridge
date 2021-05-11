const _ = require("lodash");
const dayjs = require("dayjs");
require("dayjs/locale/fr");
const isBetween = require("dayjs/plugin/isBetween");
const {getTagName} = require("./taxonomies");
const {DEFAULT_LANG_CODE, DATE_FORMAT} = require("../config");

dayjs.extend(isBetween);


class Stats {
    constructor(products, startDate, endDate, langCode = DEFAULT_LANG_CODE) {
        this.products = products;
        this.startDate = dayjs(startDate, DATE_FORMAT);
        this.endDate = dayjs(endDate, DATE_FORMAT);
        this.langCode = langCode;

        // Keep only those products whose quantity has been at least once greater than or equal to 1 during the specified period
        this.rangeFilteredProducts = products.filter((product) => {
            const presencesInDateRange = product.presences.filter(presence => {
                const presenceDate = dayjs(presence[0], DATE_FORMAT);

                return presenceDate.isBetween(this.startDate, this.endDate, null, "[]");
            });
            return presencesInDateRange.some(presence => presence[1] >= 1);

        });
    }

    computeStats() {
        return {
            total_count: this.rangeFilteredProducts.length,
            in_stock_count: this.rangeFilteredProducts.filter(product => product.quantity > 0).length,
            out_of_stock_count: this.rangeFilteredProducts.filter(product => product.quantity <= 0).length,
            categories: this.computeTagsFieldStats("categories_tags"),
            additives: this.computeTagsFieldStats("additives_tags"),
            labels: this.computeTagsFieldStats("labels_tags"),
            origins: this.computeTagsFieldStats("origins_tags"),
            ingredients_analysis: this.computeTagsFieldStats("ingredients_analysis_tags"),
            nutrients_levels: this.computeTagsFieldStats("nutrient_levels_tags"),
            nutriscore: this.computeScoreFieldStats("nutriscore_score"),
            nova: this.computeScoreFieldStats("nova_group"),
            ecoscore: this.computeScoreFieldStats("ecoscore_score")
        };
    }

    // All fields preceded with _tags
    computeTagsFieldStats(tagsField) {
        const flattenProductsTagsField = _(this.rangeFilteredProducts).map(product => product.data[tagsField] || []).flatten().value();

        return _(flattenProductsTagsField)
            .map(tag => getTagName(tag, tagsField, this.langCode))
            .groupBy("name")
            .map((items) => {
                return {
                    ...items[0],
                    count: items.length
                };
            })
            .value();
    }

    // Nutriscore / Nova / Ecoscore
    computeScoreFieldStats(scoreField) {

        // List of all dates where we need to calculate average for the score
        const flattenProductsPresencesDate = _(this.rangeFilteredProducts)
            .map(product => product.presences)
            .flatten()
            .map(presence => dayjs(presence[0], DATE_FORMAT))
            .uniqBy(date => date.format(DATE_FORMAT))
            .value();

        console.log(flattenProductsPresencesDate.map(presence => presence.format(DATE_FORMAT)));

        const averageHistory = _(flattenProductsPresencesDate).map(date => {
            // Remove all products that had a quantity of 0 on the specified date (quantity filtered products)
            const productsAverageScoreByDate = _(this.rangeFilteredProducts).filter(product => {
                for (let i = 0; i < product.presences.length; i++) {
                    const nextPresence = product.presences[i + 1];
                    const currentPresence = product.presences[i];

                    const presenceStartDate = dayjs(currentPresence[0], DATE_FORMAT);
                    const presenceEndDate = nextPresence ? dayjs(nextPresence[0], DATE_FORMAT) : dayjs();

                    if (date.isBetween(presenceStartDate, presenceEndDate, null, "[)")
                        && currentPresence[1] === true
                        && product.data[scoreField]) {

                        console.log(date.format(DATE_FORMAT), presenceStartDate.format(DATE_FORMAT), presenceEndDate.format(DATE_FORMAT), currentPresence);
                        return true;
                    }
                }
            }).meanBy(product => product.data[scoreField]);

            return {t: date.format(DATE_FORMAT), v: productsAverageScoreByDate};
        });

        const average = _(this.rangeFilteredProducts)
            .filter(product => product.quantity > 0 && product.data[scoreField])
            .meanBy((product) => product.data[scoreField]);

        return {
            average,
            average_history: averageHistory
        };
    }
}


module.exports = {Stats};