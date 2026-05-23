import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Ensures a row in `profiles` exists for the current user on every sign-in.
 * Defense-in-depth so avatar/name updates can never silently affect 0 rows.
 */
const ensureProfile = async (user: {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
}) => {
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (existing) return;

  const meta = (user.user_metadata ?? {}) as { name?: string; full_name?: string };
  const name =
    meta.name?.trim() ||
    meta.full_name?.trim() ||
    user.email?.split("@")[0] ||
    "";

  await supabase.from("profiles").upsert(
    { id: user.id, email: user.email ?? "", name },
    { onConflict: "id" },
  );
};

const EnsureProfile = () => {
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      if (!user) return;
      // Fire-and-forget — never block the auth callback
      setTimeout(() => {
        ensureProfile(user).catch(() => {});
      }, 0);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user;
      if (user) ensureProfile(user).catch(() => {});
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return null;
};

export default EnsureProfile;
