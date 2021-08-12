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

const USEFUL_NUTRIMENTS_KEYS = [
    "alcohol",
    "biotin",
    "caffeine",
    "calcium",
    "chloride",
    "chromium",
    "copper",
    "energy-kcal",
    "energy-kj",
    "fat",
    "fiber",
    "fluoride",
    "fructose",
    "fruits-vegetables-nuts",
    "glucose",
    "iodine",
    "iron",
    "lactose",
    "magnesium",
    "maltose",
    "manganese",
    "omega-3-fat",
    "omega-6-fat",
    "omega-9-fat",
    "pantothenic-acid",
    "ph",
    "phosphorus",
    "potassium",
    "proteins",
    "salt",
    "saturated-fat",
    "selenium",
    "sodium",
    "sucrose",
    "sugars",
    "taurine",
    "trans-fat",
    "vitamin-a",
    "vitamin-b1",
    "vitamin-b2",
    "vitamin-b6",
    "vitamin-b9",
    "vitamin-b12",
    "vitamin-c",
    "vitamin-d",
    "vitamin-e",
    "vitamin-k",
    "zinc",
    // TODO: Add more
];


module.exports = {
    OPEN_FOOD_FACTS_API_ENDPOINT,
    OPEN_FOOD_FACTS_USEFUL_FIELDS,
    OPEN_FOOD_FACTS_TAXONOMIES_ENDPOINT,
    OPEN_FOOD_FACTS_USEFUL_TAXONOMIES,
    TAGS_CORRECTIONS,
    OPEN_FOOD_FACTS_TAXONOMIES_FILES_PATH,
    OPEN_FOOD_FACTS_TRADUCTIONS_FILE_PATH,
    USEFUL_NUTRIMENTS_KEYS
};
