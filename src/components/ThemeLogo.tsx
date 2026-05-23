import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import logoDark from "@/assets/matchai-logo-dark.png";
import logoLight from "@/assets/matchai-logo-light.png";

const ThemeLogo = ({ className = "h-10 w-auto" }: { className?: string }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const src = mounted && resolvedTheme === "light" ? logoLight : logoDark;

  return <img src={src} alt="MatchAI" className={className} />;
};

export default ThemeLogo;
