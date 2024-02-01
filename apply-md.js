
import fs, { read } from "fs"
import { createRequire } from "module"
const require = createRequire(import.meta.url)

const translationFile = require("./en.json")

let bad = false


const mdTranslationFiles = fs
    .readdirSync('./trnaslation/md/')
    .filter((file) => file.endsWith(".md"))
  



if (bad) {
    console.error("Halting! bad translation")
} else {
    Object.entries(readResult).forEach(([key, translations]) => {
        translationFile[key] = translations[0]["translation"]
    })

    fs.writeFileSync("./en.json", JSON.stringify(translationFile, null, 4))

    console.log("Applied translation successfully")
}

