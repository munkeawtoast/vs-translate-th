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
      text: `english text in extended markdown format: ${inputText}`,
    },
    { text: "thai translation without affecting html tags " },
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
  `Your first ทองแดง nuggets will probably be found lying on the surface as you explore. When you find these nuggets, mark the location on your map; there is more ทองแดง ore in the stone below!<br><strong>Other Sources:</strong><br>Other places to obtain your first ทองแดง nuggets include <a href=\"handbook://gamemechanicinfo-panning\">panning</a>, in certain cracked vessels found in ruins, or purchased from certain traders.`
)
