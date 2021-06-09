const {OPEN_FOOD_FACTS_API_ENDPOINT, OPEN_FOOD_FACTS_USEFUL_FIELDS} = require("../config");
const axios = require("axios")
const _ = require("lodash")

async function getOFFdata(barcode) {

    const fields = OPEN_FOOD_FACTS_USEFUL_FIELDS.join(",");

    const openFoodFactsResponse = await axios.get(
        `${OPEN_FOOD_FACTS_API_ENDPOINT}/product/${barcode}.json?fields=${fields}`
    );

    let productData = openFoodFactsResponse.data.product;

    // We verify that the product exists and if we have a name for it in open food facts, 0 is status code for error
    if (openFoodFactsResponse.data.status === 0 || !productData.product_name) {
        return undefined
    } else {
        return productData
    }
}


function scoreGradeToScore(grade) {
    const gradeConversions = {
        "a": 5,
        "b": 4,
        "c": 3,
        "d": 2,
        "e": 1
    }

    if (!_.isString(grade) || _.isNil(grade)) return

    grade = grade.toLowerCase()
    return gradeConversions[grade]
}


module.exports = {getOFFdata, scoreGradeToScore}