const _ = require("lodash");
const dayjs = require("dayjs");
require("dayjs/locale/fr");
const isBetween = require("dayjs/plugin/isBetween");
const {getTagName} = require("./taxonomies");

dayjs.extend(isBetween);

class Stats {

    constructor(products, startDate, endDate) {
        this.products = products;
        this.startDate = dayjs(startDate);
        this.endDate = dayjs(endDate);

        // Only keep products whose quantity has been at least once greater than or equal to 1 (presents products) during the specified period
        this.filteredProducts = products.filter(product => {
            return product.presences.some(presence => {
                return dayjs(presence.date).isBetween(startDate, endDate, null, "[]") && presence.value === true;
            });
        });

    }

    computeStats() {
        return {
            total_count: this.filteredProducts.length,
            in_stock_count: this.filteredProducts.filter(product => product.quantity > 0).length,
            out_of_stock_count: this.filteredProducts.filter(product => product.quantity <= 0).length,
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
        const flattenProductsTagsField = _(this.filteredProducts)
            .map(product => product.data[tagsField] || [])
            .flatten();

        return _(flattenProductsTagsField)
            .map(tag => getTagName(tag, tagsField))
            .groupBy("name")
            .map((items) => {
                return {
                    ...items[0],
                    count: items.length
                };
            })
            .value();
    }


    // Nutriscore / nova / ecoscore
    computeScoreFieldStats(scoreField) {
        // List of all dates where we need to calculate stats for the score
        const requiredCalculationDates = _(this.filteredProducts)
            .map(product => product.presences)
            .flatten()
            .map(presence => dayjs(presence.date))
            .uniqBy(date => date.format("DD/MM/YYYY hh:mm"))
            .value();

        const averageHistory = _(requiredCalculationDates).map(requiredDate => {
            const averageScoreByDate = _(this.filteredProducts).filter(product => {
                // Remove all products that had a quantity of 0 on the required date
                return product.presences.find((currentPresence, i, presences) => {
                    const nextPresence = presences[i + 1];

                    const presenceStartDate = dayjs(currentPresence.date);
                    const presenceEndDate = nextPresence ? dayjs(nextPresence.date) : dayjs();


                    return requiredDate.isBetween(presenceStartDate, presenceEndDate, null, "[)")
                        && currentPresence.value === true
                        && product.data[scoreField];
                });

            }).meanBy(product => product.data[scoreField]);

            return {date: requiredDate, average: averageScoreByDate};

        }).sortBy(average => average.date);

        const currentAverage = _(this.filteredProducts)
            .filter(product => product.quantity > 0 && product.data[scoreField])
            .meanBy((product) => product.data[scoreField]);

        return {
            current_average: currentAverage,
            average_history: averageHistory
        };
    }
}


module.exports = {Stats};