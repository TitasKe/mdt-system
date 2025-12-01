import { GoogleGenAI } from "@google/genai";

// Initialize the API client
// Note: In a real deployment, this key would be proxied through a backend
// For this frontend-only demo, we rely on the environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePoliceReport = async (
  notes: string,
  type: string,
  officerName: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Error: API Key is missing. Please configure the environment variable.";
  }

  try {
    const prompt = `
      You are an expert police sergeant assisting an officer in writing a formal police incident report.
      
      Officer Name: ${officerName}
      Incident Type: ${type}
      Rough Notes: "${notes}"

      Please generate a professional, legally sound, and well-structured police narrative based strictly on the notes provided. 
      Do not invent facts not present in the notes, but you may infer standard procedure (e.g., "Officer arrived on scene").
      Format it as a formal narrative block.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 1000,
        temperature: 0.3, // Low temperature for factual, consistent reports
      }
    });

    return response.text || "Failed to generate report narrative.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating report. Please check your connection or API key.";
  }
};
