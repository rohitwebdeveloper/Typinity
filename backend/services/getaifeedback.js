
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getfeedback(wpm, accuracy, consistency, correctCharaters, errorCharactors) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Act as a typing coach. A user has the following typing stats:
- Words per minute (WPM): ${wpm}
- Accuracy: ${accuracy}%
- Consistency: ${consistency}%
- Correct Characters: ${correctCharaters}
- Wrong Characters: ${errorCharactors}
Give encouraging, personalized feedback and one tip to improve. Word limit of feedback should not be to high or to low . `
    });
    console.log(response)
    return response;
}



module.exports = getfeedback;