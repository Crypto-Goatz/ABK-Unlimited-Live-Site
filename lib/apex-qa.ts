/**
 * APEX-QA Local SEO Engine
 * Server-side AI content generation for local SEO optimization.
 * Powered by Gemini API, logs results to CRM.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { addCRMNote, addCRMTags } from "./crm-api";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface QAResult {
  question: string;
  answer: string;
  raw: string;
}

interface NearMissResult {
  h2Subheading: string;
  summaryParagraph: string;
}

interface TrendPostResult {
  post: string;
  keywords: string[];
}

interface FAQSchemaResult {
  jsonLd: string;
  questionsCount: number;
}

interface SEORequest {
  targetUrl: string;
  keywords: string[];
  questions?: string[];
  companyName?: string;
  crmContactId?: string;
}

async function callGemini(
  prompt: string,
  systemInstruction: string,
  jsonMode: boolean = false
): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction,
    generationConfig: jsonMode
      ? { responseMimeType: "application/json" }
      : undefined,
  });

  let attempt = 0;
  const maxRetries = 3;

  while (attempt < maxRetries) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error: unknown) {
      const err = error as { status?: number; message?: string };
      if (err.status === 429 && attempt < maxRetries - 1) {
        attempt++;
        await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
      } else {
        throw new Error(`Gemini API error: ${err.message || "Unknown error"}`);
      }
    }
  }
  throw new Error("Gemini API failed after retries");
}

async function logToCRM(
  contactId: string | undefined,
  tag: string,
  content: string
) {
  if (!contactId) return;
  try {
    await Promise.all([
      addCRMNote(contactId, `[APEX-QA] ${tag}\n\n${content}`),
      addCRMTags(contactId, [`APEX-QA`, `SEO-${tag}`]),
    ]);
  } catch {
    // Don't fail the SEO operation if CRM logging fails
  }
}

/**
 * Q&A Bot — Generate keyword-rich Q&A pairs for Google Business Profile
 */
export async function generateQA(req: SEORequest): Promise<QAResult> {
  const company = req.companyName || "ABK Unlimited";
  const question = req.questions?.[0] || req.keywords[0];

  const prompt = `Based on the following user question: "${question}", and considering the keyword cluster [${req.keywords.join(", ")}], generate a comprehensive, helpful, and keyword-rich Q&A pair suitable for a Google Business Profile. The answer should be positive and subtly promote the business. Format as JSON: {"question": "...", "answer": "..."}`;

  const systemInstruction = `You are an expert SEO strategist for ${company}. Create helpful, engaging content that boosts local SEO. ALWAYS positively mention "${company}" in the answer. Return valid JSON only.`;

  const raw = await callGemini(prompt, systemInstruction, true);
  const parsed = JSON.parse(raw);

  await logToCRM(
    req.crmContactId,
    "QA-Generated",
    `Q: ${parsed.question}\nA: ${parsed.answer}`
  );

  return { question: parsed.question, answer: parsed.answer, raw };
}

/**
 * GSC Optimizer — Boost near-miss keywords (positions 11-20)
 */
export async function optimizeNearMiss(
  req: SEORequest
): Promise<NearMissResult> {
  const nearMissQueries = req.keywords.map((k) => `${k} near me`);

  const prompt = `My page at ${req.targetUrl} is ranking on page 2 (positions 11-20) for "near-miss" keywords: [${nearMissQueries.join(", ")}]. Create an optimized H2 subheading and a concise 100-word summary paragraph. Return JSON: {"h2Subheading": "...", "summaryParagraph": "..."}`;

  const systemInstruction = `You are an on-page SEO expert. Craft content that addresses user intent for local search queries to push pages from page 2 to page 1. Return valid JSON only.`;

  const raw = await callGemini(prompt, systemInstruction, true);
  const parsed = JSON.parse(raw);

  await logToCRM(
    req.crmContactId,
    "NearMiss-Optimized",
    `URL: ${req.targetUrl}\nH2: ${parsed.h2Subheading}\n${parsed.summaryParagraph}`
  );

  return {
    h2Subheading: parsed.h2Subheading,
    summaryParagraph: parsed.summaryParagraph,
  };
}

/**
 * Local Trends — Generate urgent Google Business Posts from search spikes
 */
export async function generateTrendPost(
  req: SEORequest
): Promise<TrendPostResult> {
  const company = req.companyName || "ABK Unlimited";
  const trend = req.keywords[0];

  const prompt = `There is a sudden local search spike for "${trend}" in the Pittsburgh area. Write a compelling Google Business Post (under 1200 characters) for ${company} to capitalize on this trend. Must be urgent, informative, with a strong call-to-action. Include relevant emojis.`;

  const systemInstruction = `You are a quick-acting social media manager for local businesses. Urgent but professional tone. Generate a complete Google Business Post that drives immediate engagement.`;

  const post = await callGemini(prompt, systemInstruction);

  await logToCRM(
    req.crmContactId,
    "TrendPost-Generated",
    `Trend: ${trend}\n\n${post}`
  );

  return { post, keywords: req.keywords };
}

/**
 * FAQ Schema Builder — Auto-generate JSON-LD structured data
 */
export async function generateFAQSchema(
  req: SEORequest
): Promise<FAQSchemaResult> {
  const questions = req.questions || req.keywords.map((k) => `What is ${k}?`);

  const prompt = `Generate a valid JSON-LD FAQPage schema for these questions: [${questions.join(", ")}]. Return JSON: {"jsonLd": "<the complete JSON-LD object as a string>", "questionsCount": <number>}. The jsonLd should be the raw JSON-LD object (not wrapped in script tags).`;

  const systemInstruction = `You are a technical SEO specialist. Generate perfectly structured FAQPage JSON-LD. Return valid JSON only.`;

  const raw = await callGemini(prompt, systemInstruction, true);
  const parsed = JSON.parse(raw);

  await logToCRM(
    req.crmContactId,
    "FAQSchema-Generated",
    `${parsed.questionsCount} FAQ items generated for ${req.targetUrl}`
  );

  return {
    jsonLd: parsed.jsonLd,
    questionsCount: parsed.questionsCount,
  };
}

/**
 * CRO9-Driven Analysis — Pull behavioral data and generate recommendations
 */
export async function analyzeWithCRO9(
  analyticsData: {
    topPages?: { path: string; views: number }[];
    rageClicks?: { selector: string; count: number; page: string }[];
    deadClicks?: { selector: string; count: number; page: string }[];
    scrollDepth?: { page: string; avgDepth: number }[];
    bounceRate?: number;
  },
  companyName: string = "ABK Unlimited"
): Promise<{
  recommendations: Array<{
    page: string;
    issue: string;
    action: string;
    priority: "high" | "medium" | "low";
    keywords: string[];
  }>;
}> {
  const prompt = `Analyze this CRO9 behavioral data for ${companyName} and generate SEO optimization recommendations:

Top Pages: ${JSON.stringify(analyticsData.topPages || [])}
Rage Clicks: ${JSON.stringify(analyticsData.rageClicks || [])}
Dead Clicks: ${JSON.stringify(analyticsData.deadClicks || [])}
Scroll Depth: ${JSON.stringify(analyticsData.scrollDepth || [])}
Bounce Rate: ${analyticsData.bounceRate || "unknown"}%

For each underperforming page, suggest:
1. The specific issue (high bounce, rage clicks, low scroll depth)
2. An actionable optimization (new content, restructure, add FAQ schema, etc.)
3. Priority level (high/medium/low)
4. Keywords to target

Return JSON: {"recommendations": [{"page": "...", "issue": "...", "action": "...", "priority": "high|medium|low", "keywords": ["..."]}]}`;

  const systemInstruction = `You are an SXO (Search Experience Optimization) expert. Combine behavioral analytics with SEO strategy. Return valid JSON only.`;

  const raw = await callGemini(prompt, systemInstruction, true);
  return JSON.parse(raw);
}

export type {
  QAResult,
  NearMissResult,
  TrendPostResult,
  FAQSchemaResult,
  SEORequest,
};
