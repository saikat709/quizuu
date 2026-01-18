import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { downloadYoutubeAudio, getBase64Audio, cleanupFile } from './youtube';
import { generateMultimodalContent } from './gemini';
import { QUIZ_PROMPT, NOTE_PROMPT } from './prompts';
import { env } from "$env/dynamic/private";

const apiKey = env.GOOGLE_API_KEY;

export async function transcribeYoutube(url: string) {
    const audioPath = await downloadYoutubeAudio(url);
    const base64Audio = getBase64Audio(audioPath);

    try {
        const result = await generateMultimodalContent([
            {
                inlineData: {
                    mimeType: "audio/mp3",
                    data: base64Audio
                }
            },
            { text: "Accurately transcribe the following audio content into text. Return ONLY the transcript." }
        ]);

        return result;
    } finally {
        cleanupFile(audioPath);
    }
}

export async function processYoutubeVideo(url: string, type: 'quiz' | 'note') {
    const transcript = await transcribeYoutube(url);
    return generateContentWithLangChain(transcript, type);
}

/**
 * Alternative implementation using LangChain for more complex flows if needed
 */
export async function generateContentWithLangChain(text: string, type: 'quiz' | 'note') {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-1.5-pro",
        maxOutputTokens: 2048,
        apiKey: apiKey
    });

    const prompt = type === 'quiz' ? QUIZ_PROMPT(text) : NOTE_PROMPT(text);
    const response = await model.invoke(prompt);

    return response.content as string;
}
