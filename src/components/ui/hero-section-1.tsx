import React from 'react';
import { Link } from 'react-router-dom';
import ThemeLogo from '@/components/ThemeLogo';
import { ArrowRight, ChevronRight, Menu, X, Sparkles, Target, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { TextEffect } from '@/components/ui/text-effect';
import { Spotlight } from '@/components/ui/spotlight';
import { AnimatedThemeToggle } from '@/components/ui/animated-theme-toggle';
import { cn } from '@/lib/utils';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="hsl(var(--primary))"
        />
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="w-140 h-320 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(262,83%,58%,0.08)_0,hsla(262,83%,58%,0.02)_50%,hsla(0,0%,100%,0)_80%)]" />
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_top_right,hsla(185,60%,50%,0.05)_0%,transparent_50%)]" />
        </div>

        <section className="relative pt-24 md:pt-36">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
              <AnimatedGroup preset="blur-slide">
                <Link
                  to="/"
                  className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted"
                >
                  AI-powered brand outreach for creators
                  <ChevronRight className="size-3" />
                </Link>
              </AnimatedGroup>

              <TextEffect
                preset="blur"
                per="word"
                delay={0.2}
                as="h1"
                className="mt-8 text-balance font-display text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl"
              >
                Your personal AI brand deals agent.
              </TextEffect>

              <TextEffect
                per="word"
                as="p"
                delay={0.5}
                preset="blur"
                className="mx-auto mt-6 max-w-2xl text-balance text-lg font-light text-muted-foreground md:text-xl"
              >
                MatchAI analyzes your profile, finds brands that actually fit, and writes outreach emails you can send immediately. No templates. No guesswork.
              </TextEffect>

              <AnimatedGroup
                preset="blur-slide"
                className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <Button
                  size="lg"
                  className="gradient-primary text-primary-foreground px-8 rounded-2xl shadow-depth hover:opacity-95 transition-opacity"
                  onClick={() => window.location.href = '/auth'}
                >
                  <span className="text-nowrap font-medium">Start for free</span>
                  <ArrowRight className="ml-1 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl border-border/60 bg-surface-1/40 backdrop-blur-md hover:bg-surface-2/60"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="text-nowrap font-medium">See how it works</span>
                </Button>
              </AnimatedGroup>

              <AnimatedGroup
                preset="fade"
                className="mt-4"
              >
                <p className="text-xs font-light text-muted-foreground">
                  Free plan · No credit card · 3 generations included
                </p>
              </AnimatedGroup>
            </div>

            {/* Glassmorphic feature cards */}
            <AnimatedGroup
              preset="blur-slide"
              className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3"
            >
              {[
                {
                  icon: Target,
                  title: 'Brand-fit matches',
                  desc: 'Real opportunities tuned to your niche, audience, and tone.',
                },
                {
                  icon: Sparkles,
                  title: 'AI-crafted profile',
                  desc: 'A creator pitch that sounds like you — not a template.',
                },
                {
                  icon: Mail,
                  title: 'Send-ready emails',
                  desc: 'Personalized outreach you can review and send in one click.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="glass group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-depth"
                >
                  <div className="absolute -right-12 -top-12 size-32 rounded-full bg-primary/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-depth">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm font-light text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </AnimatedGroup>
          </div>

        </section>

        {/* Trust indicators */}
        <section className="relative mt-16 pb-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="text-sm font-light text-muted-foreground">
                Built for smaller creators who usually do all of this alone
              </p>
            </div>
            <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
              <TrustBadge label="10K–100K Creators" />
              <TrustBadge label="Real Brand Matches" />
              <TrustBadge label="Send-Ready Emails" />
              <TrustBadge label="No Fake Promises" />
              <TrustBadge label="Under 2 Minutes" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const TrustBadge = ({ label }: { label: string }) => (
  <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
    {label}
  </span>
);

const menuItems = [
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMenuState(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header>
      <nav
        data-state={isScrolled ? 'scrolled' : 'top'}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            'mx-auto mt-2 max-w-5xl rounded-xl px-4 py-2.5 transition-all duration-300 lg:px-6',
            isScrolled || menuState
              ? 'glass shadow-lg'
              : 'bg-transparent'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center">
                <ThemeLogo className="h-10 w-auto" />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 md:hidden"
              >
                <Menu
                  className={cn(
                    'size-5 text-foreground transition-all duration-200',
                    menuState && 'rotate-180 scale-0 opacity-0'
                  )}
                />
                <X
                  className={cn(
                    'absolute inset-0 m-auto size-5 text-foreground transition-all duration-200',
                    !menuState && '-rotate-180 scale-0 opacity-0'
                  )}
                />
              </button>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex md:items-center md:gap-6">
              <div className="flex gap-6">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex md:items-center md:gap-2">
              <AnimatedThemeToggle />
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => window.location.href = '/auth'}>
                Log in
              </Button>
              <Button size="sm" className="gradient-primary text-primary-foreground" onClick={() => window.location.href = '/auth'}>
                Get started free
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 md:hidden',
              menuState ? 'mt-4 max-h-96' : 'max-h-0'
            )}
          >
            <div className="space-y-2 pb-4">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-sm text-muted-foreground hover:text-foreground py-2"
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-border/40 pt-4 pb-2">
              <AnimatedThemeToggle />
              <Button variant="ghost" size="sm" className="flex-1" onClick={() => window.location.href = '/auth'}>
                Log in
              </Button>
              <Button size="sm" className="flex-1 gradient-primary text-primary-foreground" onClick={() => window.location.href = '/auth'}>
                Get started
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
