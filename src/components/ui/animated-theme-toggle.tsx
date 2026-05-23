import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const AnimatedThemeToggle = ({ className }: { className?: string }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-md",
          className
        )}
        aria-label="Toggle theme"
      >
        <span className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
      aria-label="Toggle theme"
    >
      <SolarSwitch isDark={isDark} />
    </button>
  );
};

const SolarSwitch = ({ isDark }: { isDark: boolean }) => {
  const duration = 0.7;

  const moonVariants = {
    checked: { scale: 1 },
    unchecked: { scale: 0 },
  };

  const sunVariants = {
    checked: { scale: 0 },
    unchecked: { scale: 1 },
  };

  const scaleMoon = useMotionValue(isDark ? 1 : 0);
  const scaleSun = useMotionValue(isDark ? 0 : 1);
  const pathLengthMoon = useTransform(scaleMoon, [0.6, 1], [0, 1]);
  const pathLengthSun = useTransform(scaleSun, [0.6, 1], [0, 1]);

  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative"
    >
      <motion.circle
        cx="12.5"
        cy="12.5"
        r="5"
        stroke="currentColor"
        strokeWidth="1.5"
        variants={sunVariants}
        initial={isDark ? "checked" : "unchecked"}
        animate={isDark ? "checked" : "unchecked"}
        transition={{ duration }}
        style={{ scale: scaleSun, pathLength: pathLengthSun }}
      />
      <motion.line x1="12.5" y1="2" x2="12.5" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        variants={sunVariants} initial={isDark ? "checked" : "unchecked"} animate={isDark ? "checked" : "unchecked"} transition={{ duration }} style={{ scale: scaleSun }} />
      <motion.line x1="12.5" y1="20" x2="12.5" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        variants={sunVariants} initial={isDark ? "checked" : "unchecked"} animate={isDark ? "checked" : "unchecked"} transition={{ duration }} style={{ scale: scaleSun }} />
      <motion.line x1="4.5" y1="4.5" x2="6.5" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        variants={sunVariants} initial={isDark ? "checked" : "unchecked"} animate={isDark ? "checked" : "unchecked"} transition={{ duration }} style={{ scale: scaleSun }} />
      <motion.line x1="18.5" y1="18.5" x2="20.5" y2="20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        variants={sunVariants} initial={isDark ? "checked" : "unchecked"} animate={isDark ? "checked" : "unchecked"} transition={{ duration }} style={{ scale: scaleSun }} />
      <motion.line x1="2" y1="12.5" x2="5" y2="12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        variants={sunVariants} initial={isDark ? "checked" : "unchecked"} animate={isDark ? "checked" : "unchecked"} transition={{ duration }} style={{ scale: scaleSun }} />
      <motion.line x1="20" y1="12.5" x2="23" y2="12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        variants={sunVariants} initial={isDark ? "checked" : "unchecked"} animate={isDark ? "checked" : "unchecked"} transition={{ duration }} style={{ scale: scaleSun }} />
      <motion.line x1="4.5" y1="20.5" x2="6.5" y2="18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        variants={sunVariants} initial={isDark ? "checked" : "unchecked"} animate={isDark ? "checked" : "unchecked"} transition={{ duration }} style={{ scale: scaleSun }} />
      <motion.line x1="18.5" y1="6.5" x2="20.5" y2="4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        variants={sunVariants} initial={isDark ? "checked" : "unchecked"} animate={isDark ? "checked" : "unchecked"} transition={{ duration }} style={{ scale: scaleSun }} />
      <motion.path
        d="M12.5 5C8.35786 5 5 8.35786 5 12.5C5 16.6421 8.35786 20 12.5 20C15.5 20 18 18 19.5 15C17 17 14 17.5 11.5 15.5C9 13.5 9 10 10.5 7.5C8 9 7.5 12 9 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={moonVariants}
        initial={isDark ? "checked" : "unchecked"}
        animate={isDark ? "checked" : "unchecked"}
        transition={{ duration }}
        style={{ scale: scaleMoon, pathLength: pathLengthMoon }}
      />
    </motion.svg>
  );
};
