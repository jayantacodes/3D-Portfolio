"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];

export default function KonamiGravity() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [isGravityBroken, setIsGravityBroken] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.key];
      if (newSequence.length > KONAMI_CODE.length) {
        newSequence.shift();
      }
      setSequence(newSequence);

      if (newSequence.join(",") === KONAMI_CODE.join(",")) {
        triggerGravityDrop();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence]);

  const triggerGravityDrop = () => {
    if (isGravityBroken) return;
    setIsGravityBroken(true);

    // Inject styles to make everything fall
    const style = document.createElement("style");
    style.id = "gravity-styles";
    style.innerHTML = `
      * {
        transition: transform 2s cubic-bezier(0.5, 0, 1, 1), opacity 2s !important;
      }
      .gravity-fall {
        transform: translateY(100vh) rotate(calc(var(--r) * 1deg)) !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    // Apply class to all major elements with random delay
    const elements = document.querySelectorAll("h1, h2, h3, p, a, img, button, canvas, .gravity-target");
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      // random rotation between -45 and 45
      const randomRotation = Math.random() * 90 - 45;
      htmlEl.style.setProperty("--r", randomRotation.toString());
      
      setTimeout(() => {
        htmlEl.classList.add("gravity-fall");
      }, Math.random() * 1000);
    });
  };

  const rebootSystem = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {isGravityBroken && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <div className="text-red-500 font-mono text-xl mb-4 animate-pulse">
            SYSTEM FAILURE: GRAVITY ANOMALY DETECTED
          </div>
          <button
            onClick={rebootSystem}
            className="px-6 py-3 border border-red-500 text-red-500 font-mono uppercase tracking-widest hover:bg-red-500 hover:text-black transition-colors"
          >
            Reboot System
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
