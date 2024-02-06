import fs from "fs"
import { createRequire } from "module"
const require = createRequire(import.meta.url)

const translationDir = "./translation"
const baseTranslation = "./en.json"

const translationFiles = fs
  .readdirSync(translationDir)
  .filter((file) => file.endsWith(".json"))
const translatedPairs = {}
let broken = false
translationFiles.forEach((filePath) => {
  const base = require(baseTranslation)
  const pairs = Object.entries(
    require(translationDir + "/" + filePath, { type: "json" })
  )
  pairs.forEach(([key, text]) => {
    if (base[key] !== text) {
      const pushing = {
        translation: text,
        directory: translationDir + filePath,
      }
      if (!translatedPairs[key]) {
        translatedPairs[key] = [pushing]
      } else {
        translatedPairs[key].push(pushing)
        console.error(
          `Found duplicate translation of ${key}: ${translatedPairs[key].map(
            (meta, index) => {
              return (
                `${meta.translation} (${meta.directory})` +
                `${", " * translatedPairs[key].length - index}`
              )
            }
          )} `
        )
      }
    }
  })
})

fs.writeFileSync(
  "./ignored/result.json",
  JSON.stringify(translatedPairs, null, 4)
)

// if (Object.entries([key, translations]).length)
