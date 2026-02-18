import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const classifyTicket = async (description) => {
  try {
    const prompt = `
You are a support ticket classifier.

Categorize the following ticket into ONE of:
billing, technical, account, general.

Assign ONE priority:
low, medium, high, critical.

Respond ONLY in valid JSON format like:
{
  "category": "technical",
  "priority": "high"
}

Ticket:
${description}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    // Extract JSON safely
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid JSON response");

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      category: parsed.category,
      priority: parsed.priority,
    };

  } catch (error) {
    console.error("Gemini classification error:", error.message);

    return {
      category: null,
      priority: null,
    };
  }
};