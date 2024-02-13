import fs from "node:fs"

import { createRequire } from "module"
const require = createRequire(import.meta.url)

const thaiTranslation = require("./en.json")

Object.entries(thaiTranslation)
  .filter(([key, translation]) => key.startsWith("lore-"))
  .forEach(([key, translation]) => {
    fs.writeFileSync(`./translation/md/${key}.md`, translation)
  })
