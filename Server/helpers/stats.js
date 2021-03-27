const _ = require("lodash");
const dayjs = require("dayjs");
require("dayjs/locale/fr");
const isBetween = require("dayjs/plugin/isBetween");
const {getTagName} = require("./taxonomies");
const {DEFAULT_LANG_CODE} = require("../config");

dayjs.extend(isBetween);
dayjs.locale("fr");


class Stats {
    constructor(products, startTimestamp, endTimestamp, langCode = DEFAULT_LANG_CODE) {
        this.products = products;
        this.startTimestamp = dayjs.unix(startTimestamp);
        this.endTimestamp = dayjs.unix(endTimestamp);
        this.langCode = langCode;

        // Keep only those products whose quantity has been at least once greater than or equal to 1 during the specified period
        this.rangeFilteredProducts = products.filter((product) => {
            const presencesInTimestampRange = product.presences.filter(presence => {
                const presenceTimestamp = dayjs.unix(presence[0]);

                return presenceTimestamp.isBetween(this.startTimestamp, this.endTimestamp, null, "[]");
            });
            return presencesInTimestampRange.some(presence => presence[1] >= 1);

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

        // List of all timestamps where we need to calculate average for the score
        const flattenProductsPresencesDate = _(this.rangeFilteredProducts)
            .map(product => product.presences)
            .flatten()
            .map(presence => dayjs.unix(presence[0]))
            .uniqBy(date => date.format('DD/MM/YYYY HH:mm'))
            .sort()
            .value();


        const averageHistory = _(flattenProductsPresencesDate).map(date => {
            // Remove all products that had a quantity of 0 on the specified date (quantity filtered products)
            const productsAverageScoreByDate = _(this.rangeFilteredProducts).filter(product => {
                for (let i = 0; i < product.presences.length; i++) {
                    const nextPresence = product.presences[i + 1];
                    const currentPresence = product.presences[i];

                    const presenceStartDate = dayjs.unix(currentPresence[0]);
                    const presenceEndDate = nextPresence ? dayjs.unix(nextPresence[0]) : dayjs();

                    if (date.isBetween(presenceStartDate, presenceEndDate, null, "[)") && currentPresence[1] > 0 && product.data[scoreField]) {
                        return true;
                    }
                }
            }).meanBy(product => product.data[scoreField]);

            return [
                date.unix(),
                productsAverageScoreByDate
            ];
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