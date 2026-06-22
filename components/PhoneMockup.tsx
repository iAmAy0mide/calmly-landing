"use client";

import { motion } from "framer-motion";

const SCREENS = [
  { label: "Dashboard", color: "#1E2A38", accent: "#A8C5B5" },
  { label: "Breathe",   color: "#0B1622", accent: "#7EB3A0" },
  { label: "Sleep",     color: "#131825", accent: "#6B9E8F" },
];

const PhoneMockup = ({ screen, active }: { screen: typeof SCREENS[0]; active: boolean }) => {
  return (
    <motion.div
      animate={{ y: active ? -8 : 0, scale: active ? 1.04 : 0.96, opacity: active ? 1 : 0.6 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="relative shrink-0"
      style={{ width: 140, height: 280 }}
    >
      {/* Phone body */}
      <div
        className="absolute inset-0 rounded-[28px] border border-white/10"
        style={{ background: screen.color, boxShadow: active ? `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)` : "0 8px 24px rgba(0,0,0,0.3)" }}
      >
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full" style={{ background: "rgba(0,0,0,0.6)" }} />
        {/* Screen content */}
        <div className="absolute inset-x-3 top-10 bottom-6 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-3 px-3" style={{ background: "rgba(255,255,255,0.03)" }}>
          {/* Mini breathing circle */}
          <div className="rounded-full" style={{ width: 52, height: 52, background: `radial-gradient(circle, ${screen.accent}55, ${screen.accent}22)`, boxShadow: `0 0 20px ${screen.accent}44` }} />
          <div className="text-center space-y-1">
            <p className="text-[10px] font-medium" style={{ color: screen.accent }}>{screen.label}</p>
            <p className="text-[8px]" style={{ color: "rgba(255,255,255,0.4)" }}>Tap to begin</p>
          </div>
          {/* Bottom nav strip */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-around">
            {[0,1,2].map(i => (
              <div key={i} className="rounded-full" style={{ width: 6, height: 6, background: i === 1 ? screen.accent : "rgba(255,255,255,0.2)" }} />
            ))}
          </div>
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full" style={{ width: 36, height: 3, background: "rgba(255,255,255,0.3)" }} />
      </div>
    </motion.div>
  );
}

export default PhoneMockup;