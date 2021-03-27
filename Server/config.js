const SERVER_PORT = 8080;
const OPEN_FOOD_FACTS_API_ENDPOINT = "https://world.openfoodfacts.org/api/v0";
const OPEN_FOOD_FACTS_USEFUL_FIELDS = ["product_name",
    "brands_tags",
    "quantity",
    "nutriscore_grade",
    "nutriscore_score",
    "nova_group",
    "nova_groups_tags",
    "image_url",
    "categories_tags",
    "labels_tags",
    "origins_tags",
    "countries_tags",
    "ingredients_text",
    "ingredients_tags",
    "allergens_tags",
    "traces_tags",
    "ingredients_analysis_tags",
    "additives_tags",
    "ecoscore_grade",
    "ecoscore_score",
    "nutrient_levels_tags",
    "serving_size",
    "nutriments",];

const DEFAULT_LANG_CODE = "fr";


module.exports = {
    SERVER_PORT,
    OPEN_FOOD_FACTS_API_ENDPOINT,
    OPEN_FOOD_FACTS_USEFUL_FIELDS,
    DEFAULT_LANG_CODE
};
