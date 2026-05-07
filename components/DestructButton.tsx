"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DestructButton() {
  const [isCounting, setIsCounting] = useState(false);
  const [count, setCount] = useState(3);
  const [isDestructed, setIsDestructed] = useState(false);

  useEffect(() => {
    if (isCounting && count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isCounting && count === 0) {
      triggerDestruct();
    }
  }, [isCounting, count]);

  const triggerDestruct = () => {
    setIsDestructed(true);
    // Visual "destruction" - apply blur and glitch to main app
    document.body.style.filter = "blur(20px) grayscale(100%) contrast(500%)";
    document.body.style.backgroundColor = "white";
    
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <AnimatePresence>
        {!isCounting ? (
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            onClick={() => setIsCounting(true)}
            className="group relative px-6 py-2 border border-red-500/30 text-red-500/50 text-[10px] font-mono uppercase tracking-[0.3em] hover:border-red-500 hover:text-red-500 transition-all rounded-full overflow-hidden"
          >
            <span className="relative z-10">System Override</span>
            <div className="absolute inset-0 bg-red-500/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="text-red-500 font-mono text-3xl font-bold animate-ping">
              {count}
            </div>
            <div className="text-red-500 font-mono text-[10px] uppercase tracking-widest">
              Initiating Self-Destruct
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isDestructed && (
        <div className="fixed inset-0 z-[100000] bg-white flex items-center justify-center">
          <div className="text-black font-mono text-xl animate-pulse">REBOOTING...</div>
        </div>
      )}
    </div>
  );
}
