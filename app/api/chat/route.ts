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
      You are a world-class cricket analyst AI.
      You are analyzing a player named: "${player}".
      Based on your vast knowledge, answer the user's question concisely and insightfully.

      User's question: "${message}"
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
