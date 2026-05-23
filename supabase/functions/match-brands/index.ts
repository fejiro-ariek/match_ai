import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { platform, followers, niche, description } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "Lovable API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const prompt = `You are a brand deal matchmaker for content creators. Based on the following creator profile, suggest 8 real brands that would be great partnership matches. Return ONLY valid JSON.

Creator Profile:
- Platform: ${platform}
- Followers: ${followers}
- Niche: ${niche}
- Content Description: ${description}

Return a JSON object with this exact structure:
{
  "pricingRange": { "min": number, "max": number, "currency": "USD" },
  "profileSummary": "2-3 sentence summary of the creator's brand appeal",
  "brands": [
    {
      "name": "Real Brand Name",
      "category": "Industry Category",
      "whyItFits": "1-2 sentences explaining the specific match",
      "bestFor": "What content type works best",
      "pitchAngle": "Specific pitch advice for this creator",
      "matchScore": number between 0-100
    }
  ]
}

Rules:
- Use REAL brand names that actually do influencer marketing
- Sort by matchScore descending (best match first)
- The first brand should be the absolute best match
- Pricing should be realistic for the creator's size
- Be specific and actionable in pitch angles
- Match brands to the creator's actual niche and content style`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
        messages: [
          { role: "system", content: "You are a brand partnership expert. Always respond with valid JSON only, no markdown formatting." },
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
    console.error("match-brands error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
