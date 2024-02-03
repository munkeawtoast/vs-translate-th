type Translation = {
  [key: string]: string
}

type TranslationFromFile = {
  translation: Translation,
  original: Translation
   meta: {
    file: string
   }
}