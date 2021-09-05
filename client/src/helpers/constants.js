export const WIKIDATA_API_ENDPOINT = "https://www.wikidata.org/w/api.php";
export const WIKIPEDIA_API_ENDPOINT = "https://fr.wikipedia.org/w/api.php";

export const SORT_OPTIONS = {
    MODIFICATION_DATE: {name: "Date de modification", key: "MODIFICATION_DATE", defaultDirection: "desc"},
    NAME: {name: "Nom", key: "NAME", defaultDirection: "asc"},
    QUANTITY: {name: "Quantité", key: "QUANTITY", defaultDirection: "desc"},
    NUTRISCORE: {name: "Nutriscore", key: "NUTRISCORE", defaultDirection: "asc"},
    ECOSCORE: {name: "Ecoscore", key: "ECOSCORE", defaultDirection: "asc"},
    NOVA: {name: "Nova", key: "NOVA", defaultDirection: "asc"},
    RELEVANCE: {name: "Pertinence", key: "RELEVANCE", defaultDirection: "asc"},
};

export const LETTER_SCORES_COLORS = {"A": "#2d7e43", "B": "#97ba38", "C": "#f0ca0d", "D": "#d57b1a", "E": "#c53319"};
export const NOVA_COLORS = {1: "#00ac00", 2: "#ffcd00", 3: "#ff6600", 4: "#ff0000"};

export const PATHS = {
    HOME: "/",
    PROFILE: "/profile",
    STATS: "/stats",
    PRODUCT_DETAILS: (barcode) => `/products/${barcode}`,
    REGISTER: "/register",
    LOGIN: "/login"
};


export const KJ_TO_KCAL_FACTOR = 0.2388;

export const ELEMENT_COLORS = {
    PRIMARY: "#2FAE26",
    SECONDARY: "#F2F2F2"
}

export const FONT_COLORS = {
    LIGHT_GREY: "#808080",
    DARK_GREY: "#404040",
    WHITE: "#ffffff",
    DARK: "#000000"

}

export const FONT_SIZES = {
    NORMAL: "0.875rem",
    LITTLE: "0.75rem",
    MEDIUM: "1rem"
}
