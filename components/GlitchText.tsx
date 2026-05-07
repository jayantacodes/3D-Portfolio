"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  as?: React.ElementType;
  className?: string;
}

export default function GlitchText({ text, as: Component = "span", className = "" }: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Component className={`relative z-10 ${isHovered ? "opacity-0" : "opacity-100"}`}>
        {text}
      </Component>

      {/* Glitch Layers */}
      {isHovered && (
        <>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: [-2, 2, -1, 3, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
            className="absolute top-0 left-0 z-20 text-[#ff003c] mix-blend-screen pointer-events-none"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
          >
            <Component>{text}</Component>
          </motion.div>

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: [2, -2, 1, -3, 0] }}
            transition={{ duration: 0.25, repeat: Infinity, repeatType: "mirror" }}
            className="absolute top-0 left-0 z-20 text-[#00e5ff] mix-blend-screen pointer-events-none"
            style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }}
          >
            <Component>{text}</Component>
          </motion.div>
          
          <div className="absolute top-0 left-0 z-10 text-white pointer-events-none">
            <Component>{text}</Component>
          </div>
        </>
      )}
    </div>
  );
}
