"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";


type BreathPhase = "inhale" | "hold" | "exhale" | "rest";
const BREATH_CYCLE: { phase: BreathPhase; label: string; duration: number }[] = [
  { phase: "inhale", label: "Breathe in", duration: 4000 },
  { phase: "hold",   label: "Hold",       duration: 7000 },
  { phase: "exhale", label: "Breathe out", duration: 8000 },
  { phase: "rest",   label: "Rest",        duration: 2000 },
];

const BreathingCircle = () => {
  const prefersReduced = useReducedMotion();
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const current = BREATH_CYCLE[phaseIdx];

  useEffect(() => {
    if (prefersReduced) return;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      setProgress(Math.min(elapsed / current.duration, 1));
      if (elapsed < current.duration) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    startRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);

    timerRef.current = setTimeout(() => {
      setPhaseIdx((i) => (i + 1) % BREATH_CYCLE.length);
      setProgress(0);
    }, current.duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [phaseIdx, current.duration, prefersReduced]);

  const isExpand = current.phase === "inhale";
  const isHold   = current.phase === "hold";
  const isRest   = current.phase === "rest";
  const scale    = prefersReduced ? 1 :
                   isExpand ? 0.75 + progress * 0.35 :
                   isHold   ? 1.1 :
                   isRest   ? 0.75 :
                   1.1 - progress * 0.35; // exhale

  const glowOpacity = prefersReduced ? 0.4 :
                      isExpand ? 0.25 + progress * 0.35 :
                      isHold   ? 0.6 :
                      isRest   ? 0.25 :
                      0.6 - progress * 0.35;

  const innerOpacity = prefersReduced ? 0.9 :
                       isExpand ? 0.5 + progress * 0.4 :
                       isHold   ? 0.9 :
                       isRest   ? 0.5 :
                       0.9 - progress * 0.4;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
      {/* Outer aurora glow */}
      <div
        className="absolute rounded-full transition-none"
        style={{
          width: 280,
          height: 280,
          background: `radial-gradient(circle, rgba(168,197,181,${glowOpacity * 0.5}) 0%, rgba(126,179,160,${glowOpacity * 0.2}) 50%, transparent 80%)`,
          transform: `scale(${scale * 1.4})`,
          transition: prefersReduced ? "none" : "transform 100ms linear, opacity 100ms linear",
          filter: "blur(20px)",
        }}
      />
      {/* Mid ring */}
      <div
        className="absolute rounded-full border"
        style={{
          width: 200,
          height: 200,
          borderColor: `rgba(168,197,181,${glowOpacity * 0.4})`,
          transform: `scale(${scale})`,
          transition: prefersReduced ? "none" : "transform 100ms linear",
        }}
      />
      {/* Core circle */}
      <div
        className="absolute rounded-full"
        style={{
          width: 140,
          height: 140,
          background: `radial-gradient(circle at 40% 35%, rgba(168,197,181,${innerOpacity}), rgba(107,158,143,${innerOpacity * 0.8}))`,
          transform: `scale(${scale})`,
          transition: prefersReduced ? "none" : "transform 100ms linear, opacity 100ms linear",
          boxShadow: `0 0 40px rgba(168,197,181,${glowOpacity * 0.6}), inset 0 1px 1px rgba(255,255,255,0.2)`,
        }}
      />
      {/* Phase label */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={current.phase}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className="text-sm tracking-widest uppercase"
            style={{ color: "#A8C5B5", letterSpacing: "0.2em", fontFamily: "Inter, sans-serif" }}
          >
            {current.label}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default BreathingCircle;