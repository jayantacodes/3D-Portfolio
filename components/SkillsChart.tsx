"use client";

import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "Frontend", level: 95 },
  { name: "Backend", level: 80 },
  { name: "Creative", level: 90 },
  { name: "UI/UX", level: 85 },
  { name: "Performance", level: 88 },
  { name: "3D/WebGL", level: 75 },
];

export default function SkillsChart() {
  const radius = 100;
  const centerX = 150;
  const centerY = 150;

  const getCoordinates = (index: number, level: number) => {
    const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
    const r = (radius * level) / 100;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  };

  const points = skills.map((s, i) => {
    const coords = getCoordinates(i, s.level);
    return `${coords.x},${coords.y}`;
  }).join(" ");

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
      <h3 className="text-xs font-mono text-white/30 uppercase tracking-[0.3em] mb-8">Capability Matrix</h3>
      
      <svg width="300" height="300" className="overflow-visible">
        {/* Background Grid */}
        {[20, 40, 60, 80, 100].map((level) => (
          <polygon
            key={level}
            points={skills.map((_, i) => {
              const coords = getCoordinates(i, level);
              return `${coords.x},${coords.y}`;
            }).join(" ")}
            fill="none"
            stroke="white"
            strokeOpacity="0.05"
          />
        ))}

        {/* Axes */}
        {skills.map((s, i) => {
          const coords = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={coords.x}
              y2={coords.y}
              stroke="white"
              strokeOpacity="0.1"
            />
          );
        })}

        {/* Labels */}
        {skills.map((s, i) => {
          const coords = getCoordinates(i, 120);
          return (
            <text
              key={i}
              x={coords.x}
              y={coords.y}
              fill="white"
              fillOpacity="0.4"
              fontSize="10"
              fontFamily="monospace"
              textAnchor="middle"
              className="uppercase tracking-widest"
            >
              {s.name}
            </text>
          );
        })}

        {/* Active Polygon */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          points={points}
          fill="rgba(0, 255, 136, 0.2)"
          stroke="#00ff88"
          strokeWidth="2"
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
