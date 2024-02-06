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
  `<strong>Mechanical Power</strong><br><i>The mechanical work horse is the path to prosperity.</i><br><br>Mechanical power can currently be used to mechanize milling, to automate working <a href=\"handbook://item-ironbloom\">iron blooms</a> or smithing any type of metal plate, and to power the <a href=\"handbook://block-archimedesscrew-straight\">Archimedes screw</a> for transporting items. You will need to craft one <a href=\"handbook://block-windmillrotor-north\">windmill rotor</a>, at least 4 <a href=\"handbook://item-sail\">sails</a> as well as a few <a href=\"handbook://block-woodenaxle-ud\">axles</a> and <a href=\"handbook://block-angledgears-s\">gears</a>. The windmill requires at least 5 blocks of vertical space and usually gets more wind the higher it is, so begin by placing the rotor on a tower or the side of a tall building. The back of the windmill rotor will be attached to axles and gears to bring power to your machine.<br><br><strong>For mechanized milling:</strong>  Craft a <a href=\"handbooksearch://quern\">quern</a> from any igneous rock, then use axles and gears to connect the rotor to either the top or bottom of the quern to be automated. If the quern's output slot is full or occupied, the quern will begin to drop items on each of its 4 sides. Placing a block beside the quern will prevent the quern from dropping items on the blocked side, but reduces the grinding efficiency. You can use this fact to place hoppers and chests below the sides of the quern to catch quern output. Placing one hopper above the quern allows you to grind multiple stacks of material automatically.<br><br><strong>For mechanized smithing:</strong>  Smith or cast a <a href=\"handbook://block-toolmold-burned-helvehammer\">helve hammer head</a>, the <a href=\"handbook://item-helvehammer-tinbronze\">helve hammer itself</a>, a <a href=\"handbook://block-helvehammerbase-north\">base</a> and a <a href=\"handbook://block-woodentoggle-ns\">wooden toggle</a>. Using the gears and axles connect the output of your windmill rotor to the left or right side of the wooden toggle. Place the helve hammer base adjacent to the toggle. Place an anvil (it must be bronze tier or higher) three blocks away from the base and then attach the helve hammer onto the base. If you add an optional <a href=\"handbook://block-brake-north\">brake</a> it must be placed on the free side of the helve hammer base (opposite the axle bringing in power). Note! A helve hammer will only smith metal plates, and refine iron blooms. เครื่องมือ and weapons cannot be smithed using the helve hammer.<br><br><strong>To power the machine you have built</strong>:  Right click on the windmill rotor to add the sails. Each set of 4 sails will add 20% power output to the windmill. When there is enough wind, the windmill will turn and the machine will begin to move. A windmill with more sails will begin turning at lower wind speeds, as a certain amount of power is needed to get the quern and helve hammers moving.<br><br><strong>Larger</strong> and more complex builds can be created using the <a href=\"handbook://block-largegear3\">large wooden gear</a>. Combined with <a href=\"handbook://block-angledgears-s\">standard gears</a> it can either speed up rotation (but with weaker torque) or slow down rotation (but with much stronger torque). It can also bring together torque from several windmills or other power sources. Optionally, you can use a <a href=\"handbook://block-transmission-ns\">transmission</a> with a <a href=\"handbook://block-clutch-north\">clutch</a> next to it, to temporarily interrupt a power train. A <a href=\"handbook://block-brake-north\">brake</a> can stop a power train completely.`
)
