import {isInteger, isNil} from "lodash"

export function scoreToScoreGrade(score) {
    const gradeConversions = {
        1: "E",
        2: "D",
        3: "C",
        4: "B",
        5: "A"
    }

    if (!isInteger(score) || isNil(score)) return

    return gradeConversions[score]
}