const fs = require("node:fs");
const thaiTranslation = require("./en.json");
const originalTranslation = require("./original.json");

// contains Thai letter in name
const badNames = Object.keys(thaiTranslation).filter((key) =>
    /[\u0E00-\u0E7F]/.test(key)
);

const missings = Object.keys(originalTranslation).filter(
    (key) => !Object.keys(thaiTranslation).includes(key)
);

function getCharacterCount(string) {
    return string.reduce((accumulating, char) => {
        if (!accumulating[char]) {
            accumulating[char] = 1;
            return;
        }
        accumulating[char] += 1;
    });
}

// const missingCharacterCount = getCharacterCount(string);
// const badNamesCharacterCount = getCharacterCount(string);

fs.writeFileSync("./ignored/missings.json", JSON.stringify(missings));
fs.writeFileSync("./ignored/bad-names.json", JSON.stringify(badNames));
