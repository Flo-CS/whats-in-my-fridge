const _ = require("lodash");
const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");
const utc = require("dayjs/plugin/utc");
const {generateHeatmap} = require("./stats");
const {VALID_LETTER_SCORES, VALID_NOVA_GROUPS} = require("./open food facts/scores");

dayjs.extend(isBetween);
dayjs.extend(utc);

const timeGranularityToTimeScale = {
    "year": "month",
    "month": "day"
};

class ProductsStats {

    constructor(products, startDate, timeGranularity) {
        this.products = products;
        this.startDate = dayjs.utc(startDate);
        this.endDate = dayjs.utc(startDate).endOf(timeGranularity);
        this.timeGranularity = timeGranularity;
        this.timeScale = timeGranularityToTimeScale[timeGranularity];

        this.presentProducts = this.getPresentsProductsByDate(this.startDate, this.timeGranularity);
        this.oldPresentProducts = this.getPresentsProductsByDate(this.startDate.subtract(1, this.timeGranularity), this.timeGranularity)

        this.requiredCalculationDates = this.getRequiredCalculationDates();
    }


    getStats() {
        return {
            counts: {
                total: this.products.length,
                in_stock: this.presentProducts.length,
                out_of_stock: this.products.length - this.presentProducts.length,
                old_in_stock: this.oldPresentProducts.length,
                old_out_of_stock: this.products.length - this.oldPresentProducts.length,
            },
            scores_history: {
                nutriscore: this.getProductsScoreHistory("nutriscore"),
                nova: this.getProductsScoreHistory("nova"),
                ecoscore: this.getProductsScoreHistory("ecoscore"),
            },
            heatmaps: {
                nutriscore_ecoscore: generateHeatmap(this.presentProducts, "nutriscore.grade", "ecoscore.grade", VALID_LETTER_SCORES, VALID_LETTER_SCORES, false),
                nutriscore_nova: generateHeatmap(this.presentProducts, "nutriscore.grade", "nova.grade", VALID_LETTER_SCORES, VALID_NOVA_GROUPS, false),
                ecoscore_nova: generateHeatmap(this.presentProducts, "ecoscore.grade", "nova.grade", VALID_LETTER_SCORES, VALID_NOVA_GROUPS, false),
            }
        };
    }

    // List of all dates where we need to calculate stats
    getRequiredCalculationDates() {
        const dates = [];
        let currentDate = this.startDate;

        while (currentDate <= this.endDate) {
            dates.push(currentDate);
            currentDate = currentDate.add(1, this.timeScale).startOf(this.timeScale);
        }
        return dates;
    }

    getPresentsProductsByDate(date, timeScale) {
        return this.products.filter(product => {
            // Remove all products that had a quantity of 0 on the specified date
            return product.wasPresentOn(date, timeScale);
        });
    }

    computeProductsAverageScoreByDate(scoreName, date) {
        return _(this.getPresentsProductsByDate(date, this.timeScale))
            .map(product => {
                return product[scoreName].score
            })
            .compact() // Removes all null, undefined values because it distorts the calculation
            .mean();
    }

    getProductsScoreHistory(scoreName) {
        return _(this.requiredCalculationDates).map(date => {
            const averageScoreByDate = this.computeProductsAverageScoreByDate(scoreName, date);

            return {date: date, value: averageScoreByDate};

        }).sortBy(average => average.date);
    }
}


module.exports = {ProductsStats};