"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    id: 1,
    title: "GameGlide",
    description: "High-performance gaming interface with smooth interactions.",
    color: "#ff3e00",
    image: "/projects/img/8.png",
    link: "/projects/live/GameGlide/index.html"
  },
  {
    id: 2,
    title: "SocialBook",
    description: "A comprehensive social platform for connecting with peers.",
    color: "#00e5ff",
    image: "/projects/img/4.png",
    link: "/projects/live/SocialBook/index.html"
  },
  {
    id: 3,
    title: "Note App",
    description: "Elegant and efficient workspace for your thoughts.",
    color: "#ff00e5",
    image: "/projects/img/6.png",
    link: "/projects/live/Note App/index.html"
  },
  {
    id: 4,
    title: "Text to Voice",
    description: "High-fidelity AI voice synthesis for clear communication.",
    color: "#00ff88",
    image: "/projects/img/5.png",
    link: "/projects/live/Text To Voice/index.html"
  },
  {
    id: 5,
    title: "Weather App",
    description: "Hyper-accurate real-time weather analytics and forecasts.",
    color: "#ffffff",
    image: "/projects/img/2.png",
    link: "/projects/live/WeatherApp/index.html"
  }
];

export default function HorizontalProjects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section id="work" ref={targetRef} className={`relative ${isMobile ? "h-auto py-20" : "h-[400vh]"} bg-background`}>
      <div className={`${isMobile ? "relative" : "sticky top-0 flex h-screen items-center"} overflow-hidden`}>
        <motion.div style={{ x: isMobile ? 0 : x }} className={`${isMobile ? "flex flex-col px-6 gap-10" : "flex gap-20 px-20"}`}>
          <div className={`flex flex-col justify-center ${isMobile ? "mb-10" : "h-[60vh] w-[400px]"}`}>
            <h2 className="text-sm font-bold tracking-widest text-foreground/50 uppercase mb-4">// Collection</h2>
            <h3 className={`${isMobile ? "text-5xl" : "text-7xl"} font-black text-foreground leading-none uppercase tracking-tighter`}>
              Selected <br /> <span className="text-foreground/20 italic">Works</span>
            </h3>
            <p className="mt-8 text-foreground/40 max-w-[280px] font-mono text-xs uppercase tracking-widest">
              A curated selection of digital experiments and high-end software solutions.
            </p>
          </div>
          
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group relative ${isMobile ? "h-[50vh] w-full" : "h-[60vh] w-[80vw] md:w-[600px]"} overflow-hidden rounded-2xl glass cursor-pointer flex-shrink-0`}
            >
              <div 
                className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              
              <div className="absolute bottom-10 left-10 z-20">
                <h4 className="text-3xl font-bold text-foreground mb-2">{project.title}</h4>
                <p className="text-foreground/60 font-mono text-xs uppercase tracking-widest">{project.description}</p>
                <div className="mt-6 flex items-center gap-4 text-xs font-bold text-foreground/40 group-hover:text-foreground transition-colors">
                  EXPLORE CASE STUDY <span>→</span>
                </div>
              </div>

              {/* Glowing accent */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-60"
                style={{ backgroundColor: project.color }}
              />
            </div>
          ))}
        </motion.div>
      </div>


      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
