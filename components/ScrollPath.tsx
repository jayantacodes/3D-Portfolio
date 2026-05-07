"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollPath() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <svg 
      className="fixed left-0 top-0 w-2 h-full z-[45] pointer-events-none"
      viewBox="0 0 10 100" 
      preserveAspectRatio="none"
    >
      <motion.line
        x1="5"
        y1="0"
        x2="5"
        y2="100"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="2"
      />
      <motion.line
        x1="5"
        y1="0"
        x2="5"
        y2="100"
        stroke="white"
        strokeWidth="2"
        style={{ pathLength }}
      />
      
      {/* Glow effect */}
      <motion.line
        x1="5"
        y1="0"
        x2="5"
        y2="100"
        stroke="white"
        strokeWidth="6"
        className="blur-md opacity-20"
        style={{ pathLength }}
      />
    </svg>
  );
}
