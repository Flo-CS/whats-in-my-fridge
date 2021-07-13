// TODO: Only for dev
import dayjs from "dayjs"
import "dayjs/locale/fr"

const hostname = window.location.hostname;
const SERVER_API_ENDPOINT = `http://${hostname}:8080/api`;

dayjs.locale("fr")


const WIKIDATA_API_ENDPOINT = "https://www.wikidata.org/w/api.php"
const WIKIPEDIA_API_ENDPOINT = "https://fr.wikipedia.org/w/api.php?"

export {SERVER_API_ENDPOINT, WIKIDATA_API_ENDPOINT, WIKIPEDIA_API_ENDPOINT};