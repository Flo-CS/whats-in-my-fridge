// TODO: Only for dev
import dayjs from "dayjs";
import "dayjs/locale/fr";


const WIKIDATA_API_ENDPOINT = "https://www.wikidata.org/w/api.php";
const WIKIPEDIA_API_ENDPOINT = "https://fr.wikipedia.org/w/api.php";

dayjs.locale("fr");

export {WIKIDATA_API_ENDPOINT, WIKIPEDIA_API_ENDPOINT};