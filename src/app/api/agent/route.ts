import { NextResponse } from "next/server";
import { catalog } from "@/lib/catalog";

type RequestBody = { image?: string; occasion?: string; budget?: string; style?: string; question?: string };

const mockProfile = {
  summary: "Your strongest direction is relaxed structure: clean lines, warm neutrals and one tactile layer.",
  signals: ["Warm-neutral palette", "Relaxed silhouette", "Low visual contrast", "Texture over print"],
};

function mockResponse(body: RequestBody) {
  const budget = Number(body.budget) || 250;
  const picks = catalog.filter((item) => item.price <= budget).slice(0, 4);
  return {
    mode: "demo",
    profile: mockProfile,
    answer: body.question
      ? `I’d refine this edit by keeping the palette cohesive and changing one silhouette at a time. For “${body.question}”, start with the blazer or trouser—their structure will make the biggest difference without replacing the whole look.`
      : `For ${body.occasion || "your plan"}, I built a ${body.style || "considered, versatile"} edit under $${budget}. Each piece can work beyond this occasion, so the recommendation optimizes for repeat wear—not just a single outfit.`,
    picks,
  };
}

export async function POST(request: Request) {
  const body = (await request.json()) as RequestBody;
  const key = process.env.AI_API_KEY;
  if (!key) return NextResponse.json(mockResponse(body));

  const base = (process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const model = process.env.AI_MODEL || "gpt-4.1-mini";
  const userContent: Array<Record<string, unknown>> = [{
    type: "text",
    text: `You are Vela, an AI personal shopping agent. Analyze the user and return concise advice. Occasion: ${body.occasion || "unspecified"}. Budget USD: ${body.budget || "250"}. Style: ${body.style || "open"}. Follow-up: ${body.question || "none"}. Return only JSON with summary (string), signals (4 short strings), and answer (string). Never infer sensitive traits, gender, body type, health, ethnicity, or attractiveness from the image. Focus only on visible clothing, palette, silhouette, texture and stated preferences.`,
  }];
  if (body.image) userContent.push({ type: "image_url", image_url: { url: body.image } });

  try {
    const response = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model, response_format: { type: "json_object" }, messages: [{ role: "user", content: userContent }], temperature: 0.4 }),
    });
    if (!response.ok) throw new Error(`Provider returned ${response.status}`);
    const data = await response.json();
    const profile = JSON.parse(data.choices?.[0]?.message?.content || "{}");
    const fallback = mockResponse(body);
    return NextResponse.json({ ...fallback, mode: "live", profile: { summary: profile.summary || fallback.profile.summary, signals: profile.signals || fallback.profile.signals }, answer: profile.answer || fallback.answer });
  } catch (error) {
    return NextResponse.json({ ...mockResponse(body), mode: "fallback", providerError: error instanceof Error ? error.message : "Provider request failed" });
  }
}
