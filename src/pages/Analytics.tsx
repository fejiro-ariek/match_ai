import { motion } from "framer-motion";
import { Sparkles, TrendingUp, MailCheck, Calendar, DollarSign, Bell } from "lucide-react";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import PipelineSidebar from "@/components/matchai/PipelineSidebar";

const KPIS = [
  { label: "Sent", value: "1,284", delta: "+12%", icon: MailCheck },
  { label: "Reply rate", value: "32%", delta: "+4.1%", icon: TrendingUp },
  { label: "Meetings", value: "47", delta: "+8", icon: Calendar },
  { label: "Revenue", value: "$24.8k", delta: "+22%", icon: DollarSign },
];

const AREA = [
  { day: "Mon", v: 18 },
  { day: "Tue", v: 32 },
  { day: "Wed", v: 27 },
  { day: "Thu", v: 48 },
  { day: "Fri", v: 41 },
  { day: "Sat", v: 62 },
  { day: "Sun", v: 78 },
];

const BARS = [
  { brand: "Gymshark", v: 84 },
  { brand: "Notion", v: 71 },
  { brand: "Glossier", v: 63 },
  { brand: "Linear", v: 52 },
  { brand: "Figma", v: 44 },
];

const ACTIVITY = [
  { brand: "Gymshark", status: "Replied", time: "2h ago" },
  { brand: "Notion", status: "Opened", time: "5h ago" },
  { brand: "Glossier", status: "Sent", time: "yesterday" },
  { brand: "Linear", status: "Meeting booked", time: "2d ago" },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <PipelineSidebar />

      <div className="flex-1 min-w-0">
        <main className="px-4 sm:px-6 pt-20 lg:pt-8 pb-8 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8">
              <h1 className="font-display text-h1 mb-2">Analytics</h1>
              <p className="text-body text-foreground-secondary max-w-2xl">
                Track outreach performance, reply rates, and revenue from brand deals.
              </p>
            </div>

            <div className="relative">
              {/* Blurred preview */}
              <div className="filter blur-md pointer-events-none select-none space-y-4">
                {/* KPI row */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {KPIS.map(k => {
                    const Icon = k.icon;
                    return (
                      <div key={k.label} className="rounded-xl border border-border surface-1 p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="h-9 w-9 rounded-lg surface-2 border border-border flex items-center justify-center">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-micro font-semibold text-primary">{k.delta}</span>
                        </div>
                        <p className="font-display font-bold text-2xl tabular-nums">{k.value}</p>
                        <p className="text-micro text-foreground-secondary mt-0.5">{k.label}</p>
                      </div>
                    );
                  })}
                </motion.div>

                {/* Area chart */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="rounded-xl border border-border surface-1 p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-display font-semibold">Outreach volume</p>
                      <p className="text-micro text-foreground-secondary">Last 7 days</p>
                    </div>
                  </div>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={AREA}>
                        <defs>
                          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.55} />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke="hsl(var(--foreground-secondary))" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--foreground-secondary))" fontSize={11} tickLine={false} axisLine={false} />
                        <RechartsTooltip />
                        <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#areaFill)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Bar + activity */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="grid lg:grid-cols-2 gap-4"
                >
                  <div className="rounded-xl border border-border surface-1 p-5">
                    <p className="font-display font-semibold mb-1">Top brands</p>
                    <p className="text-micro text-foreground-secondary mb-4">By engagement score</p>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={BARS}>
                          <XAxis dataKey="brand" stroke="hsl(var(--foreground-secondary))" fontSize={11} tickLine={false} axisLine={false} />
                          <YAxis stroke="hsl(var(--foreground-secondary))" fontSize={11} tickLine={false} axisLine={false} />
                          <RechartsTooltip />
                          <Bar dataKey="v" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border surface-1 p-5">
                    <p className="font-display font-semibold mb-1">Recent activity</p>
                    <p className="text-micro text-foreground-secondary mb-4">Last 24 hours</p>
                    <ul className="space-y-2">
                      {ACTIVITY.map(a => (
                        <li
                          key={a.brand}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg surface-2 border border-border"
                        >
                          <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center font-display font-bold text-primary">
                            {a.brand.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-supporting font-semibold truncate">{a.brand}</p>
                            <p className="text-micro text-foreground-secondary">{a.time}</p>
                          </div>
                          <span className="text-micro font-semibold text-primary px-2 py-1 rounded-pill bg-primary/10 border border-primary/20">
                            {a.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Coming soon overlay */}
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="surface-1 border border-border rounded-2xl px-8 py-10 max-w-md w-full text-center shadow-2xl lavender-glow"
                  style={{ boxShadow: "0 30px 80px -20px hsl(var(--primary) / 0.35)" }}
                >
                  <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] font-semibold text-primary px-3 py-1 rounded-pill bg-primary/10 border border-primary/20 mb-5">
                    <Sparkles className="h-3 w-3" /> ANALYTICS
                  </span>
                  <h2 className="font-display text-h2 gradient-text mb-3">Coming soon</h2>
                  <p className="text-supporting text-foreground-secondary mb-6">
                    We&apos;re cooking up reply-rate, conversion, and revenue insights tied directly to your pipeline. Sit tight.
                  </p>
                  <button
                    type="button"
                    onClick={() => toast("We'll let you know when it's live")}
                    className="inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-supporting font-medium gradient-primary text-primary-foreground hover:opacity-95 transition-opacity"
                  >
                    <Bell className="h-4 w-4" /> Notify me
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
