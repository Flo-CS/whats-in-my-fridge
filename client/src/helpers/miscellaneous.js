import dayjs from "dayjs";
import {deburr, isNil, last, orderBy, reverse, sum} from "lodash";
import {SORT_OPTIONS} from "./constants";

function truncateString(str, size) {
    if (str.length <= size) return str;

    return str.slice(0, size) + "...";
}

function mapValueToRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
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
        case SORT_OPTIONS.MODIFICATION_DATE.key:
            return orderBy(products, [(product) => dayjs(last(product.presences).date)], [sortDirection]);
        case SORT_OPTIONS.NAME.key:
            return orderBy(products, [(product) => deburr(product.name)], [sortDirection]);
        case SORT_OPTIONS.QUANTITY.key:
            return orderBy(products, ["quantity"], [sortDirection]);
        case SORT_OPTIONS.NUTRISCORE.key:
            return orderBy(products, ["nutriscore.grade"], [sortDirection]);
        case SORT_OPTIONS.ECOSCORE.key:
            return orderBy(products, ["ecoscore.grade"], [sortDirection]);
        case SORT_OPTIONS.NOVA.key:
            return orderBy(products, ["nova.grade"], [sortDirection]);
        case SORT_OPTIONS.COMBINED_SCORES.key:
            return orderBy(products, (product) => {
                const scores = [product.nutriscore.score, product.ecoscore.score, product.nova.score]
                const filteredScores = scores.filter(score => !isNil(score))
                return sum(scores) / filteredScores.length // Sum all the scores with a real value and divide the result by the number of real scores
            }, [sortDirection])
        case SORT_OPTIONS.RELEVANCE.key:
            // There is no need to sort because fuse.js already does it with the match score.
            if (sortDirection === "desc")
                return reverse(products.slice());
            return products;
        default:
            return products
    }
}


export {
    truncateString,
    asyncThunkErrorWrapper,
    mapValueToRange,
    sortProducts
};