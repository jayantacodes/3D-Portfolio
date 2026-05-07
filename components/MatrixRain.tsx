"use client";

import React, { useEffect, useRef, useState } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMatrix = () => setIsActive(prev => !prev);
    window.addEventListener("trigger-matrix", handleMatrix);
    return () => window.removeEventListener("trigger-matrix", handleMatrix);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[100000] pointer-events-none opacity-40 bg-black"
      onClick={() => setIsActive(false)}
    />
  );
}
