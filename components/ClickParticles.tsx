"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function ClickParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        color: Math.random() > 0.5 ? "#ffffff" : "#00ff00"
      }));
      setParticles(prev => [...prev, ...newParticles]);
      
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 1000);
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100002]">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
            animate={{ 
              x: p.x + (Math.random() - 0.5) * 100, 
              y: p.y + (Math.random() - 0.5) * 100,
              opacity: 0,
              scale: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-1 h-1 bg-white"
            style={{ backgroundColor: p.color }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
