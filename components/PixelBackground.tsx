"use client";

import React, { useEffect, useRef } from "react";

export default function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const cellSize = 40;
    const cols = Math.ceil(w / cellSize);
    const rows = Math.ceil(h / cellSize);
    
    const pixels: { x: number, y: number, opacity: number, targetOpacity: number }[] = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        pixels.push({
          x: i * cellSize,
          y: j * cellSize,
          opacity: 0,
          targetOpacity: 0
        });
      }
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      pixels.forEach(p => {
        const dx = mouseX - (p.x + cellSize / 2);
        const dy = mouseY - (p.y + cellSize / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          p.targetOpacity = 0.15;
        } else {
          p.targetOpacity = 0;
        }

        p.opacity += (p.targetOpacity - p.opacity) * 0.05;

        if (p.opacity > 0.01) {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.fillRect(p.x + 1, p.y + 1, cellSize - 2, cellSize - 2);
        }
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] pointer-events-none opacity-20 mix-blend-screen" />;
}
