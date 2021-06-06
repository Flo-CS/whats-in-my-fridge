const _ = require("lodash");
const dayjs = require("dayjs");
require("dayjs/locale/fr");
const isBetween = require("dayjs/plugin/isBetween");
const {scoreGradeToScore} = require("./product");
const {getTagName} = require("./taxonomies");

dayjs.extend(isBetween);

class ProductsStats {

    constructor(products, startDate, endDate) {
        this.products = products;
        this.startDate = dayjs(startDate);
        this.endDate = dayjs(endDate);

        // Only keep products whose quantity has been at least once greater than or equal to 1 (presents products) during the specified period
        this.filteredProducts = products.filter(product => {
            return product.wasPresentBetween(startDate, endDate)
        });

    }

    getStats() {
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
            nutriscore: this.getScoreFieldStats("nutriscore_grade", true),
            nova: this.getScoreFieldStats("nova_group"),
            ecoscore: this.getScoreFieldStats("ecoscore_grade", true)
        };
    }

    getFlattenProductsTagsField(field) {
        return _(this.filteredProducts)
            .map(product => product.data[field] || [])
            .flatten();
    }

    // All fields preceded with _tags
    computeTagsFieldStats(field) {
        const fieldFlattenProductsTags = this.getFlattenProductsTagsField(field)

        return _(fieldFlattenProductsTags)
            .map(tag => getTagName(tag, field))
            .groupBy("name")
            .map((items) => {
                return {
                    ...items[0],
                    count: items.length
                };
            })
            .value();
    }

    // List of all dates where we need to calculate stats
    getRequiredCalculationDates() {
        return _(this.filteredProducts)
            .map(product => product.presences)
            .flatten()
            .map(presence => dayjs(presence.date))
            .value();
    }

    getPresentsProductsByDate(date) {
        return _(this.filteredProducts).filter(product => {
            // Remove all products that had a quantity of 0 on the specified date
            return product.wasPresentOn(date)
        })
    }

    computeProductsAverageScoreFieldByDate(field, date, isGrade = false) {
        return this.getPresentsProductsByDate(date)
            .map(product => {
                if (isGrade) {
                    return scoreGradeToScore(product.data[field])
                }
                return product.data[field]
            })
            .compact() // Removes all null, undefined values because it distorts the calculation
            .mean();
    }

    computeProductsScoreFieldHistory(field, isGrade = false) {
        const requiredCalculationDates = this.getRequiredCalculationDates()

        return _(requiredCalculationDates).map(requiredDate => {
            const averageScoreByDate = this.computeProductsAverageScoreFieldByDate(field, requiredDate, isGrade)

            return {date: requiredDate, average: averageScoreByDate};

        }).sortBy(average => average.date);
    }


    // Nova, ecoscore, nutriscore
    getScoreFieldStats(field, isGrade=false) {
        return {
            average_history: this.computeProductsScoreFieldHistory(field, isGrade),
            current_average: this.computeProductsAverageScoreFieldByDate(field, dayjs(), isGrade),
        };
    }



}


module.exports = {ProductsStats: ProductsStats};