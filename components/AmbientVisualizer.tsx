"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "./AudioManager";

export default function AmbientVisualizer() {
  const { isMuted } = useAudio();
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), 5000);
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);
    
    timeout = setTimeout(() => setIsIdle(true), 5000);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isMuted && isIdle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden"
        >
          <div className="flex items-end gap-2 h-64">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: ["10%", "100%", "20%", "70%", "40%", "10%"],
                  opacity: [0.1, 0.3, 0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 2 + (i % 5) * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
                className="w-4 bg-white/20 rounded-full"
              />
            ))}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
