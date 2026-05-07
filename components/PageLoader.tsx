"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext";

export default function PageLoader() {
  const { isLoading: loading, setIsLoading: setLoading } = useTheme();
  const [progress, setProgress] = useState(0);
  const [binary, setBinary] = useState("");

  useEffect(() => {
    const bits = Array.from({ length: 2000 }).map(() => Math.round(Math.random())).join("");
    setBinary(bits);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "unset";
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 2;
      });
    }, 50);

    document.body.style.overflow = "hidden";
    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100000] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Binary Background Stream */}
          <div className="absolute inset-0 opacity-[0.03] font-mono text-[10px] break-all pointer-events-none select-none p-4 text-foreground">
            {binary}
          </div>


          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl md:text-9xl font-black text-foreground tracking-tighter mb-8"
            >
              {progress}%
            </motion.div>
            
            <div className="w-64 h-[2px] bg-foreground/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>

            
            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] animate-pulse">
                INITIALIZING CORE_OS
              </div>
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">
                {progress < 30 ? "LOADING ASSETS..." : progress < 70 ? "SYNCING INTERFACES..." : "ESTABLISHING CONNECT..."}
              </div>
            </div>
          </div>

          {/* Glitch Overlay */}
          <motion.div 
            animate={{ 
              opacity: [0, 0.1, 0, 0.05, 0],
              x: [0, 10, -10, 5, 0]
            }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 bg-white/5 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
