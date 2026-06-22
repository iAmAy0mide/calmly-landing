"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Brain, Moon, ChevronDown, Apple, Play, Star, ArrowRight } from "lucide-react";
import BreathingCircle from "@/components/BreathingCircle";
import PhoneMockup from "@/components/PhoneMockup";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

const FEATURES = [
  {
    icon: Wind,
    title: "Guided breathwork",
    body: "Science-backed 4-7-8 and box breathing patterns that activate your parasympathetic nervous system in under a minute.",
  },
  {
    icon: Brain,
    title: "Micro-meditation",
    body: "60-second sessions designed for the gaps in your day — between meetings, in the lift, before a difficult call.",
  },
  {
    icon: Moon,
    title: "Sleep wind-down",
    body: "A dedicated night mode that dims the interface, slows the breath guide, and prepares your body for rest.",
  },
];

const PRESS = [
  { name: "TechCrunch", quote: "The simplest wellness app we've tested." },
  { name: "Product Hunt", quote: "#1 Product of the Day" },
  { name: "Forbes", quote: "For professionals who have 60 seconds." },
];

const SCREENS = [
  { label: "Dashboard", color: "#1E2A38", accent: "#A8C5B5" },
  { label: "Breathe",   color: "#0B1622", accent: "#7EB3A0" },
  { label: "Sleep",     color: "#131825", accent: "#6B9E8F" },
];

export default function CalmlyLandingPage() {
  const [activeScreen, setActiveScreen] = useState(1);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Auto-cycle phone screens
  useEffect(() => {
    const id = setInterval(() => {
      setActiveScreen((i) => (i + 1) % SCREENS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <main
      className="min-h-screen antialiased overflow-x-hidden text-[#EDF0EC] bg-[#0B0F1A]"
    //   style={{
    //     background: "#0B0F1A",
    //     color: "#EDF0EC",
    //     fontFamily: "Inter, -apple-system, sans-serif",
    //   }}
    >
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'DM Serif Display', Georgia, serif; }
        .font-body    { font-family: 'Inter', -apple-system, sans-serif; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0B0F1A; }
        ::-webkit-scrollbar-thumb { background: #1E2A38; border-radius: 2px; }
      `}</style>

      {/* ── Nav ── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12"
        style={{ height: 64, background: "rgba(11,15,26,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(168,197,181,0.08)" }}
      >
        <div className="flex items-center gap-2">
          <div className="rounded-full" style={{ width: 28, height: 28, background: "radial-gradient(circle, #A8C5B5, #6B9E8F)", boxShadow: "0 0 12px rgba(168,197,181,0.4)" }} />
          <span className="font-display text-lg" style={{ color: "#EDF0EC" }}>Calmly</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it works", "Pricing"].map(item => (
            <a key={item} href="#" className="text-sm transition-colors" style={{ color: "rgba(237,240,236,0.5)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#EDF0EC")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(237,240,236,0.5)")}
            >{item}</a>
          ))}
        </div>
        <Link
          href="#register"
          className="text-sm font-medium px-4 py-2 rounded-full transition-all"
          style={{ background: "rgba(168,197,181,0.12)", color: "#A8C5B5", border: "1px solid rgba(168,197,181,0.2)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(168,197,181,0.22)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(168,197,181,0.12)"; }}
        >
          Get early access
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-40" style={{ minHeight: "100vh" }}>
        {/* Ambient background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(168,197,181,0.06) 0%, transparent 70%)", borderRadius: "50%" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-2 mb-12"
        >
          <span
            className="text-xs tracking-widest uppercase mb-2 font-body"
            style={{ color: "#A8C5B5", letterSpacing: "0.22em" }}
          >
            Mental wellness · Mobile app
          </span>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05]" style={{ color: "#EDF0EC", maxWidth: 640 }}>
            60 seconds<br />
            <em style={{ color: "#A8C5B5" }}>to calm.</em>
          </h1>
          <p className="font-body text-lg mt-4" style={{ color: "rgba(237,240,236,0.55)", maxWidth: 360, lineHeight: 1.7 }}>
            No therapist required. No 30-minute sessions. Just your breath, and one minute you actually have.
          </p>
        </motion.div>

        {/* The breathing circle — this is the page */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24"
        >
          <BreathingCircle />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown size={20} style={{ color: "rgba(168,197,181,0.4)" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Problem ── */}
      <section className="px-6 py-24 md:py-32 max-w-3xl mx-auto">
        <FadeIn>
          <p className="font-display text-3xl md:text-5xl text-center leading-[1.2]" style={{ color: "#EDF0EC" }}>
            You don't need more <em style={{ color: "#A8C5B5" }}>apps.</em><br />
            You need less <em style={{ color: "#A8C5B5" }}>noise.</em>
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="font-body text-base text-center mt-8 leading-relaxed" style={{ color: "rgba(237,240,236,0.5)", maxWidth: 480, margin: "2rem auto 0" }}>
            Most wellness apps were designed for people with time to spare. Calmly was built for the gap between your 10am and 11am. The 90 seconds before you get out of the car. The moment you need to reset — right now.
          </p>
        </FadeIn>

        {/* Stat strip */}
        <FadeIn delay={0.25}>
          <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8">
            {[
              { num: "60s", label: "Average session length" },
              { num: "87%", label: "Feel calmer within 3 uses" },
              { num: "4.9", label: "App store rating (beta)" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center p-4 rounded-2xl" style={{ background: "rgba(30,42,56,0.6)", border: "1px solid rgba(168,197,181,0.1)" }}>
                <p className="font-display text-3xl md:text-4xl" style={{ color: "#A8C5B5" }}>{num}</p>
                <p className="font-body text-xs mt-2" style={{ color: "rgba(237,240,236,0.4)", lineHeight: 1.5 }}>{label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── App Screenshots ── */}
      <section className="px-6 py-24 md:py-32 overflow-hidden">
        <FadeIn className="text-center mb-16">
          <span className="font-body text-xs tracking-widest uppercase" style={{ color: "#A8C5B5", letterSpacing: "0.2em" }}>The app</span>
          <h2 className="font-display text-3xl md:text-5xl mt-3" style={{ color: "#EDF0EC" }}>Everything you need.<br /><em style={{ color: "#A8C5B5" }}>Nothing you don't.</em></h2>
        </FadeIn>

        {/* Phone mockup trio */}
        <div className="flex items-end justify-center gap-4 md:gap-8" style={{ height: 320 }}>
          {SCREENS.map((screen, i) => (
            <PhoneMockup key={screen.label} screen={screen} active={activeScreen === i} />
          ))}
        </div>

        {/* Screen labels */}
        <div className="flex justify-center gap-4 md:gap-8 mt-8">
          {SCREENS.map((screen, i) => (
            <button
              key={screen.label}
              onClick={() => setActiveScreen(i)}
              className="text-xs font-body transition-colors"
              style={{ color: activeScreen === i ? "#A8C5B5" : "rgba(237,240,236,0.3)" }}
            >
              {screen.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 py-24 md:py-32 max-w-5xl mx-auto" id="features">
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl" style={{ color: "#EDF0EC" }}>Three tools.<br /><em style={{ color: "#A8C5B5" }}>One minute.</em></h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((feat, i) => (
            <FadeIn key={feat.title} delay={i * 0.1}>
              <div
                className="p-6 rounded-2xl h-full flex flex-col gap-4"
                style={{ background: "rgba(30,42,56,0.5)", border: "1px solid rgba(168,197,181,0.1)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(168,197,181,0.12)" }}>
                  <feat.icon size={20} style={{ color: "#A8C5B5" }} />
                </div>
                <h3 className="font-display text-xl" style={{ color: "#EDF0EC" }}>{feat.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(237,240,236,0.55)" }}>{feat.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="px-6 py-24 md:py-32 max-w-2xl mx-auto text-center" id="how-it-works">
        <FadeIn>
          <h2 className="font-display text-3xl md:text-5xl" style={{ color: "#EDF0EC" }}>Open. Breathe. <em style={{ color: "#A8C5B5" }}>Done.</em></h2>
          <p className="font-body text-base mt-4" style={{ color: "rgba(237,240,236,0.5)", lineHeight: 1.8 }}>
            No onboarding flow. No quiz about your stress level. Just open Calmly and follow the circle. Your nervous system does the rest.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="mt-12 space-y-4">
            {[
              { step: "1", text: "Open the app. The breathing guide starts automatically." },
              { step: "2", text: "Follow the circle — expand on inhale, hold, release." },
              { step: "3", text: "One minute later, your heart rate has dropped. You continue your day." },
            ].map(({ step, text }) => (
              <div
                key={step}
                className="flex items-start gap-4 text-left p-4 rounded-2xl"
                style={{ background: "rgba(30,42,56,0.4)", border: "1px solid rgba(168,197,181,0.08)" }}
              >
                <span className="font-display text-2xl shrink-0" style={{ color: "#A8C5B5", lineHeight: 1 }}>{step}</span>
                <p className="font-body text-sm pt-1" style={{ color: "rgba(237,240,236,0.65)", lineHeight: 1.7 }}>{text}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Pre-register CTA ── */}
      <section className="px-6 py-24 md:py-32" id="register">
        <FadeIn>
          <div
            className="max-w-xl mx-auto text-center p-10 md:p-14 rounded-3xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(168,197,181,0.08) 0%, rgba(107,158,143,0.04) 100%)",
              border: "1px solid rgba(168,197,181,0.15)",
            }}
          >
            {/* Ambient circle */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(168,197,181,0.1) 0%, transparent 70%)" }} />

            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full" style={{ background: "rgba(168,197,181,0.1)", border: "1px solid rgba(168,197,181,0.2)" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#A8C5B5" }} />
              <span className="font-body text-xs" style={{ color: "#A8C5B5" }}>Early access · Limited spots</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl mb-4" style={{ color: "#EDF0EC" }}>
              Be the first to<br /><em style={{ color: "#A8C5B5" }}>breathe easy.</em>
            </h2>
            <p className="font-body text-sm mb-8" style={{ color: "rgba(237,240,236,0.5)", lineHeight: 1.8 }}>
              Pre-register now for early access, a 3-month free Pro trial, and a say in what we build next.
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-4"
                >
                  <p className="font-display text-xl" style={{ color: "#A8C5B5" }}>You're on the list. 🌿</p>
                  <p className="font-body text-sm mt-2" style={{ color: "rgba(237,240,236,0.4)" }}>We'll reach out when early access opens.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="flex-1 rounded-full px-5 py-3 text-sm font-body outline-none transition-all"
                    style={{
                      background: "rgba(237,240,236,0.06)",
                      border: "1px solid rgba(168,197,181,0.2)",
                      color: "#EDF0EC",
                    }}
                    onFocus={e => { e.target.style.borderColor = "rgba(168,197,181,0.5)"; e.target.style.background = "rgba(237,240,236,0.09)"; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(168,197,181,0.2)"; e.target.style.background = "rgba(237,240,236,0.06)"; }}
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium font-body transition-all"
                    style={{ background: "#A8C5B5", color: "#0B0F1A", flexShrink: 0 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#BDD4C8"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#A8C5B5"; }}
                  >
                    Pre-register <ArrowRight size={14} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* App store badges */}
            <div className="flex items-center justify-center gap-4 mt-8">
              {[
                { Icon: Apple, label: "App Store" },
                { Icon: Play,  label: "Google Play" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: "rgba(237,240,236,0.06)", border: "1px solid rgba(168,197,181,0.12)" }}
                >
                  <Icon size={14} style={{ color: "rgba(237,240,236,0.5)" }} />
                  <span className="font-body text-xs" style={{ color: "rgba(237,240,236,0.4)" }}>Coming to {label}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Press strip ── */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <FadeIn>
          <p className="font-body text-xs text-center tracking-widest uppercase mb-8" style={{ color: "rgba(237,240,236,0.3)", letterSpacing: "0.2em" }}>As seen in</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRESS.map(({ name, quote }) => (
              <div
                key={name}
                className="p-5 rounded-2xl flex flex-col gap-2"
                style={{ background: "rgba(30,42,56,0.4)", border: "1px solid rgba(168,197,181,0.08)" }}
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#A8C5B5" style={{ color: "#A8C5B5" }} />)}
                </div>
                <p className="font-body text-sm italic" style={{ color: "rgba(237,240,236,0.6)", lineHeight: 1.6 }}>"{quote}"</p>
                <p className="font-body text-xs font-medium" style={{ color: "rgba(237,240,236,0.3)" }}>— {name}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Footer ── */}
      <footer
        className="px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(168,197,181,0.08)" }}
      >
        <div className="flex items-center gap-2">
          <div className="rounded-full" style={{ width: 20, height: 20, background: "radial-gradient(circle, #A8C5B5, #6B9E8F)" }} />
          <span className="font-display text-sm" style={{ color: "rgba(237,240,236,0.5)" }}>Calmly</span>
        </div>
        <p className="font-body text-xs" style={{ color: "rgba(237,240,236,0.25)" }}>
          © 2025 Calmly. Built for the 60 seconds you actually have.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map(link => (
            <a key={link} href="#" className="font-body text-xs transition-colors" style={{ color: "rgba(237,240,236,0.3)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(237,240,236,0.7)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(237,240,236,0.3)")}
            >{link}</a>
          ))}
        </div>
      </footer>
    </main>
  );
}