const _ = require("lodash");

function letterScoreToScore(letter) {
    const letterConversions = {
        "A": 5,
        "B": 4,
        "C": 3,
        "D": 2,
        "E": 1
    };

    if (!_.isString(letter) || _.isNil(letter)) return;

    letter = letter.toUpperCase();
    return letterConversions[letter];
}

module.exports = {letterScoreToScore};