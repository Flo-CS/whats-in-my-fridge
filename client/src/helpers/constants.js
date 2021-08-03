const WIKIDATA_API_ENDPOINT = "https://www.wikidata.org/w/api.php";
const WIKIPEDIA_API_ENDPOINT = "https://fr.wikipedia.org/w/api.php";

const SORT_OPTIONS = {
    MODIFICATION_DATE: {name: "Date de modification", key: "MODIFICATION_DATE", defaultDirection: "desc"},
    NAME: {name: "Nom", key: "NAME", defaultDirection: "asc"},
    QUANTITY: {name: "Quantité", key: "QUANTITY", defaultDirection: "desc"},
    NUTRISCORE: {name: "Nutriscore", key: "NUTRISCORE", defaultDirection: "asc"},
    ECOSCORE: {name: "Ecoscore", key: "ECOSCORE", defaultDirection: "asc"},
    NOVA: {name: "Nova", key: "NOVA", defaultDirection: "asc"},
    RELEVANCE: {name: "Pertinence", key: "RELEVANCE", defaultDirection: "asc"},
};

const ACCENT_COLOR = "#2fae26";

const LETTER_SCORES_COLORS = ["#2d7e43", "#97ba38", "#f0ca0d", "#d57b1a", "#c53319"];


export {WIKIDATA_API_ENDPOINT, WIKIPEDIA_API_ENDPOINT, SORT_OPTIONS, ACCENT_COLOR, LETTER_SCORES_COLORS};