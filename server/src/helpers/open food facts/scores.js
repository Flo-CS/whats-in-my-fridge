function isValidScore(score, isLetterScore = false) {

    if (isLetterScore) {
        score = score?.toUpperCase();
        return VALID_LETTER_SCORES.includes(score)
    }

    return VALID_NOVA_GROUPS.includes(score)
}


const VALID_LETTER_SCORES = ["A", "B", "C", "D", "E"];
const VALID_NOVA_GROUPS = [1, 2, 3, 4];


const LETTER_SCORE_CONVERSIONS = {
    "A": 1,
    "B": 2,
    "C": 3,
    "D": 4,
    "E": 5
}

module.exports = {isValidScore, VALID_LETTER_SCORES, VALID_NOVA_GROUPS, LETTER_SCORE_CONVERSIONS};