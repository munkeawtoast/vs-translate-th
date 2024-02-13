import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"
import { config } from "dotenv"
config()
const MODEL_NAME = "gemini-pro"
const API_KEY = process.env.GOOGLE_GEN_AI_API_KEY

async function translate(inputText) {
  const genAI = new GoogleGenerativeAI(API_KEY)
  const model = genAI.getGenerativeModel({ model: MODEL_NAME })

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  }

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ]

  const parts = [
    {
      text: `english text of ${inputText}`,
    },
    { text: "thai translation of the text" },
  ]

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  })

  const response = result.response
  console.log(response.text())
}

translate(
  `One day she dreamt of great storms, trembling earth, turning wheels, and she woke to a new world. One of vibrance. Of light! Beautiful light! And beautiful green! Here now were the birds and beasts. The fruit and grains. The winding rivers and the great horn mountains. Where before there was nothing now there was wonder all around. She was the first to walk our world. Our home.
  Thus she came to know joy. But when the sun left the sky and the night fell over the new land, she heard the whispers, the groans, the crunching footsteps of those abominable shades that haunt us still. She then came to know fear, and a dreadful fear it was! She fled into the dirt and the quiet places. Deeper down she went, hounded by the foul voices, until she came upon something hidden and strange. There in the dark she found herself in the presence of a god.`,
)
