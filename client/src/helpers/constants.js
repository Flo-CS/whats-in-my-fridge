const WIKIDATA_API_ENDPOINT = "https://www.wikidata.org/w/api.php";
const WIKIPEDIA_API_ENDPOINT = "https://fr.wikipedia.org/w/api.php";

const SORT_OPTIONS = {
    MODIFICATION_DATE: {label: "Date de modification", name: "MODIFICATION_DATE", direction: "desc"},
    NAME: {label: "Nom", name: "NAME", direction: "asc"},
    QUANTITY: {label: "Quantité", name: "QUANTITY", direction: "desc"},
    NUTRISCORE: {label: "Nutriscore", name: "NUTRISCORE", direction: "asc"},
    ECOSCORE: {label: "Ecoscore", name: "ECOSCORE", direction: "asc"},
    NOVA: {label: "Nova", name: "NOVA", direction: "asc"},
    RELEVANCE: {label: "Pertinence", name: "RELEVANCE", direction: "asc"},
};

const ACCENT_COLOR = "#2fae26";

const LETTER_SCORES_COLORS = ["#2d7e43", "#97ba38", "#f0ca0d", "#d57b1a", "#c53319"];


export {WIKIDATA_API_ENDPOINT, WIKIPEDIA_API_ENDPOINT, SORT_OPTIONS, ACCENT_COLOR, LETTER_SCORES_COLORS};