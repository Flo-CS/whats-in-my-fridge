const axios = require("axios");
const path = require("path");
const jsonfile = require("jsonfile");
const {OPEN_FOOD_FACTS_TAXONOMIES, OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT} = require("./../config");

async function downloadAllTaxonomies() {
    for (const taxonomy of OPEN_FOOD_FACTS_TAXONOMIES) {
        const url = `${OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT}/${taxonomy}.json`;
        console.log(url);
        const response = await axios.get(url);

        jsonfile.writeFileSync(path.join(__dirname, `./../data/taxonomies/${taxonomy}.json`), response.data);

    }
}

async function getCategoriesTaxonomy(category) {

}

module.exports = {downloadAllTaxonomies};