"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AmbientGlow() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px]"
          style={{
            background: i === 0 ? "radial-gradient(circle, var(--accent) 0%, transparent 70%)" : 
                       i === 1 ? "radial-gradient(circle, #3b82f6 0%, transparent 70%)" :
                       "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            opacity: 0.03,
            left: `${15 + i * 30}%`,
            top: `${15 + i * 20}%`,
          }}
        />
      ))}
    </div>
  );
}
