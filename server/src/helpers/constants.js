const path = require("path");
const OPEN_FOOD_FACTS_API_ENDPOINT = "https://world.openfoodfacts.org/api/v0";
const OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT = "https://world.openfoodfacts.org/data/taxonomies";
const OPEN_FOOD_FACTS_USEFUL_FIELDS = ["product_name",
    "brands_tags",
    "quantity",
    "nutriscore_grade",
    "nova_group",
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
    "nutriments"];

const OPEN_FOOD_FACTS_USEFUL_TAXONOMIES = [
    "categories",
    "additives_classes",
    "ingredients_analysis",
    "additives",
    "allergens",
    "ingredients",
    "countries",
    "origins",
    "labels",
    "brands"];

const OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH = path.join(__dirname, "./../../open food facts/taxonomies");
const OPEN_FOOD_FACTS_TRADUCTIONS_FILE_PATH = path.join(__dirname, "./../../open food facts/traductions.json");


const TAGS_CORRECTIONS = {
    "en:stabilizer": "en:stabiliser"
};

const NUTRIMENTS_KEYS = [
    "energy-kj",
    "energy-kcal",
    "fat",
    "saturated-fat",
    "sugars",
    "salt",
    "fiber",
    "iron",
    "proteins" // TODO: Add more
];


module.exports = {
    OPEN_FOOD_FACTS_API_ENDPOINT,
    OPEN_FOOD_FACTS_USEFUL_FIELDS,
    OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT,
    OPEN_FOOD_FACTS_USEFUL_TAXONOMIES,
    TAGS_CORRECTIONS,
    OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH,
    OPEN_FOOD_FACTS_TRADUCTIONS_FILE_PATH,
    NUTRIMENTS_KEYS
};
