import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { platform, profileUrl } = await req.json();
    if (!platform || !profileUrl) {
      return new Response(JSON.stringify({ error: "platform and profileUrl are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const RAPIDAPI_KEY = Deno.env.get("RAPIDAPI_KEY");
    if (!RAPIDAPI_KEY) {
      return new Response(JSON.stringify({ error: "RapidAPI key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let profileData: any = null;

    // Extract username from URL
    const username = extractUsername(profileUrl, platform);

    if (platform === "Instagram") {
      const response = await fetch(`https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=${encodeURIComponent(username)}`, {
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
        },
      });
      const data = await response.json();
      profileData = {
        followers: data.data?.follower_count || 0,
        following: data.data?.following_count || 0,
        posts: data.data?.media_count || 0,
        bio: data.data?.biography || "",
        fullName: data.data?.full_name || "",
        engagementRate: "",
        avgViews: "",
        niche: extractNicheFromBio(data.data?.biography || ""),
      };
    } else if (platform === "TikTok") {
      const response = await fetch(`https://tiktok-scraper7.p.rapidapi.com/user/info?unique_id=${encodeURIComponent(username)}`, {
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": "tiktok-scraper7.p.rapidapi.com",
        },
      });
      const data = await response.json();
      const user = data.data?.user || {};
      const stats = data.data?.stats || {};
      profileData = {
        followers: stats.followerCount || 0,
        following: stats.followingCount || 0,
        posts: stats.videoCount || 0,
        bio: user.signature || "",
        fullName: user.nickname || "",
        engagementRate: "",
        avgViews: stats.heartCount ? Math.round(stats.heartCount / Math.max(stats.videoCount, 1)).toString() : "",
        niche: extractNicheFromBio(user.signature || ""),
      };
    } else if (platform === "YouTube") {
      const response = await fetch(`https://youtube-data8.p.rapidapi.com/channel/details/?id=${encodeURIComponent(username)}&hl=en&gl=US`, {
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": "youtube-data8.p.rapidapi.com",
        },
      });
      const data = await response.json();
      profileData = {
        followers: data.subscriberCount || 0,
        following: 0,
        posts: data.videosCount || 0,
        bio: data.description || "",
        fullName: data.title || "",
        engagementRate: "",
        avgViews: data.viewCount ? Math.round(parseInt(data.viewCount) / Math.max(parseInt(data.videosCount || "1"), 1)).toString() : "",
        niche: extractNicheFromBio(data.description || ""),
      };
    } else if (platform === "Twitter/X") {
      const response = await fetch(`https://twitter-api47.p.rapidapi.com/v2/user/by-username?username=${encodeURIComponent(username)}`, {
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": "twitter-api47.p.rapidapi.com",
        },
      });
      const data = await response.json();
      const user = data.data || {};
      profileData = {
        followers: user.public_metrics?.followers_count || 0,
        following: user.public_metrics?.following_count || 0,
        posts: user.public_metrics?.tweet_count || 0,
        bio: user.description || "",
        fullName: user.name || "",
        engagementRate: "",
        avgViews: "",
        niche: extractNicheFromBio(user.description || ""),
      };
    }

    if (!profileData) {
      return new Response(JSON.stringify({ error: "Unsupported platform" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(profileData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("fetch-social-profile error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function extractUsername(url: string, platform: string): string {
  try {
    // If it's already just a username
    if (!url.includes("/") && !url.includes(".")) {
      return url.replace("@", "");
    }
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length > 0) {
      return parts[parts.length - 1].replace("@", "");
    }
  } catch {}
  return url.replace("@", "");
}

function extractNicheFromBio(bio: string): string {
  const keywords = ["fitness", "beauty", "fashion", "tech", "gaming", "cooking", "travel", "music", "art", "finance", "health", "wellness", "lifestyle", "education", "comedy", "sports", "photography", "food", "crypto", "marketing"];
  const lower = bio.toLowerCase();
  const found = keywords.filter(k => lower.includes(k));
  return found.join(", ");
}
