const {OPEN_FOOD_FACTS_API_ENDPOINT, OPEN_FOOD_FACTS_USEFUL_FIELDS} = require("./constants");
const axios = require("axios");
const _ = require("lodash");
const {OpenFoodFactsError, openFoodFactsErrors} = require("./errors");

async function getOFFdata(barcode) {

    const fields = OPEN_FOOD_FACTS_USEFUL_FIELDS.join(",");

    const response = await axios.get(
        `${OPEN_FOOD_FACTS_API_ENDPOINT}/product/${barcode}.json?fields=${fields}`
    ).catch(() => {
        throw new OpenFoodFactsError(openFoodFactsErrors.communication);
    });

    let productData = response.data.product;

    // 0 is status code for error
    if (response.data.status === 0)
        throw new OpenFoodFactsError(openFoodFactsErrors.noProductFound);

    return productData;
}


function letterScoreToScore(letter) {
    const letterConversions = {
        "a": 5,
        "b": 4,
        "c": 3,
        "d": 2,
        "e": 1
    };

    if (!_.isString(letter) || _.isNil(letter)) return;

    letter = letter.toLowerCase();
    return letterConversions[letter];
}

module.exports = {getOFFdata, letterScoreToScore};