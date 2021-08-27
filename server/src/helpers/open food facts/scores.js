const _ = require("lodash");

function letterScoreToScore(letter) {
    const letterConversions = {
        "A": 1,
        "B": 2,
        "C": 3,
        "D": 4,
        "E": 5
    };

    if (!_.isString(letter) || _.isNil(letter)) return;

    letter = letter.toUpperCase();
    return letterConversions[letter];
}

module.exports = {letterScoreToScore};