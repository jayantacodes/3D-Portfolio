"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

export function CornerProgress() {
  const { scrollYProgress } = useScroll();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  const dashOffset = useTransform(scrollYProgress, [0, 1], [88, 0]);

  return (
    <div className="fixed bottom-8 left-8 z-[1000] flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
      <div className="w-8 h-8 relative">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="16" cy="16" r="14"
            fill="none" stroke="currentColor" strokeWidth="1"
            className="text-foreground/10"
          />
          <motion.circle
            cx="16" cy="16" r="14"
            fill="none" stroke="var(--accent)" strokeWidth="1"
            strokeDasharray="88"
            style={{ strokeDashoffset: dashOffset }}
            initial={{ strokeDashoffset: 88 }}
          />
        </svg>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-[8px] font-mono text-foreground/30 uppercase tracking-[0.2em]">OS_LOAD</span>
        <span className="text-xs font-bold text-foreground">{percent}%</span>
      </div>
    </div>
  );
}




export function ScrollGauge() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-3000, 0, 3000], [-100, 0, 100]);

  return (
    <div className="fixed top-1/2 right-4 -translate-y-1/2 z-[999] hidden md:flex flex-col items-center gap-2 opacity-20 hover:opacity-100 transition-opacity">
      <span className="text-[6px] font-mono text-foreground/40 uppercase vertical-text tracking-[0.5em] mb-2">V_METER</span>
      <div className="w-[1px] h-24 bg-foreground/5 rounded-full relative overflow-hidden">
        <motion.div 
          style={{ height: useTransform(velocityFactor, (v: number) => `${Math.abs(v)}%`) }}
          className="absolute bottom-0 w-full bg-accent"
        />
      </div>
    </div>
  );
}

