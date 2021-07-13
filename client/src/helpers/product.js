import {isInteger, isNil} from "lodash"

export function scoreToLetterScore(score) {
    const letterScoreConversions = {
        1: "E",
        2: "D",
        3: "C",
        4: "B",
        5: "A"
    }

    if (!isInteger(score) || isNil(score)) return

    return letterScoreConversions[score]
}