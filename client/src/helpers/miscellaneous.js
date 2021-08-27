import dayjs from "dayjs";
import {deburr, isInteger, isNil, last, orderBy, reverse} from "lodash";

function truncateString(str, size) {
    if (str.length <= size) return str;

    return str.slice(0, size) + "...";
}

function mapValueToRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
}

function formatScore(score, isLetterScore = false) {
    const validLetterScores = ["A", "B", "C", "D", "E"];
    const validNovaGroups = [1, 2, 3, 4];

    if (isLetterScore) {
        score = score?.toUpperCase();
        return validLetterScores.includes(score) ? score : "?";
    }

    return validNovaGroups.includes(score) ? score : "?";
}


const asyncThunkErrorWrapper = async (asyncApiCallFunc, rejectWithValue) => {
    try {
        const response = await asyncApiCallFunc();
        return response.data;
    } catch (error) {
        if (!error.response)
            throw error;

        return rejectWithValue(error.response.data);
    }
};


function sortProducts(products, sortKey, sortDirection) {
    switch (sortKey) {
        case "MODIFICATION_DATE":
            return orderBy(products, [(product) => dayjs(last(product.presences).date)], [sortDirection]);
        case "NAME":
            return orderBy(products, [(product) => deburr(product.data.product_name)], [sortDirection]);
        case "QUANTITY":
            return orderBy(products, ["quantity"], [sortDirection]);
        case "NUTRISCORE":
            return orderBy(products, ["data.nutriscore_grade"], [sortDirection]);
        case "ECOSCORE":
            return orderBy(products, ["data.ecoscore_grade"], [sortDirection]);
        case "NOVA":
            return orderBy(products, ["data.nova_group"], [sortDirection]);
        case "RELEVANCE":
            // There is no need to sort because fuse.js already does it with the match score.
            if (sortDirection === "desc")
                return reverse(products.slice());
            return products;
        default:
            return products
    }
}


export function scoreToLetterScore(score) {
    const letterScoreConversions = {
        5: "E",
        4: "D",
        3: "C",
        2: "B",
        1: "A"
    };

    if (!isInteger(score) || isNil(score)) return;

    return letterScoreConversions[score];
}


export {
    truncateString,
    asyncThunkErrorWrapper,
    formatScore,
    mapValueToRange,
    sortProducts
};