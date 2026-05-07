"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: 0% to 20% scroll
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Section 2: 25% to 50% scroll
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.5], [50, -50]);

  // Section 3: 55% to 80% scroll
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.8], [50, -50]);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-center px-6 md:px-20 z-10">
      
      {/* Section 1: Bottom Left */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-start justify-end text-left pb-32 pl-6 md:pl-20"
      >
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl">
          Jayanta
        </h1>
        <p className="mt-4 text-xl md:text-3xl text-white/80 font-light tracking-wide">
          Creative Developer.
        </p>
      </motion.div>

      {/* Section 2: Left */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-y-0 left-6 md:left-20 flex flex-col justify-center max-w-xl"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-xl">
          I build digital <br />
          <span className="text-white/60 italic">experiences.</span>
        </h2>
      </motion.div>

      {/* Section 3: Right */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-y-0 right-6 md:right-20 flex flex-col justify-center max-w-xl text-right"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-xl">
          Bridging design <br />
          <span className="text-white/60 italic">and engineering.</span>
        </h2>
      </motion.div>

    </div>
  );
}
