import fs, { read } from "fs"
import { createRequire } from "module"
const require = createRequire(import.meta.url)

const readResult = require("./ignored/result.json")
const translationFile = require("./en.json")

let bad = false

function verboseLogGoodTranslation(key, { translation, directory }) {
    console.debug(
        `Good translation of ${key}: ${translation} from ${directory}`,
    )
}

function logBadTranslation(key, arr) {
    console.error(
        `: Bad translation of ${key} has ${arr.length} translations: ${arr.map(
            ({ translation, directory }, index) => {
                return `\n  ${translation} from ${directory}`
            },
        )}`,
    )
}

Object.entries(readResult).forEach(([key, translations]) => {
    if (translations.length != 1) {
        logBadTranslation()
    } else {
        verboseLogGoodTranslation(key, translations[0])
    }
})

if (bad) {
  console.error('Halting! because bad translation')
  return
}

Object.entries(readResult).forEach(([key, translations]) => {
  translationFile[key] = translations[0]['translation']
})


fs.writeFileSync('./en.json')




