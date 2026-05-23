import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { brand, creatorHandle, creatorProfile, tone } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "Lovable API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const toneInstructions: Record<string, string> = {
      Casual: "Write in a friendly, conversational tone. Use contractions and casual language. Be approachable and warm.",
      Professional: "Write in a polished, professional tone. Be respectful and business-like while still showing personality.",
      Direct: "Be concise and straightforward. Get to the point quickly. No fluff or filler.",
      Short: "Keep each email under 100 words. Be extremely concise while still being compelling.",
    };

    const prompt = `You are an expert cold email copywriter specializing in influencer-brand outreach. Write 4 high-converting emails for a content creator reaching out to a brand for partnership.

Brand Information:
- Name: ${brand.name}
- Category: ${brand.category}
- Why it fits: ${brand.whyItFits}
- Best content type: ${brand.bestFor}
- Pitch angle: ${brand.pitchAngle}

Creator Information:
- Handle/Name: ${creatorHandle}
- Platform: ${creatorProfile?.platform || "social media"}
- Followers: ${creatorProfile?.followers || "established following"}
- Niche: ${creatorProfile?.niche || "content creation"}

Tone: ${tone}
${toneInstructions[tone] || ""}

Generate exactly 4 emails as a JSON array:
1. Initial outreach email - Hook them with a specific observation about their brand, mention a recent campaign or product, show you've done your homework
2. Follow-up 1 (3-5 days later) - Reference the first email, add a new value proposition or recent achievement
3. Follow-up 2 (7-10 days later) - Last chance approach, offer something specific (free content, trial collaboration)
4. Reply template - For when they respond positively, pivot to scheduling and details

Return ONLY valid JSON:
{
  "emails": [
    {
      "title": "Outreach Email",
      "subject": "Email subject line",
      "content": "Full email body"
    }
  ]
}

Rules:
- Each email must have a compelling, specific subject line
- Use proven copywriting frameworks (AIDA, PAS, etc.)
- Include specific CTAs in each email
- Reference the brand's actual products/campaigns where possible
- Make the value proposition crystal clear
- Include social proof elements
- Keep emails scannable with short paragraphs
- Never use generic templates — each email should feel personalized`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
        messages: [
          { role: "system", content: "You are a world-class cold email copywriter. Always respond with valid JSON only." },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI Gateway error:", response.status, errText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-email error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
