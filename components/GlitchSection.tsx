"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface GlitchSectionProps {
  children: React.ReactNode;
  delay?: number;
}

export default function GlitchSection({ children, delay = 0 }: GlitchSectionProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 500);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        animate={isGlitching ? {
          x: [-2, 2, -3, 3, 0],
          y: [1, -1, 2, -2, 0],
          filter: [
            "hue-rotate(0deg) blur(0px)",
            "hue-rotate(90deg) blur(2px)",
            "hue-rotate(-90deg) blur(1px)",
            "hue-rotate(0deg) blur(0px)"
          ]
        } : {}}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
