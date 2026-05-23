import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      fontSize: {
        // Brief Section 6 type scale
        "h1": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h2": ["clamp(1.75rem, 4vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "700" }],
        "h3": ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.55" }],
        "body": ["1rem", { lineHeight: "1.55" }],
        "supporting": ["0.875rem", { lineHeight: "1.5" }],
        "micro": ["0.75rem", { lineHeight: "1.4" }],
      },
      colors: {
        border: "hsl(var(--border))",
        "border-strong": "hsl(var(--border-strong))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "foreground-secondary": "hsl(var(--foreground-secondary))",
        "foreground-disabled": "hsl(var(--foreground-disabled))",
        surface: {
          1: "hsl(var(--surface-1))",
          2: "hsl(var(--surface-2))",
          3: "hsl(var(--surface-3))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          pressed: "hsl(var(--primary-pressed))",
        },
        indigo: "hsl(var(--indigo))",
        "lavender-glow": "hsl(var(--lavender-glow))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        info: "hsl(var(--info))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        // Refreshed radii: btn/input 16, cards 24, auth/pricing 28
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",          // 16 — buttons/inputs
        xl: "1.5rem",        // 24 — cards
        "2xl": "1.75rem",    // 28 — auth/pricing
        pill: "9999px",
      },
      boxShadow: {
        depth: "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -4px rgba(0,0,0,0.5), 0 24px 48px -12px rgba(139,92,246,0.18)",
        glow: "0 0 60px -10px rgba(168,85,247,0.35)",
      },
      backdropBlur: {
        glass: "24px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.6" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
