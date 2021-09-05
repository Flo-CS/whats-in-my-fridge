function isValidScore(score, isLetterScore = false) {
    const validLetterScores = ["A", "B", "C", "D", "E"];
    const validNovaGroups = [1, 2, 3, 4];

    if (isLetterScore) {
        score = score?.toUpperCase();
        return validLetterScores.includes(score)
    }

    return validNovaGroups.includes(score)
}


module.exports = {isValidScore};