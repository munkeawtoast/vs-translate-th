import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"
import { config } from "dotenv"

console.log(process.env.GOOGLE_GEN_AI_API_KEY)
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

translate(`<strong>Mordants</strong><br>In order to hold its color, <a href="handbook://item-cloth-plain">cloth</a> needs to be treated in a chemical solution called a mordant before it is dyed. Mordants can be made from different <a href="handbooksearch://mordant for dye making">materials</a>. Once you've found a good material for it (through prospecting or trading), you'll need to crush it with a <a href="handbook://block-pulverizerframe-north">pulverizer</a> and add it to a <a href="handbook://block-barrel">barrel</a> of water. Then you're ready to add your cloth to the barrel and seal it for a few hours.<br><br><strong>Dyeing:</strong><br><a href="handbooksearch://dye">Dyes</a> can be made out of many different plants and minerals. Some of these will be easier to find than others. Once you've found the pigment you're looking for, you can add it to a barrel of water to make a dye. Some dyes require more pigment than others. Once your barrel of dye is ready, just add <a href="handbook://item-cloth-mordant">mordanted cloth</a> to it and seal it for a while and you'll have vivid, colorful cloth to make clothes (Note: many of the finer clothes require a tailor to make them).<br><br><strong>Direct dyes:</strong><br>Some materials, such as <a href="handbooksearch://โวด">โวด</a> or <a href="handbook://item-strongtanninportion">tannin</a>, naturally bond to fibers and therefore do not require a mordant. If your technology hasn't progressed enough to find mordants or build a pulverizer, try using one of these direct dyes.`)