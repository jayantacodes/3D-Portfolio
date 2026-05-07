"use client";

import React, { useEffect, useRef } from "react";

export default function ParticleFooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 100;
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = "rgba(255, 255, 255, 0.1)";
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > w) this.x = 0;
        else if (this.x < 0) this.x = w;
        if (this.y > h) this.y = 0;
        else if (this.y < 0) this.y = h;

        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const force = (100 - distance) / 100;
          this.x -= dx * force * 0.05;
          this.y -= dy * force * 0.05;
          this.color = `rgba(255, 255, 255, ${0.1 + force * 0.3})`;
        } else {
          this.color = "rgba(255, 255, 255, 0.1)";
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.update(mouseX, mouseY);
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    init();
    animate();

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      init();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
