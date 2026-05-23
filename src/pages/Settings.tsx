import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Mail, User as UserIcon, ShieldCheck, Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import PipelineSidebar from "@/components/matchai/PipelineSidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string | null;
}

const Settings = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async (userId: string, email: string, fallbackName: string) => {
      const [{ data: prof }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("name, email, avatar_url").eq("id", userId).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", userId),
      ]);
      if (!active) return;
      const next: Profile = {
        id: userId,
        name: prof?.name?.trim() || fallbackName,
        email: prof?.email || email,
        role: roles?.[0]?.role ?? "user",
        avatarUrl: prof?.avatar_url ?? null,
      };
      setProfile(next);
      setNameInput(next.name);
      setLoading(false);
    };

    const apply = (user: { id: string; email?: string | null; user_metadata?: unknown } | null) => {
      if (!user) {
        if (active) {
          setProfile(null);
          setLoading(false);
        }
        return;
      }
      const fallback =
        (user.user_metadata as { name?: string } | null)?.name ||
        user.email?.split("@")[0] ||
        "Creator";
      setTimeout(() => {
        if (active) load(user.id, user.email ?? "", fallback);
      }, 0);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      apply(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      apply(session?.user ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    setSigningOut(true);
    // Hard fallback: never let the user get stuck on the loader.
    const fallback = window.setTimeout(() => {
      window.location.assign("/auth");
    }, 2500);
    try {
      // scope: 'local' clears the local session immediately and avoids
      // hanging when the server-side /logout call is slow or unreachable.
      await supabase.auth.signOut({ scope: "local" });
      toast.success("Signed out");
    } catch {
      toast.error("Signed out locally");
    } finally {
      window.clearTimeout(fallback);
      window.location.assign("/auth");
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !profile) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const path = `${profile.id}/avatar.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true, contentType: file.type });
    if (upErr) {
      setUploading(false);
      toast.error("Upload failed");
      return;
    }
    const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
    const url = `${pub.publicUrl}?t=${Date.now()}`;
    const { error: updErr } = await supabase
      .from("profiles")
      .upsert({ id: profile.id, email: profile.email, name: profile.name, avatar_url: url }, { onConflict: "id" });
    setUploading(false);
    if (updErr) {
      toast.error("Couldn't save avatar");
      return;
    }
    setProfile({ ...profile, avatarUrl: url });
    window.dispatchEvent(new CustomEvent("profile:updated", { detail: { avatarUrl: url, name: profile.name } }));
    toast.success("Profile picture updated");
  };

  const handleSave = async () => {
    if (!profile) return;
    const next = nameInput.trim();
    if (!next) {
      toast.error("Name can't be empty");
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: profile.id, email: profile.email, name: next, avatar_url: profile.avatarUrl }, { onConflict: "id" });
    setSaving(false);
    if (error) {
      toast.error("Couldn't save changes");
      return;
    }
    setProfile({ ...profile, name: next });
    window.dispatchEvent(new CustomEvent("profile:updated", { detail: { avatarUrl: profile.avatarUrl, name: next } }));
    toast.success("Profile updated");
  };

  const initial = (profile?.name?.charAt(0) || "C").toUpperCase();
  const dirty = profile ? nameInput.trim() !== profile.name : false;

  return (
    <div className="min-h-screen bg-background flex">
      <PipelineSidebar />

      <div className="flex-1 min-w-0">
        <main className="px-4 sm:px-6 pt-20 lg:pt-8 pb-8 max-w-3xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8">
              <h1 className="font-display text-h1 mb-2">Settings</h1>
              <p className="text-body text-foreground-secondary">
                Manage your account and session.
              </p>
            </div>

            {loading ? (
              <div className="rounded-xl border border-border surface-1 p-6 animate-pulse">
                <div className="h-16 w-16 rounded-full surface-2 mb-4" />
                <div className="h-4 w-40 surface-2 rounded mb-2" />
                <div className="h-3 w-56 surface-2 rounded" />
              </div>
            ) : !profile ? (
              <div className="rounded-xl border border-border surface-1 p-8 text-center">
                <p className="font-display text-h3 mb-2">You're signed out</p>
                <p className="text-supporting text-foreground-secondary mb-5">
                  Sign in to manage your account.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/auth")}
                  className="rounded-pill px-5 py-2.5 text-supporting font-medium gradient-primary text-primary-foreground hover:opacity-95 transition-opacity"
                >
                  Sign in
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <section className="rounded-xl border border-border surface-1 p-6">
                  <p className="text-[10px] tracking-[0.18em] text-foreground-secondary font-semibold mb-4">
                    PROFILE
                  </p>

                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center font-display font-bold text-2xl text-primary overflow-hidden">
                        {profile.avatarUrl ? (
                          <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" />
                        ) : (
                          initial
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        disabled={uploading}
                        aria-label="Change profile picture"
                        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full gradient-primary text-primary-foreground border-2 border-background flex items-center justify-center hover:opacity-95 transition-opacity disabled:opacity-60"
                      >
                        {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Camera className="h-3.5 w-3.5" />}
                      </button>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-h3 truncate">{profile.name}</p>
                      <p className="text-supporting text-foreground-secondary truncate">{profile.email}</p>
                      <p className="text-micro text-foreground-secondary mt-1">PNG or JPG, up to 2MB</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block">
                      <span className="flex items-center gap-2 mb-1.5 text-foreground-secondary">
                        <UserIcon className="h-3.5 w-3.5" />
                        <span className="text-micro font-semibold">Display name</span>
                      </span>
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="w-full rounded-lg border border-border surface-2 px-4 py-2.5 text-supporting font-medium text-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-colors"
                        placeholder="Your name"
                      />
                    </label>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <ReadField icon={Mail} label="Email" value={profile.email} />
                      <ReadField icon={ShieldCheck} label="Role" value={profile.role} capitalize />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={handleSave}
                        disabled={!dirty || saving}
                        className="rounded-pill px-5 py-2.5 text-supporting font-medium gradient-primary text-primary-foreground hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving ? "Saving…" : "Save changes"}
                      </button>
                    </div>
                  </div>
                </section>

                <section className="rounded-xl border border-border surface-1 p-6">
                  <p className="text-[10px] tracking-[0.18em] text-foreground-secondary font-semibold mb-2">
                    SESSION
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-supporting text-foreground-secondary">
                      Sign out of MatchAI on this device.
                    </p>
                    <button
                      type="button"
                      onClick={() => setConfirmOpen(true)}
                      disabled={signingOut}
                      className="inline-flex items-center justify-center gap-2 rounded-pill px-5 py-2.5 text-supporting font-medium border border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {signingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                      {signingOut ? "Signing out…" : "Log out"}
                    </button>
                  </div>
                </section>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={(o) => !signingOut && setConfirmOpen(o)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out of MatchAI?</AlertDialogTitle>
            <AlertDialogDescription>
              You'll need to sign in again to access your pipeline and brand matches.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={signingOut}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              disabled={signingOut}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {signingOut ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing out…
                </span>
              ) : (
                "Log out"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const ReadField = ({
  icon: Icon,
  label,
  value,
  capitalize,
}: {
  icon: typeof UserIcon;
  label: string;
  value: string;
  capitalize?: boolean;
}) => (
  <div className="rounded-lg border border-border surface-2 px-4 py-3">
    <div className="flex items-center gap-2 mb-1 text-foreground-secondary">
      <Icon className="h-3.5 w-3.5" />
      <span className="text-micro font-semibold">{label}</span>
    </div>
    <p className={`text-supporting font-medium truncate ${capitalize ? "capitalize" : ""}`}>{value}</p>
  </div>
);

export default Settings;
