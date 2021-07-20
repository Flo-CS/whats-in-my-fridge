const _ = require("lodash");
const dayjs = require("dayjs");
require("dayjs/locale/fr");
const isBetween = require("dayjs/plugin/isBetween");
const {letterScoreToScore} = require("./product");

dayjs.extend(isBetween);

const timeUnitToTimeScale = {
    "year": "month",
    "month": "day"
};

class ProductsStats {

    constructor(products, startDate, endDate, timeUnit) {
        this.products = products;
        this.startDate = dayjs(startDate);
        this.endDate = dayjs(endDate);
        this.timeUnit = timeUnit;
        this.timeScale = timeUnitToTimeScale[timeUnit];

        this.presentProducts = this.getPresentsProductsByDate(this.startDate, this.timeUnit);

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
                nutriscore: this.getScoreFieldStats("nutriscore_grade", true),
                nova: this.getScoreFieldStats("nova_group"),
                ecoscore: this.getScoreFieldStats("ecoscore_grade", true),
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

    computeProductsAverageScoreFieldByDate(field, date, isLetterScore = false) {
        return _(this.getPresentsProductsByDate(date, this.timeScale))
            .map(product => {
                if (isLetterScore) {
                    return letterScoreToScore(product.data[field]);
                }
                return product.data[field];
            })
            .compact() // Removes all null, undefined values because it distorts the calculation
            .mean();
    }

    getProductsScoreFieldHistory(field, isLetterScore = false) {
        return _(this.requiredCalculationDates).map(requiredDate => {
            const averageScoreByDate = this.computeProductsAverageScoreFieldByDate(field, requiredDate, isLetterScore);

            return {date: requiredDate, average: averageScoreByDate};

        }).sortBy(average => average.date);
    }


    // Nova, ecoscore, nutriscore
    getScoreFieldStats(field, isLetterScore = false) {
        return {
            average_history: this.getProductsScoreFieldHistory(field, isLetterScore),
            current_average: this.computeProductsAverageScoreFieldByDate(field, dayjs(), isLetterScore),
        };
    }


    getLetterScoresHeatmap() {
        let xLabels, yLabels;
        xLabels = yLabels = ["A", "B", "C", "D", "E", "?"];

        // Initialize a 2D array filled with 0
        const data = new Array(yLabels.length).fill(0).map(() => new Array(xLabels.length).fill(0));

        for (const product of this.presentProducts) {

            const {nutriscore_grade, ecoscore_grade} = product.data;
            const nutriscore = nutriscore_grade?.toUpperCase();
            const ecoscore = ecoscore_grade?.toUpperCase();

            const xIndex = xLabels.includes(nutriscore) ? xLabels.indexOf(nutriscore) : xLabels.length - 1;
            const yIndex = yLabels.includes(ecoscore) ? yLabels.indexOf(ecoscore) : yLabels.length - 1;

            data[yIndex][xIndex] += 1;
        }

        return {xLabels, yLabels, data};

    }
}


module.exports = {ProductsStats};