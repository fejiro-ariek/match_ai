import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, Pencil, RefreshCw, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { Brand } from "./AnalysisResults";
import type { FormData } from "./InputForm";

interface EmailGenerationProps {
  brand: Brand;
  creatorHandle: string;
  creatorProfile?: FormData;
  onBack: () => void;
}

const tones = ["Casual", "Professional", "Direct", "Short"] as const;
type Tone = (typeof tones)[number];

interface EmailBlock {
  title: string;
  subject: string;
  content: string;
  editing: boolean;
}

const EmailGeneration = ({ brand, creatorHandle, creatorProfile, onBack }: EmailGenerationProps) => {
  const navigate = useNavigate();
  const [tone, setTone] = useState<Tone>("Professional");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [blocks, setBlocks] = useState<EmailBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [regeneratingIdx, setRegeneratingIdx] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();
  }, []);

  const fetchEmails = async (selectedTone: Tone) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-email", {
        body: {
          brand,
          creatorHandle,
          creatorProfile,
          tone: selectedTone,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const emails = data.emails || [];
      setBlocks(
        emails.map((e: any) => ({
          title: e.title || "Email",
          subject: e.subject || "",
          content: e.subject ? `Subject: ${e.subject}\n\n${e.content}` : e.content,
          editing: false,
        }))
      );
      setHasGeneratedOnce(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to generate emails");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails(tone);
  }, []);

  const showLockOverlay = hasGeneratedOnce && !isAuthenticated;

  const handleToneChange = (t: Tone) => {
    if (showLockOverlay) return;
    setTone(t);
    fetchEmails(t);
  };

  const handleCopy = async (idx: number) => {
    await navigator.clipboard.writeText(blocks[idx].content);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const toggleEdit = (idx: number) => {
    setBlocks((prev) =>
      prev.map((b, i) => (i === idx ? { ...b, editing: !b.editing } : b))
    );
  };

  const handleRegenerate = async (idx: number) => {
    if (showLockOverlay) return;
    setRegeneratingIdx(idx);
    try {
      const { data, error } = await supabase.functions.invoke("generate-email", {
        body: {
          brand,
          creatorHandle,
          creatorProfile,
          tone,
        },
      });
      if (error) throw error;
      if (data?.emails?.[idx]) {
        const e = data.emails[idx];
        setBlocks((prev) =>
          prev.map((b, i) =>
            i === idx
              ? {
                  ...b,
                  title: e.title || b.title,
                  subject: e.subject || "",
                  content: e.subject ? `Subject: ${e.subject}\n\n${e.content}` : e.content,
                  editing: false,
                }
              : b
          )
        );
      }
    } catch (err: any) {
      toast.error("Failed to regenerate email");
    } finally {
      setRegeneratingIdx(null);
    }
  };

  const updateContent = (idx: number, value: string) => {
    setBlocks((prev) =>
      prev.map((b, i) => (i === idx ? { ...b, content: value } : b))
    );
  };

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-foreground-secondary text-supporting">Preparing personalized outreach directions…</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full space-y-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-supporting text-foreground-secondary hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="h-4 w-4" /> Back to opportunities
          </button>
          <h2 className="font-display text-h2">
            Personalized outreach
          </h2>
          <p className="mt-2 text-foreground-secondary text-body">
            MatchAI writes brand-specific outreach for {brand.name} based on your positioning, package, and fit.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tones.map((t) => (
          <button
            key={t}
            onClick={() => handleToneChange(t)}
            disabled={showLockOverlay}
            className={`px-4 py-1.5 rounded-pill text-supporting font-medium transition-colors border ${
              tone === t
                ? "bg-primary text-primary-foreground border-primary"
                : "surface-2 text-foreground-secondary border-border hover:border-border-strong"
            } ${showLockOverlay ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground font-medium">Ready to send or edit</p>

      <div className="space-y-4 relative">
        {blocks.map((block, idx) => (
          <div key={idx} className="border border-border/40 rounded-xl p-4 bg-card/60 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm">{block.title}</h3>
              <span className="text-xs text-muted-foreground">
                {wordCount(block.content)} words
              </span>
            </div>

            {block.editing ? (
              <Textarea
                value={block.content}
                onChange={(e) => updateContent(idx, e.target.value)}
                rows={10}
                className="font-mono text-sm border-0 bg-transparent resize-none focus-visible:ring-0 p-0"
              />
            ) : (
              <pre className="text-sm whitespace-pre-wrap text-foreground/80 leading-relaxed">
                {block.content}
              </pre>
            )}

            <div className="flex gap-2 pt-1">
              <Button variant="outline" size="sm" onClick={() => handleCopy(idx)} className="gap-1.5 text-xs">
                {copiedIdx === idx ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
              </Button>
              <Button variant="outline" size="sm" onClick={() => toggleEdit(idx)} className="gap-1.5 text-xs">
                <Pencil className="h-3.5 w-3.5" /> {block.editing ? "Done" : "Edit"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRegenerate(idx)}
                className="gap-1.5 text-xs"
                disabled={regeneratingIdx === idx || showLockOverlay}
              >
                {regeneratingIdx === idx ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5" />
                )}
                Regenerate
              </Button>
            </div>
          </div>
        ))}

        {/* Lock overlay for unauthenticated users */}
        {showLockOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 top-[120px] bg-gradient-to-t from-background via-background/95 to-background/60 flex flex-col items-center justify-center rounded-xl"
          >
            <div className="text-center space-y-4 px-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold tracking-tight">
                Unlock unlimited emails and all brand matches
              </h3>
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground"
                onClick={() => navigate("/auth?return=/match")}
              >
                Create free account
              </Button>
              <p className="text-xs text-muted-foreground">No credit card needed</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EmailGeneration;
