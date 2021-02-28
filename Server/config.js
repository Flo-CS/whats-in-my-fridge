const PORT = 8080;
const API_ENDPOINT = "/api";
const OPEN_FOOD_FACTS_API_ENDPOINT = "https://world.openfoodfacts.org/api/v0";
const USEFUL_OPEN_FOOD_FACTS_FIELDS = ["brands", "brands_tags", "product_name", "image_url", "quantity",
    "nutriscore_grade", "nutriscore_score",
    "nova_group", "categories_tags", "ingredients_tags", "nutriments", "additives_tags", "origins_tags", "brands_tags",
    "countries_tags", "traces_tags", "labels_tags", "serving_quantity", "allergens_tags", "ecoscore_grade",
    "ecoscore_score"];

module.exports = {
    PORT,
    API_ENDPOINT,
    OPEN_FOOD_FACTS_API_ENDPOINT,
    USEFUL_OPEN_FOOD_FACTS_FIELDS
};
