const SERVER_PORT = 8080;
const OPEN_FOOD_FACTS_API_ENDPOINT = "https://world.openfoodfacts.org/api/v0";
const OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT = "https://world.openfoodfacts.org/data/taxonomies";
const OPEN_FOOD_FACTS_USEFUL_FIELDS = ["product_name",
    "brands_tags",
    "quantity",
    "nutriscore_grade",
    "nova_group",
    "nova_groups_tags",
    "image_small_url",
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
    "nutrient_levels",
    "serving_size",
    "nutriments",];

const OPEN_FOOD_FACTS_USEFUL_TAXONOMIES = [
    "categories",
    "additives_classes",
    "ingredients_analysis",
    "nova_groups",
    "additives",
    "allergens",
    "ingredients",
    "countries",
    "origins",
    "labels"];


module.exports = {
    SERVER_PORT,
    OPEN_FOOD_FACTS_API_ENDPOINT,
    OPEN_FOOD_FACTS_USEFUL_FIELDS,
    OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT,
    OPEN_FOOD_FACTS_USEFUL_TAXONOMIES
};
