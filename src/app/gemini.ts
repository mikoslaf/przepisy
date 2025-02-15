import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateStory(apiToken: string, prompt: string): Promise<string> {
    try {
        // Input validation
        if (!apiToken) throw new Error('API token is required');
        if (!prompt) throw new Error('Prompt is required');

        // Initialize the API
        const genAI = new GoogleGenerativeAI(apiToken);
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-2.0-flash'
        });

        // Create chat session
        const chat = model.startChat({
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
            },
            history: [],
        });

        // Send the actual prompt
        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        return response.text();

    } catch (error: any) {
        console.error('Error generating story:', error.message);
        throw error;
    }
}

// Example usage
async function run() {
    try {
        const API_TOKEN = "AIzaSyCXc1CY9k-lj2WrpMFC7VFEa11QAl4u1-g";
        const prompt = 'Napisz opowiadanie o podróży w kosmos.';
        
        const story = await generateStory(API_TOKEN, prompt);
        console.log(story);
        
    } catch (error: any) {
        console.error('Failed to run story generator:', error.message);
    }
}


export { generateStory };