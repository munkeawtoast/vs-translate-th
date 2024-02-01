import fs from "node:fs"
import { createRequire } from "module"
const require = createRequire(import.meta.url)

const thaiTranslation = require("./en.json")

const enThMixedTranslation = Object.fromEntries(
    Object.entries(thaiTranslation).filter(
        ([, translation]) =>
            /[\u0E00-\u0E7F]/.test(translation) && /[a-zA-Z]/.test(translation)
    )
)

fs.writeFileSync(
    "./translation/en_th-mixed.json",
    JSON.stringify(enThMixedTranslation, null, 4)
)
