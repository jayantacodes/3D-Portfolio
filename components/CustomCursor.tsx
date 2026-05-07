"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

interface TrailPoint {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isInverted, setIsInverted] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest(".interactive") || target.closest("a") || target.closest("button");
      
      if (interactiveEl) {
        const rect = (interactiveEl as HTMLElement).getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Magnetic pull: cursor position is averaged with element center
        cursorX.set(centerX + (e.clientX - centerX) * 0.2);
        cursorY.set(centerY + (e.clientY - centerY) * 0.2);
        setIsHovering(true);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        setIsHovering(false);
      }

      // Add to trail
      const newPoint = { id: trailIdRef.current++, x: e.clientX, y: e.clientY };
      setTrail(prev => [...prev.slice(-10), newPoint]);

      setIsInverted(
        target.tagName === "IMG" ||
        target.closest("img") ||
        target.classList.contains("invert-cursor")
      );
    };


    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 4 : 1,
        }}
      />
      
      {/* Geometric Trail */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-2 h-2 bg-white/20 pointer-events-none z-[9998]"
            style={{
              x: point.x,
              y: point.y,
              translateX: "-50%",
              translateY: "-50%",
              rotate: point.id * 45,
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1,
        }}
      />

      {/* Inversion spotlight */}
      {isInverted && (
        <motion.div
          className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-[10001] bg-white mix-blend-difference"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
      )}
    </>
  );
}
