import {isInteger, isNil, orderBy, reverse} from "lodash";

function truncateString(str, size) {
    if (str.length <= size) return str;

    return str.slice(0, size) + "...";
}

function mapValueToRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
}

function cleanScoreField(score, isLetterScore = false) {
    const validLetterScores = ["a", "b", "c", "d", "e"];
    const validNovaGroups = [1, 2, 3, 4];

    if (isLetterScore) {
        score = score?.toLowerCase();
        return validLetterScores.includes(score) ? score : "unknown";
    }

    return validNovaGroups.includes(score) ? score : "unknown";
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


function sortProducts(products, sortName, sortDirection) {
    switch (sortName) {
        case "QUANTITY":
            return orderBy(products, ["quantity"], [sortDirection]);
        case "BARCODE":
            return orderBy(products, ["barcode"], [sortDirection]);
        case "NAME":
            return orderBy(products, ["data.product_name"], [sortDirection]);
        default:
            if (sortDirection === "desc")
                return reverse(products.slice());
            return products;
    }
}


export function scoreToLetterScore(score) {
    const letterScoreConversions = {
        1: "E",
        2: "D",
        3: "C",
        4: "B",
        5: "A"
    };

    if (!isInteger(score) || isNil(score)) return;

    return letterScoreConversions[score];
}

const letterScoresColors = ["#2d7e43", "#97ba38", "#f0ca0d", "#d57b1a", "#c53319"];


export {
    truncateString,
    asyncThunkErrorWrapper,
    letterScoresColors,
    cleanScoreField,
    mapValueToRange,
    sortProducts
};