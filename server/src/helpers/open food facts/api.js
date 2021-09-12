const {OPEN_FOOD_FACTS_API_ENDPOINT, OPEN_FOOD_FACTS_USEFUL_FIELDS} = require("../constants");
const axios = require("axios");
const {OpenFoodFactsError, openFoodFactsErrors} = require("../errors");

async function fetchOFFData(barcode) {

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


module.exports = {fetchOFFData};