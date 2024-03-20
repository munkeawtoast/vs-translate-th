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
  `To continue playing please purchase more server time on our <a href=\"https://www.vintagestory.at/store/category/1-game-account-game-servers/\">online store</a>. Please note, your world will be deleted after 180 days of inactivity.<br><br>Thank you for trying out our server hosting services!`,
)
