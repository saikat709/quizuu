import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "$env/dynamic/private";

const apiKey = env.GOOGLE_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

export const proModel = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

export async function generateContent(prompt: string, isPro = false) {
    const selectedModel = isPro ? proModel : model;
    const result = await selectedModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

/**
 * For multimodal inputs (audio/video/images)
 */
export async function generateMultimodalContent(parts: any[], isPro = false) {
    const selectedModel = isPro ? proModel : model;
    const result = await selectedModel.generateContent({
        contents: [{ role: "user", parts }]
    });
    const response = await result.response;
    return response.text();
}
