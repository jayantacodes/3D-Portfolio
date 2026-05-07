"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "GameGlide",
    description: "High-performance gaming interface with smooth interactions.",
    image: "/projects/img/8.png",
    link: "/projects/live/GameGlide/index.html"
  },
  {
    id: 2,
    title: "SocialBook",
    description: "A comprehensive social platform for connecting with peers.",
    image: "/projects/img/4.png",
    link: "/projects/live/SocialBook/index.html"
  },
  {
    id: 3,
    title: "Note App",
    description: "Elegant and efficient workspace for your thoughts.",
    image: "/projects/img/6.png",
    link: "/projects/live/Note App/index.html"
  },
  {
    id: 4,
    title: "Text to Voice",
    description: "High-fidelity AI voice synthesis for clear communication.",
    image: "/projects/img/5.png",
    link: "/projects/live/Text To Voice/index.html"
  },
  {
    id: 5,
    title: "Weather App",
    description: "Hyper-accurate real-time weather analytics and forecasts.",
    image: "/projects/img/2.png",
    link: "/projects/live/WeatherApp/index.html"
  }
];

function ProjectCard({ project, index }: { project: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      id="work"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer gravity-target"
    >
      {/* Glare Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseXSpring, mouseYSpring],
            ([x, y]) => `radial-gradient(circle at ${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%, rgba(255,255,255,0.1) 0%, transparent 80%)`
          ),
        }}
      />

      <div className="aspect-[4/3] w-full overflow-hidden relative z-10" style={{ transform: "translateZ(50px)" }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
      </div>

      <div className="p-8 relative z-10" style={{ transform: "translateZ(75px)" }}>
        <h3 className="text-2xl font-semibold text-white mb-3">
          {project.title}
        </h3>
        <p className="text-white/60 text-lg leading-relaxed">
          {project.description}
        </p>

        <a 
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center gap-3 text-white font-medium group/btn cursor-pointer w-fit interactive"
        >
          <span>View Project</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-colors group-hover/btn:bg-white group-hover/btn:text-black">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="relative z-10 w-full min-h-screen bg-[#121212] py-32 px-6 md:px-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-16 tracking-tight gravity-target">
          Selected Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 perspective-[1000px]">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
