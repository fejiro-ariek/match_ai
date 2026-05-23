import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeLogo from "@/components/ThemeLogo";

const navLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("/#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center flex-shrink-0">
          <ThemeLogo className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollToSection(l.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
            <Link to="/auth">Log in</Link>
          </Button>
          <Button size="sm" className="gradient-primary text-primary-foreground">
            Get started free
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden ml-auto flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-border/50 px-4 pb-4 pt-2 space-y-3">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollToSection(l.href)}
              className="block w-full text-left text-sm text-muted-foreground hover:text-foreground py-2"
            >
              {l.label}
            </button>
          ))}
          <div className="flex gap-2 pt-2">
            <Button asChild variant="ghost" size="sm" className="flex-1"><Link to="/auth">Log in</Link></Button>
            <Button size="sm" className="flex-1 gradient-primary text-primary-foreground">Get started</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
