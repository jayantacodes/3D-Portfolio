"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function BinaryScroll() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [binary, setBinary] = useState<string[]>([]);

  useEffect(() => {
    // Generate a long string of binary for the full height
    const bits = Array.from({ length: 50 }, () => Math.round(Math.random()).toString());
    setBinary(bits);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-1 pointer-events-none select-none">
      {binary.map((bit, i) => (
        <BinaryBit key={i} bit={bit} index={i} total={binary.length} scrollProgress={scrollYProgress} />
      ))}
      
      {/* Background track */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/5" />
      
      {/* Active track */}
      <motion.div 
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] bg-green-500 origin-top"
        style={{ scaleY }}
      />
    </div>
  );
}

function BinaryBit({ bit, index, total, scrollProgress }: { bit: string, index: number, total: number, scrollProgress: any }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    return scrollProgress.on("change", (latest: number) => {
      const threshold = index / total;
      setActive(latest >= threshold);
    });
  }, [index, total, scrollProgress]);

  return (
    <span className={`text-[10px] font-mono transition-colors duration-300 ${active ? "text-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "text-white/10"}`}>
      {bit}
    </span>
  );
}
