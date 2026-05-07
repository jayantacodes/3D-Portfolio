"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function XRayText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    setMousePos({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    setIsHovered(true);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsHovered(false)}
      className="relative w-full h-[40vh] md:h-[60vh] bg-black flex items-center justify-center overflow-hidden cursor-none"
    >
      {/* Background Masked Text */}
      <h2 className="text-[12vw] font-black tracking-tighter leading-none select-none text-white/10 uppercase">
        Innovation
      </h2>

      {/* X-Ray Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center bg-black"
        style={{
          clipPath: `circle(${isHovered ? "150px" : "0px"} at ${mousePos.x}px ${mousePos.y}px)`,
        }}
      >
        <h2 className="text-[12vw] font-black tracking-tighter leading-none select-none uppercase bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
          Innovation
        </h2>
      </motion.div>

      {/* Hover Message */}
      {!isHovered && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-10 text-white/30 font-mono text-xs uppercase tracking-[0.3em] animate-pulse"
        >
          Hover to scan
        </motion.div>
      )}

      {/* Small light indicator */}
      <motion.div
        className="absolute w-4 h-4 bg-white rounded-full blur-sm pointer-events-none z-20 mix-blend-difference"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8,
          scale: isHovered ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </section>
  );
}
