"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ZenMode() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleZen = () => setIsActive(prev => !prev);
    window.addEventListener("trigger-zen", handleZen);
    return () => window.removeEventListener("trigger-zen", handleZen);
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200000] bg-black flex flex-col items-center justify-center cursor-none"
          onClick={() => setIsActive(false)}
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 h-32 rounded-full bg-white/20 blur-xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute text-white/50 font-mono text-sm tracking-[0.5em] uppercase"
          >
            Breathe
          </motion.div>
          
          <div className="absolute bottom-10 text-white/20 text-[10px] font-mono uppercase tracking-widest">
            Click anywhere to return
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
