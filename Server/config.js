const SERVER_PORT = 8080;
const OPEN_FOOD_FACTS_API_ENDPOINT = "https://world.openfoodfacts.org/api/v0";
const OPEN_FOOD_FACTS_USEFUL_FIELDS = ["brands", "brands_tags", "product_name", "image_url", "quantity",
    "nutriscore_grade", "nutriscore_score",
    "nova_group", "nova_groups_tags", "categories_tags", "ingredients", "ingredients_tags", "ingredients_analysis_tags",
    "nutriments", "nutrient_levels_tags",
    "additives_tags", "origins_tags", "brands_tags",
    "countries_tags", "traces_tags", "labels_tags", "serving_quantity", "allergens_tags", "ecoscore_grade",
    "ecoscore_score",];

const OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT = "https://world.openfoodfacts.org/data/taxonomies";
const OPEN_FOOD_FACTS_TAXONOMIES = ["categories", "additives", "additives_classes", "allergens", "brands", "countries",
    "ingredients",
    "ingredients_analysis", "languages", "nova_groups", "nutrient_levels"];

module.exports = {
    SERVER_PORT,
    OPEN_FOOD_FACTS_API_ENDPOINT,
    OPEN_FOOD_FACTS_USEFUL_FIELDS,
    OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT,
    OPEN_FOOD_FACTS_TAXONOMIES
};
