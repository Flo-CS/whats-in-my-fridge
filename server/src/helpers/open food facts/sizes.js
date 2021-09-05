const convert = require("convert-units");
const {SIZE_REGEX} = require("./../constants");
const {DEFAULT_UNITS} = require("../constants");

function convertValueToBaseUnit(value, from) {
    try {
        from = from.toLowerCase()

        const unitMeasure = convert().describe(from).measure

        const result = convert(value).from(from).to(DEFAULT_UNITS[unitMeasure])

        return [result, DEFAULT_UNITS[unitMeasure], true]
    } catch {
        return [value, from, false]
    }
}


function parseSizeString(sizeString) {
    const sizeGroups = sizeString?.match(SIZE_REGEX)?.groups

    const sizeValue = sizeGroups?.value?.replace(/,/g, '.') // To parse number with comma correctly

    return [
        parseFloat(sizeValue) || null,
        sizeGroups?.unit || null
    ]
}

module.exports = {
    convertValueToBaseUnit,
    parseSizeString
}