import axios from "axios";
import {WIKIDATA_API_ENDPOINT, WIKIPEDIA_API_ENDPOINT} from "../config";

async function getWikidataDataByQID(qid) {
    const response = await axios.get(WIKIDATA_API_ENDPOINT, {
        params: {
            action: "wbgetentities",
            format: "json",
            ids: qid,
            props: "datatype|info|sitelinks",
            uselang: "fr",
            origin: "*"
        }
    }).catch(() => {
        return null
    })

    return response.data
}


async function getWikipediaDataByTitle(title) {
    const response = await axios.get(WIKIPEDIA_API_ENDPOINT, {
        params: {
            action: "query",
            format: "json",
            uselang: "fr",
            prop: "extracts|description",
            titles: title,
            indexpageids: 1,
            redirects: 1,
            exintro: 1,
            explaintext: 1,
            exsentences: 3,
            origin: "*"
        }
    }).catch(() => {
        return null
    })

    return response.data
}

async function getWikipediaPageDataByWikidataQID(wikidataQID) {
    const wikidataData = await getWikidataDataByQID(wikidataQID)

    if (!wikidataData.success)
        return null

    const wikidataTitle = wikidataData?.entities?.[wikidataQID]?.sitelinks?.frwiki?.title

    const wikipediaData = await getWikipediaDataByTitle(wikidataTitle)

    const wikipediaPageID = wikipediaData?.query?.pageids[0]
    if (wikipediaPageID === -1)
        return null

    return wikipediaData?.query?.pages[wikipediaPageID]
}

export {getWikipediaPageDataByWikidataQID}