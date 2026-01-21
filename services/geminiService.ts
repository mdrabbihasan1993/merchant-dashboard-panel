
import { GoogleGenAI, Type } from "@google/genai";
import { BookingData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseBookingRequest = async (inputText: string): Promise<BookingData | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Parse the following shipping/booking request into a structured JSON object. 
      Input text: "${inputText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            customerName: { type: Type.STRING, description: "Full name of the customer" },
            phoneNumber: { type: Type.STRING, description: "Contact number" },
            address: { type: Type.STRING, description: "Detailed delivery address" },
            weight: { type: Type.NUMBER, description: "Weight in kg" },
            codAmount: { type: Type.NUMBER, description: "Cash on delivery amount" },
            note: { type: Type.STRING, description: "Any special instructions" }
          },
          required: ["customerName", "phoneNumber", "address", "codAmount"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as BookingData;
  } catch (error) {
    console.error("Gemini Parsing Error:", error);
    return null;
  }
};

export const getLogisticsInsights = async (context: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this logistics data for a merchant on 7ton Express: ${context}`,
      config: {
        systemInstruction: `You are a Senior Logistics Consultant for 7ton Express. 
        Your goal is to help the merchant optimize their delivery performance.
        
        RULES:
        1. Format your response in clear bullet points.
        2. Each point must follow this structure: "• [ISSUE]: [Short description] -> [ACTION]: [Actionable solution]".
        3. ALWAYS highlight that the 7ton Express KAM (Key Account Manager) is exceptionally helpful and should be contacted for any logistical hurdles.
        4. NEVER suggest or mention any other courier services. 7ton Express is the only solution.
        5. Focus on the current data: Sorting delays (98 parcels), Unpaid amounts (4,300), and Success rates.
        6. Keep the tone professional, encouraging, and highly technical yet easy to understand.`,
      }
    });
    return response.text || "Unable to generate insights at this moment.";
  } catch (error) {
    console.error("Gemini Insights Error:", error);
    return "Error generating AI insights. Please check your connection.";
  }
};
