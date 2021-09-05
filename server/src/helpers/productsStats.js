const _ = require("lodash");
const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");
const utc = require("dayjs/plugin/utc");

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

        this.requiredCalculationDates = this.getRequiredCalculationDates();
    }


    getStats() {
        return {
            stock: {
                total_count: this.products.length,
                in_stock_count: this.presentProducts.length,
                out_of_stock_count: this.products.length - this.presentProducts.length,
            },
            scores: {
                nutriscore: this.getScoreStats("nutriscore", true),
                nova: this.getScoreStats("nova"),
                ecoscore: this.getScoreStats("ecoscore", true),
            },
            specifics: {
                letter_scores_heatmap: this.getLetterScoresHeatmap()
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
        return _(this.products).filter(product => {
            // Remove all products that had a quantity of 0 on the specified date
            return product.wasPresentOn(date, timeScale);
        }).value();
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
        return _(this.requiredCalculationDates).map(requiredDate => {
            const averageScoreByDate = this.computeProductsAverageScoreByDate(scoreName, requiredDate);

            return {date: requiredDate, value: averageScoreByDate};

        }).sortBy(average => average.date);
    }


    // Nova, ecoscore, nutriscore
    getScoreStats(scoreName) {
        return {
            average_history: this.getProductsScoreHistory(scoreName),
            current_average: this.computeProductsAverageScoreByDate(scoreName, dayjs.utc()),
        };
    }


    getLetterScoresHeatmap() {
        let xLabels, yLabels;
        xLabels = yLabels = ["A", "B", "C", "D", "E", "?"];

        // Initialize a 2D array filled with 0
        const data = new Array(yLabels.length).fill(0).map(() => new Array(xLabels.length).fill(0));

        for (const product of this.presentProducts) {

            const {nutriscore, ecoscore} = product;

            const xIndex = nutriscore.grade ? nutriscore.score - 1 : xLabels.length - 1;
            const yIndex = ecoscore.grade ? ecoscore.score - 1 : yLabels.length - 1;

            data[yIndex][xIndex] += 1;
        }

        return {xLabels, yLabels, data};

    }
}


module.exports = {ProductsStats};