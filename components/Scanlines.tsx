"use client";

import React, { useState, useEffect } from "react";

export default function Scanlines() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Listen for a custom event or key to toggle
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsActive(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden opacity-[0.03]">
      {/* Scanline pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Flicker effect */}
      <div className="absolute inset-0 animate-pulse bg-white/5" />
      
      {/* Static noise */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
