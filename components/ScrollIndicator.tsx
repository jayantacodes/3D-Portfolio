"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "Story" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      
      let closestSection = "hero";
      let minDistance = Infinity;

      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = id;
          }
        }
      });
      
      if (closestSection !== activeSection) {
        setActiveSection(closestSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-8">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group flex items-center gap-4 text-left"
        >
          <div className="relative flex items-center justify-center">
            <div className={`w-1 h-1 rounded-full transition-all duration-500 ${activeSection === section.id ? "bg-white scale-[2.5]" : "bg-white/20"}`} />
            {activeSection === section.id && (
              <motion.div 
                layoutId="indicator"
                className="absolute w-4 h-4 border border-white/40 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </div>
          <span className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-500 ${activeSection === section.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
}
