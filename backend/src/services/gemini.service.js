import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { env } from "../config/env.js";

const responseSchema = z.object({
  category: z.enum(["billing", "technical", "account", "general"]),
  priority: z.enum(["low", "medium", "high", "critical"])
});

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

const fallbackClassification = {
  category: "general",
  priority: "medium",
  source: "fallback"
};

const normalize = (value) => value.replace(/\s+/g, "_").toUpperCase();

export const classifyTicket = async ({ title, description }) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = [
      "Classify this support ticket into category and priority.",
      "Allowed category: billing, technical, account, general.",
      "Allowed priority: low, medium, high, critical.",
      "Return JSON only in format: {\"category\":\"...\",\"priority\":\"...\"}.",
      `Title: ${title}`,
      `Description: ${description}`
    ].join("\n");

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();
    const cleaned = raw.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    const parsed = responseSchema.parse(JSON.parse(cleaned));

    return {
      category: normalize(parsed.category),
      priority: normalize(parsed.priority),
      source: "gemini"
    };
  } catch {
    return {
      category: normalize(fallbackClassification.category),
      priority: normalize(fallbackClassification.priority),
      source: fallbackClassification.source
    };
  }
};
