"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    year: "2024 - Present",
    company: "Metaverse Labs",
    role: "Lead Creative Developer",
    desc: "Architecting immersive spatial web experiences and high-performance WebGL frameworks.",
    tech: ["Next.js", "Three.js", "Rust"]
  },
  {
    year: "2022 - 2024",
    company: "Digital Arts Studio",
    role: "Senior UI Engineer",
    desc: "Led the development of award-winning marketing sites for global luxury brands.",
    tech: ["React", "GSAP", "Framer Motion"]
  },
  {
    year: "2020 - 2022",
    company: "TechNova",
    role: "Frontend Developer",
    desc: "Built scalable dashboard systems and real-time data visualization tools.",
    tech: ["TypeScript", "D3.js", "Firebase"]
  },
  {
    year: "2018 - 2020",
    company: "Startup Hub",
    role: "Junior Web Developer",
    desc: "Developed responsive landing pages and interactive web components.",
    tech: ["HTML", "CSS", "JavaScript"]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="experience" className="relative w-full bg-[#121212] py-32 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-white mb-24 tracking-tighter"
        >
          THE <span className="text-white/20 italic">JOURNEY</span>
        </motion.h2>

        <div ref={containerRef} className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />

          <div className="space-y-24 md:space-y-0">
            {experiences.map((exp, index) => (
              <TimelineItem key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ exp, index }: { exp: any, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-center md:justify-between w-full mb-12 md:mb-32 ${isEven ? "md:flex-row-reverse" : ""}`}>
      {/* Circle on line */}
      <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-black -translate-x-1/2 z-10 hidden md:block" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className={`w-full md:w-[45%] p-8 rounded-2xl glass hover:border-accent/30 transition-colors group`}
      >
        <span className="text-xs font-mono text-foreground/40 uppercase tracking-widest mb-2 block">{exp.year}</span>
        <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">{exp.role}</h3>
        <h4 className="text-lg text-foreground/60 mb-6">{exp.company}</h4>
        <p className="text-foreground/40 leading-relaxed mb-8">{exp.desc}</p>
        
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t: string) => (
            <span key={t} className="px-3 py-1 bg-foreground/5 rounded text-[10px] font-mono text-foreground/50 uppercase tracking-widest border border-foreground/5">
              {t}
            </span>
          ))}
        </div>
      </motion.div>


      {/* Empty space for opposite side */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
}
