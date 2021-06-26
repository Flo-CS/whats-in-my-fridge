// TODO: Only for dev
import dayjs from "dayjs"
import "dayjs/locale/fr"

const hostname = window.location.hostname;
const SERVER_API_ENDPOINT = `http://${hostname}:8080/api`;

dayjs.locale("fr")
export {SERVER_API_ENDPOINT};