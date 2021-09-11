function isValidScore(score, isLetterScore = false) {

    if (isLetterScore) {
        score = score?.toUpperCase();
        return VALID_LETTER_SCORES.includes(score)
    }

    return VALID_NOVA_GROUPS.includes(score)
}


const VALID_LETTER_SCORES = ["A", "B", "C", "D", "E"];
const VALID_NOVA_GROUPS = [1, 2, 3, 4];


module.exports = {isValidScore, VALID_LETTER_SCORES, VALID_NOVA_GROUPS};