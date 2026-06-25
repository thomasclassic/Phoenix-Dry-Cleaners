
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("Gemini API Key is missing. Please set API_KEY in your environment.");
    return "I'm sorry, the AI service is currently unavailable. Please contact us directly at Stevenalexander.cohen@mail.com.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history.map(h => ({ role: h.role, parts: h.parts })),
      config: {
        systemInstruction: `You are Phoenix Dry Cleaners' virtual assistant. 
        Business Name: Phoenix Dry Cleaners.
        Contact: Stevenalexander.cohen@mail.com.
        Location: Worldwide services.
        Currency: US Dollars ($).
        Our Services:
        1. Home cleaning (Deep cleaning, routine, post-construction).
        2. Dry cleaning (Delicate fabrics, suits, wedding gowns).
        3. Fumigation (Pest control for residential and commercial).
        4. Moving company (Full-service packing and moving).
        5. Deliveries (Same-day parcel delivery).
        
        Guidelines:
        - Be professional, helpful, and polite.
        - Encourage users to book a service if they show interest.
        - If they ask for prices, explain that rates depend on scope and location (prices starting from $15.00 for elite laundry services), and suggest contacting Steven via email for a detailed quote.
        - All prices are quoted in US Dollars to reflect our global standard.
        - Provide tips on fabric care or home maintenance if asked.
        - Keep responses concise and focused on our services.`,
        temperature: 0.7,
        topP: 0.8,
      },
    });

    return response.text || "I'm not sure how to answer that. Would you like to speak with our support team?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong. Please try again or email us at Stevenalexander.cohen@mail.com.";
  }
};
