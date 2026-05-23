import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Sparkles, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import PipelineSidebar from "@/components/matchai/PipelineSidebar";
import EmailGeneration from "@/components/matchai/EmailGeneration";
import type { Brand } from "@/components/matchai/AnalysisResults";
import type { FormData } from "@/components/matchai/InputForm";

interface MatchRow {
  id: string;
  brand_name: string | null;
  niche: string | null;
  platform: string | null;
  updated_at: string;
  brand_data: Brand | null;
  creator_profile: FormData | null;
}

const FILTERS: { label: string; options: string[] }[] = [
  { label: "Status", options: ["All active", "Draft", "Active", "Archived"] },
  { label: "Stage", options: ["All stages", "Discovery", "Outreach", "Negotiation", "Closed"] },
  { label: "Updated", options: ["Today", "Last 7 days", "Last 30 days", "All time"] },
  { label: "Channel", options: ["Email + DM", "Email", "Instagram DM", "All channels"] },
];

const formatRelative = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
};

const Pipeline = () => {
  const [stats, setStats] = useState({ active: 0, drafts: 0 });
  const [matches, setMatches] = useState<MatchRow[]>([]);
  const [openMatch, setOpenMatch] = useState<MatchRow | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [statusRes, matchRes] = await Promise.all([
        supabase.from("match_runs").select("status").eq("user_id", user.id),
        supabase
          .from("match_runs")
          .select("id, brand_name, niche, platform, updated_at, brand_data, creator_profile")
          .eq("user_id", user.id)
          .eq("status", "active")
          .not("brand_name", "is", null)
          .order("updated_at", { ascending: false }),
      ]);

      if (!active) return;
      if (statusRes.data) {
        setStats({
          active: statusRes.data.filter(r => r.status === "active").length,
          drafts: statusRes.data.filter(r => r.status === "draft").length,
        });
      }
      if (matchRes.data) setMatches(matchRes.data as unknown as MatchRow[]);
    };
    load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex">
      <PipelineSidebar />

      <div className="flex-1 min-w-0">
        <main className="px-4 sm:px-6 pt-20 lg:pt-8 pb-8 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {/* Heading */}
            <div className="mb-6">
              <h1 className="font-display text-h1 mb-2">Your pipeline</h1>
              <p className="text-body text-foreground-secondary max-w-2xl">
                Conversations matched to your personal brand, niche, audience, and deal goals.
              </p>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 gap-3 mb-6 max-w-md">
              {[
                { label: "Active", value: stats.active },
                { label: "Drafts", value: stats.drafts },
              ].map(s => (
                <div key={s.label} className="border border-border rounded-xl px-4 py-3 surface-1">
                  <p className="text-micro text-foreground-secondary mb-0.5">{s.label}</p>
                  <p className="font-display text-2xl font-bold tabular-nums">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {FILTERS.map(f => (
                <FilterDropdown key={f.label} label={f.label} options={f.options} />
              ))}
              <button
                type="button"
                onClick={() => toast("AI suggestions coming soon")}
                className="ml-auto rounded-pill px-5 py-2 text-supporting font-medium gradient-primary text-primary-foreground flex items-center gap-2 lavender-glow hover:opacity-95 transition-opacity"
              >
                <Sparkles className="h-4 w-4" /> AI suggest next move
              </button>
            </div>

            {/* Card grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matches.map(m => (
                <PipelineCard key={m.id} row={m} onOpen={() => setOpenMatch(m)} />
              ))}

              {/* Add new */}
              <Link
                to="/match"
                className="rounded-xl border border-dashed border-border surface-1 p-5 flex flex-col items-center justify-center text-center gap-2 hover:border-strong hover:surface-2 transition-colors min-h-[220px]"
              >
                <div className="h-10 w-10 rounded-lg surface-2 border border-border flex items-center justify-center">
                  <Plus className="h-5 w-5 text-primary" />
                </div>
                <p className="font-display font-semibold text-supporting">Add a new match</p>
                <p className="text-micro text-foreground-secondary">Run MatchAI to discover another brand-fit opportunity.</p>
              </Link>
            </div>
          </motion.div>
        </main>
      </div>

      <Dialog open={!!openMatch} onOpenChange={o => !o && setOpenMatch(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {openMatch && openMatch.brand_data && openMatch.creator_profile ? (
            <EmailGeneration
              brand={openMatch.brand_data}
              creatorHandle={openMatch.creator_profile.handle || openMatch.creator_profile.platform || ""}
              creatorProfile={openMatch.creator_profile}
              onBack={() => setOpenMatch(null)}
            />
          ) : openMatch ? (
            <div className="py-10 text-center space-y-3">
              <p className="font-display text-h3">No outreach saved yet</p>
              <p className="text-supporting text-foreground-secondary">
                This match was created before outreach was saved. Open it in MatchAI to generate emails.
              </p>
              <Link
                to="/match"
                className="inline-block mt-2 rounded-pill px-5 py-2 text-supporting font-medium gradient-primary text-primary-foreground"
              >
                Open MatchAI
              </Link>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const FilterDropdown = ({ label, options }: { label: string; options: string[] }) => {
  const [value, setValue] = useState(options[0]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="surface-1 border border-border rounded-pill px-4 py-2 text-supporting hover:border-strong transition-colors flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
        <span className="text-foreground-secondary">{label}:</span>
        <span className="font-medium text-foreground">{value}</span>
        <ChevronDown className="h-3.5 w-3.5 text-foreground-secondary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[180px]">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map(opt => (
          <DropdownMenuItem
            key={opt}
            onSelect={() => setValue(opt)}
            className={opt === value ? "text-primary font-medium" : ""}
          >
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const logoCache = new Map<string, string | null>();

const useBrandLogo = (name: string) => {
  const [logo, setLogo] = useState<string | null>(() => logoCache.get(name) ?? null);
  useEffect(() => {
    if (!name) return;
    if (logoCache.has(name)) {
      setLogo(logoCache.get(name) ?? null);
      return;
    }
    let cancelled = false;
    (async () => {
      const key = name.trim().toLowerCase();
      try {
        // 1. Check persistent DB cache
        const { data: cached } = await supabase
          .from("brand_logos")
          .select("logo_url")
          .eq("brand_key", key)
          .maybeSingle();
        if (cached) {
          logoCache.set(name, cached.logo_url);
          if (!cancelled) setLogo(cached.logo_url);
          return;
        }
        // 2. Fetch from Clearbit
        const res = await fetch(
          `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(name)}`
        );
        const data = await res.json();
        const first = Array.isArray(data) && data[0] ? data[0] : null;
        const url = first?.logo ?? null;
        const domain = first?.domain ?? null;
        logoCache.set(name, url);
        if (!cancelled) setLogo(url);
        // 3. Persist (best-effort)
        await supabase
          .from("brand_logos")
          .upsert({ brand_key: key, brand_name: name, logo_url: url, domain }, { onConflict: "brand_key" });
      } catch {
        logoCache.set(name, null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [name]);
  return logo;
};

const scoreTone = (score: number) => {
  if (score >= 80) return { label: "Strong fit", text: "text-emerald-400", bar: "bg-emerald-400", ring: "border-emerald-400/40 bg-emerald-400/10" };
  if (score >= 60) return { label: "Good fit", text: "text-primary", bar: "bg-primary", ring: "border-primary/40 bg-primary/10" };
  if (score >= 40) return { label: "Fair fit", text: "text-amber-400", bar: "bg-amber-400", ring: "border-amber-400/40 bg-amber-400/10" };
  return { label: "Low fit", text: "text-foreground-secondary", bar: "bg-foreground-secondary", ring: "border-border bg-muted" };
};

const PipelineCard = ({ row, onOpen }: { row: MatchRow; onOpen: () => void }) => {
  const name = row.brand_name ?? "Untitled";
  const subtitle = [row.niche, row.platform].filter(Boolean).join(" · ");
  const logo = useBrandLogo(name);
  const [imgFailed, setImgFailed] = useState(false);
  const score = typeof row.brand_data?.matchScore === "number" ? Math.round(row.brand_data.matchScore) : null;
  const tone = score !== null ? scoreTone(score) : null;
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onOpen}
      className="cursor-pointer text-left rounded-xl border border-border surface-1 p-5 flex flex-col gap-4 hover:border-strong hover:surface-2 transition-colors min-h-[220px]"
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="h-11 w-11 rounded-lg surface-2 border border-border flex items-center justify-center overflow-hidden">
          {logo && !imgFailed ? (
            <img
              src={logo}
              alt={`${name} logo`}
              className="h-full w-full object-contain"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span className="font-display font-bold text-primary">{name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        {score !== null && tone && (
          <div className={`shrink-0 rounded-pill border px-2.5 py-1 flex items-center gap-1.5 ${tone.ring}`}>
            <span className={`font-display font-bold text-supporting tabular-nums ${tone.text}`}>{score}</span>
            <span className="text-[10px] tracking-wide font-semibold text-foreground-secondary uppercase">fit</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-display font-bold text-h3 mb-0.5 truncate">{name}</h3>
        {subtitle && <p className="text-micro text-foreground-secondary">{subtitle}</p>}
      </div>

      {score !== null && tone && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] tracking-[0.18em] font-semibold uppercase">
            <span className="text-foreground-secondary">Brand fit</span>
            <span className={tone.text}>{tone.label}</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div className={`h-full rounded-full transition-all ${tone.bar}`} style={{ width: `${score}%` }} />
          </div>
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-border flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] tracking-[0.18em] text-foreground-secondary font-semibold mb-1">
            UPDATED
          </p>
          <p className="font-display font-semibold text-supporting truncate">{formatRelative(row.updated_at)}</p>
        </div>
        <span
          className="h-8 w-8 rounded-lg surface-2 border border-border flex items-center justify-center text-foreground-secondary"
          aria-hidden="true"
        >
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </motion.article>
  );
};

export default Pipeline;
