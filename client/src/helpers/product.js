import _ from "lodash"

export function scoreToScoreGrade(score) {
    const gradeConversions = {
        1: "E",
        2: "D",
        3: "C",
        4: "B",
        5: "A"
    }

    if (!_.isInteger(score) || _.isNil(score)) return

    return gradeConversions[score]
}