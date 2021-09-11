const {get} = require("lodash")

function generateHeatmap(elements, xPath, yPath, xLabels, yLabels, includeOthersValues = true, othersValuesLabel = "?") {
    if (includeOthersValues) {
        xLabels = xLabels.concat([othersValuesLabel])
        yLabels = yLabels.concat([othersValuesLabel])
    }

    // Initialize a 2 dimensions array filled with 0
    const data = new Array(yLabels.length).fill(0).map(() => new Array(xLabels.length).fill(0));

    for (const element of elements) {
        const xPathValue = get(element, xPath)
        const yPathValue = get(element, yPath)


        const xLabelsIndex = xLabels.includes(xPathValue) ? xLabels.indexOf(xPathValue) : xLabels.indexOf(othersValuesLabel)
        const yLabelsIndex = yLabels.includes(yPathValue) ? yLabels.indexOf(yPathValue) : yLabels.indexOf(othersValuesLabel)

        if (xLabelsIndex !== -1 && yLabelsIndex !== -1) {
            data[yLabelsIndex][xLabelsIndex] += 1;
        }
    }

    return {data, yLabels, xLabels};
}

module.exports = {
    generateHeatmap
}