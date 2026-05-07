"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function FaviconProgress() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const iconImage = new Image();
    iconImage.src = "/favicon.ico";
    
    let lastUpdate = 0;
    const updateFavicon = (latest: number) => {
      const now = Date.now();
      if (now - lastUpdate < 200) return;
      lastUpdate = now;

      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw base icon
      if (iconImage.complete) {
        ctx.drawImage(iconImage, 12, 12, 40, 40);
      }

      // Draw progress ring
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(32, 32, 28, -Math.PI / 2, (Math.PI * 2 * latest) - Math.PI / 2);
      ctx.strokeStyle = "#00ff88";
      ctx.lineWidth = 4;
      ctx.stroke();

      const link = (document.querySelector("link[rel*='icon']") as HTMLLinkElement) || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL("image/x-icon");
      if (!link.parentNode) document.getElementsByTagName('head')[0].appendChild(link);
    };

    return scrollYProgress.on("change", updateFavicon);
  }, [scrollYProgress]);


  return null;
}

export function RGBGlitch() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setActive(true);
      setTimeout(() => setActive(false), 200);
    };
    window.addEventListener("trigger-glitch", trigger);
    return () => window.removeEventListener("trigger-glitch", trigger);
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[200001] pointer-events-none">
      <div className="absolute inset-0 bg-red-500/20 mix-blend-screen translate-x-1 animate-pulse" />
      <div className="absolute inset-0 bg-blue-500/20 mix-blend-screen -translate-x-1 animate-pulse" />
    </div>
  );
}

export function Connectors() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.03]">
      <svg width="100%" height="100%">
        <line
          x1="50%" y1="0" x2="50%" y2="100%"
          stroke="white" strokeWidth="1" strokeDasharray="10 20"
        />
      </svg>
    </div>
  );
}

