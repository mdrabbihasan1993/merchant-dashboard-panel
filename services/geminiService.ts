
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
      contents: context,
      config: {
        systemInstruction: "You are a world-class logistics analyst. Provide 3 brief, extremely actionable insights for this courier merchant dashboard. Keep it concise and professional.",
      }
    });
    return response.text || "Unable to generate insights at this moment.";
  } catch (error) {
    console.error("Gemini Insights Error:", error);
    return "Error generating AI insights. Please check your connection.";
  }
};
