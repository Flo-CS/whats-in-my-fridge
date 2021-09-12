import dayjs from "dayjs";
import {deburr, last, orderBy, reverse} from "lodash";

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
        case "MODIFICATION_DATE":
            return orderBy(products, [(product) => dayjs(last(product.presences).date)], [sortDirection]);
        case "NAME":
            return orderBy(products, [(product) => deburr(product.name)], [sortDirection]);
        case "QUANTITY":
            return orderBy(products, ["quantity"], [sortDirection]);
        case "NUTRISCORE":
            return orderBy(products, ["nutriscore.grade"], [sortDirection]);
        case "ECOSCORE":
            return orderBy(products, ["ecoscore.grade"], [sortDirection]);
        case "NOVA":
            return orderBy(products, ["nova.grade"], [sortDirection]);
        case "RELEVANCE":
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