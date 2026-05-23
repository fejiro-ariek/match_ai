import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  platform: string;
  followers: string;
  niche: string;
  description: string;
  handle?: string;
}

interface InputFormProps {
  onSubmit: (data: FormData) => void;
}

const platforms = ["TikTok", "Instagram", "YouTube", "Twitter/X"];

const PillSelector = ({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map((opt) => (
      <button
        key={opt}
        type="button"
        onClick={() => onChange(opt)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
          value === opt
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-card text-foreground border-border hover:bg-accent"
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);

const InputForm = ({ onSubmit }: InputFormProps) => {
  const [form, setForm] = useState<FormData>({
    platform: "",
    followers: "",
    niche: "",
    description: "",
  });

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isValid = form.platform && form.followers && form.niche && form.description;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onSubmit(form);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full space-y-6"
    >
      <div>
        <h1 className="font-display text-h2 tracking-tight">
          Tell MatchAI about your content
        </h1>
        <p className="mt-2 text-foreground-secondary text-body">
          We'll tailor your positioning, packages, pricing guidance, and brand-fit opportunities to your niche.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium mb-2 block">Platform</label>
          <PillSelector options={platforms} value={form.platform} onChange={(v) => update("platform", v)} />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Follower count</label>
          <Input placeholder="Your main platform follower count" value={form.followers} onChange={(e) => update("followers", e.target.value)} />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Niche</label>
          <Input placeholder="fitness, gym, workouts" value={form.niche} onChange={(e) => update("niche", e.target.value)} />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">What do you post?</label>
          <Textarea placeholder="In one sentence, what do you post?" value={form.description} onChange={(e) => update("description", e.target.value)} rows={2} />
        </div>
      </div>

      <Button type="submit" disabled={!isValid} className="w-full group rounded-lg gradient-primary text-primary-foreground" size="lg">
        See my matches, rates, and package ideas
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </motion.form>
  );
};

export type { FormData };
export default InputForm;
