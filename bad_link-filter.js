import fs from "node:fs"
import { JSDOM } from "jsdom"

import { createRequire } from "module"
const require = createRequire(import.meta.url)

const thaiTranslation = require("./en.json")
const originalTranslation = require("./original.json")
const { document } = new JSDOM().window
const testElement = document.createElement("div")
const goodLinkArray = []

// contains Thai letter in name
const badLinks = Object.fromEntries(
  Object.entries(thaiTranslation).filter(([key, translation]) => {
    testElement.innerHTML = translation
    const children = [...testElement.children]
    let returning = false
    children.forEach((element) => {
      if (element.nodeName === "A") {
        if (`${element.getAttribute("href")}`.match(/.*[\u0E00-\u0E7F]+.*/)) {
          console.log(element.getAttribute("href"))
          goodLinkArray.push([key, originalTranslation[key]])
          returning = true
          return
        }
      }
    })
    return returning
  })
)

fs.writeFileSync(
  "./ignored/bad/bad-link.json",
  JSON.stringify(badLinks, null, 2)
)

fs.writeFileSync(
  "./ignored/bad/gone-link.json",
  JSON.stringify(Object.fromEntries(goodLinkArray), null, 2)
)
