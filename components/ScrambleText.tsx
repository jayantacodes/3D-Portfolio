"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number; // Delay before starting (in ms)
  duration?: number; // Scramble duration (in ms)
}

export default function ScrambleText({ text, className = "", delay = 0, duration = 1500 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;
    let startTime: number;

    const startScramble = () => {
      startTime = Date.now();
      
      intervalId = setInterval(() => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        // At progress 1, we show the full original text.
        if (progress === 1) {
          setDisplayText(text);
          clearInterval(intervalId);
          return;
        }

        // How many correct characters from the beginning
        const revealCount = Math.floor(text.length * progress);
        
        let newStr = text.substring(0, revealCount);
        
        // Fill the rest with random characters
        for (let i = revealCount; i < text.length; i++) {
          if (text[i] === " ") {
            newStr += " ";
          } else {
            newStr += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        
        setDisplayText(newStr);
      }, 50); // Update every 50ms
    };

    timeoutId = setTimeout(startScramble, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isInView, text, delay, duration]);

  // Initial render: empty string until in view
  return (
    <span ref={ref} className={className}>
      {displayText}
      {!isInView && <span className="opacity-0">{text}</span>} 
    </span>
  );
}
