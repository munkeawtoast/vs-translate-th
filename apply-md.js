import fs, { read } from "fs"
import { createRequire } from "module"
const require = createRequire(import.meta.url)

const translationFile = require("./en.json")

let bad = false

const mdTranslationFiles = fs
  .readdirSync("./translation/md/")
  .filter((file) => file.endsWith(".md"))

if (bad) {
  console.error("Halting! bad translation")
} else {
  mdTranslationFiles.forEach((file) => {
    const mdString = fs
      .readFileSync(`./translation/md/${file}`, "utf-8")
      .replace(/\n$/, "")
    const key = file.split(".")[0]
    translationFile[key] = mdString
  })

  fs.writeFileSync("./en.json", JSON.stringify(translationFile, null, 4))

  console.log("Applied translation successfully")
}
