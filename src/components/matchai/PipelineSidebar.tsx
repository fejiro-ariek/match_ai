import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Building2,
  BarChart3,
  Settings,
  PanelLeft,
  PanelLeftClose,
  LogOut,
  Loader2,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeLogo from "@/components/ThemeLogo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const NAV = [
  { label: "Pipeline", to: "/pipeline", icon: Building2 },
];

const ANALYSIS = [
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Settings", to: "/settings", icon: Settings },
];

const PIN_KEY = "pipeline-sidebar-pinned";

const PipelineSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [pinned, setPinned] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(PIN_KEY) === "1";
  });
  const [hovered, setHovered] = useState(false);
  const [name, setName] = useState<string>("Guest");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  const expanded = pinned || hovered;

  useEffect(() => {
    localStorage.setItem(PIN_KEY, pinned ? "1" : "0");
  }, [pinned]);

  useEffect(() => {
    let active = true;

    const loadProfile = async (userId: string, fallback: string) => {
      const { data } = await supabase
        .from("profiles")
        .select("name, avatar_url")
        .eq("id", userId)
        .maybeSingle();
      if (!active) return;
      setName(data?.name?.trim() || fallback);
      setAvatarUrl(data?.avatar_url ?? null);
    };

    const applySession = (user: { id: string; email?: string | null; user_metadata?: unknown } | null) => {
      if (!active) return;
      if (!user) {
        setName("Guest");
        setAvatarUrl(null);
        setSignedIn(false);
        return;
      }
      setSignedIn(true);
      const fallback =
        (user.user_metadata as { name?: string } | null)?.name ||
        user.email?.split("@")[0] ||
        "Guest";
      setTimeout(() => {
        if (active) loadProfile(user.id, fallback);
      }, 0);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      applySession(session?.user ?? null);
    });

    const onProfileUpdated = (e: Event) => {
      const detail = (e as CustomEvent<{ avatarUrl?: string | null; name?: string }>).detail;
      if (!detail) return;
      if (typeof detail.name === "string" && detail.name.trim()) setName(detail.name.trim());
      if (detail.avatarUrl !== undefined) setAvatarUrl(detail.avatarUrl);
    };
    window.addEventListener("profile:updated", onProfileUpdated);

    return () => {
      active = false;
      sub.subscription.unsubscribe();
      window.removeEventListener("profile:updated", onProfileUpdated);
    };
  }, []);

  const initial = (name?.charAt(0) || "G").toUpperCase();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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

  const renderItem = (item: typeof NAV[number]) => {
    const Icon = item.icon;
    const active = pathname === item.to;
    const link = (
      <NavLink
        to={item.to}
        className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-supporting transition-colors ${
          active
            ? "bg-primary/10 text-primary border border-primary/30"
            : "text-foreground-secondary border border-transparent hover:text-primary hover:bg-primary/10 hover:border-primary/20"
        }`}
      >
        {active && (
          <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-primary" />
        )}
        <Icon
          className={`h-4 w-4 shrink-0 transition-colors ${
            active ? "text-primary" : "text-foreground-secondary group-hover:text-primary"
          }`}
        />
        <span
          className={`font-medium whitespace-nowrap transition-opacity duration-150 ${
            expanded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {item.label}
        </span>
      </NavLink>
    );

    if (expanded) return <div key={item.label}>{link}</div>;
    return (
      <Tooltip key={item.label} delayDuration={0}>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider>
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 glass shadow-lg">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <NavLink to="/" className="flex items-center flex-shrink-0">
            <ThemeLogo className="h-10 w-auto" />
          </NavLink>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Toggle menu"
                className="ml-auto flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors text-foreground"
              >
                <Menu size={22} />
              </button>
            </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0 surface-1 flex flex-col">
            <div className="px-4 py-5 border-b border-border flex items-center gap-2">
              <ThemeLogo className="h-7 w-auto" />
              <span className="text-[10px] tracking-[0.18em] text-foreground-secondary font-medium">
                CREATOR PRO
              </span>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {NAV.map(item => {
                const Icon = item.icon;
                const active = pathname === item.to;
                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-supporting font-medium ${
                      active
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "text-foreground-secondary border border-transparent hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                );
              })}
              <div className="my-4 border-t border-border" />
              <p className="text-[10px] tracking-[0.18em] text-foreground-secondary font-medium px-3 pb-2">
                ANALYSIS
              </p>
              {ANALYSIS.map(item => {
                const Icon = item.icon;
                const active = pathname === item.to;
                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-supporting font-medium ${
                      active
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "text-foreground-secondary border border-transparent hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
            <div className="p-3 border-t border-border">
              <div className="flex items-center gap-2 px-2 py-2 surface-2 border border-border rounded-lg">
                <NavLink
                  to="/settings"
                  className="h-9 w-9 shrink-0 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-supporting font-semibold text-primary overflow-hidden"
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
                  ) : (
                    initial
                  )}
                </NavLink>
                <div className="min-w-0 flex-1">
                  <p className="text-supporting font-semibold truncate">{name}</p>
                </div>
                {signedIn && (
                  <button
                    type="button"
                    onClick={() => setConfirmOpen(true)}
                    disabled={signingOut}
                    aria-label="Log out"
                    className="shrink-0 h-8 w-8 rounded-md flex items-center justify-center text-foreground-secondary hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-60"
                  >
                    {signingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                  </button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </header>

      <div
        className={`hidden lg:block shrink-0 transition-[width] duration-200 ease-out ${
          pinned ? "w-60" : "w-14"
        }`}
        aria-hidden
      />

      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`hidden lg:flex fixed left-0 top-0 z-30 flex-col surface-1 border-r border-border h-screen transition-[width] duration-200 ease-out ${
          expanded ? "w-60 shadow-xl" : "w-14"
        }`}
      >
        <div className="px-3 py-5 border-b border-border flex items-center justify-between gap-2 overflow-hidden">
          <NavLink to="/" className="flex flex-col gap-0.5 min-w-0">
            <ThemeLogo className={`h-7 w-auto transition-all ${expanded ? "" : "max-w-[28px] object-contain"}`} />
            <span
              className={`text-[10px] tracking-[0.18em] text-foreground-secondary font-medium whitespace-nowrap transition-opacity ${
                expanded ? "opacity-100" : "opacity-0"
              }`}
            >
              CREATOR PRO
            </span>
          </NavLink>
          <button
            type="button"
            onClick={() => setPinned(p => !p)}
            aria-label={pinned ? "Unpin sidebar" : "Pin sidebar"}
            className={`shrink-0 h-7 w-7 rounded-md surface-2 border border-border flex items-center justify-center text-foreground-secondary hover:text-foreground transition-opacity ${
              expanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {pinned ? <PanelLeftClose className="h-3.5 w-3.5" /> : <PanelLeft className="h-3.5 w-3.5" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4 space-y-1">
          {NAV.map(renderItem)}
          <div className="mt-5 mb-5 border-t border-border" role="separator" aria-hidden />
          {expanded && (
            <p className="text-[10px] tracking-[0.18em] text-foreground-secondary font-medium px-3 pt-2 pb-3">
              ANALYSIS
            </p>
          )}
          {ANALYSIS.map(renderItem)}
        </nav>

        <div className="py-4 px-2 border-t border-border">
          <div
            className={`flex items-center rounded-lg transition-all ${
              expanded
                ? "gap-2 px-2 py-2 surface-2 border border-border"
                : "justify-center"
            }`}
          >
            <NavLink
              to="/settings"
              className="h-9 w-9 shrink-0 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-supporting font-semibold text-primary overflow-hidden"
              aria-label="Open settings"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
              ) : (
                initial
              )}
            </NavLink>
            {expanded && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="text-supporting font-semibold truncate">{name}</p>
                </div>
                {signedIn && (
                  <button
                    type="button"
                    onClick={() => setConfirmOpen(true)}
                    disabled={signingOut}
                    aria-label="Log out"
                    title="Log out"
                    className="shrink-0 h-8 w-8 rounded-md flex items-center justify-center text-foreground-secondary hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/30 transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:text-foreground-secondary disabled:hover:bg-transparent disabled:hover:border-transparent"
                  >
                    {signingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </aside>

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
    </TooltipProvider>
  );
};

export default PipelineSidebar;
