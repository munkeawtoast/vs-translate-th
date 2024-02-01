import fs from "node:fs"

import { createRequire } from "module"
const require = createRequire(import.meta.url)

const thaiTranslation = require("./en.json")

const enThMixedTranslation = Object.entries(thaiTranslation)
    .filter(([key, translation]) => /<[^>]+>/.test(translation))
    .forEach(([key, translation]) => {
        fs.writeFileSync(`./translation/md/${key}.md`, translation)
    })
