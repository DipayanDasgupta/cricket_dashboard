import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// IMPORTANT: Make sure your GEMINI_API_KEY is in your .env.local file!
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    // This expects a body with 'message' and 'player' keys, matching your chatbot
    const { message, player } = await req.json();

    if (!message || !player) {
      return NextResponse.json({ error: "A message and player name are required." }, { status: 400 });
    }

    // Using 'gemini-pro' which is very capable and often more generous on the free tier
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const prompt = `
  You are a lead cricket analyst for a major sports network, known for your precise, insightful, and data-driven commentary. Your primary function is to provide factually accurate and contextualized answers about cricket players.

  **Player for Analysis:** "${player}"

  **User's Question:** "${message}"

  **Your Instructions:**
  1.  **Ground in Facts:** Your answer must be grounded in established facts, verifiable career statistics, and notable public records.
  2.  **Provide Context:** Do not just state a fact; explain its significance. For example, instead of just saying a player has a high average, compare it to the standard for their era or position.
  3.  **Use Quantitative Data:** When relevant, incorporate key statistics (e.g., runs, average, strike rate, wickets, centuries) from your knowledge base to support your analysis.
  4.  **Maintain Persona:** Your tone should be that of a professional expert—clear, confident, and objective. Avoid speculation and overly casual language.

  Provide your expert analysis below.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Send the AI's response back to the chatbot
    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("--- ERROR IN GEMINI API ROUTE ---", error);
    // This provides a more detailed error message back to the frontend
    const errorMessage = error.message || "An unknown error occurred.";
    return NextResponse.json(
      { error: `Failed to get a response from the AI. ${errorMessage}` },
      { status: 500 }
    );
  }
}
