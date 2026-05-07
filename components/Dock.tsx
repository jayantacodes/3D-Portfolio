"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Mail, Terminal, Settings, Globe, LayoutGrid } from "lucide-react";
import { useTheme } from "./ThemeContext";

const items = [
  { id: "hero", icon: <Home size={24} />, label: "Home" },
  { id: "about", icon: <User size={24} />, label: "Story" },
  { id: "work", icon: <Briefcase size={24} />, label: "Work" },
  { id: "browser", icon: <Globe size={24} />, label: "Nova Browser" },
  { id: "contact", icon: <Mail size={24} />, label: "Contact" },
  { id: "terminal", icon: <Terminal size={24} />, label: "Terminal" },
  { id: "dashboard", icon: <LayoutGrid size={24} />, label: "Dashboard" },
];

export default function Dock() {
  const { isLoading } = useTheme();
  const mouseX = useMotionValue(Infinity);

  return (
    <AnimatePresence>
      {!isLoading && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-[100000] w-[95%] max-w-max"
        >
          <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="flex h-14 md:h-16 items-end gap-2 md:gap-4 rounded-2xl glass px-3 md:px-4 pb-2 md:pb-3 overflow-x-auto no-scrollbar md:overflow-visible"
          >
            {items.map((item) => (
              <DockIcon key={item.id} mouseX={mouseX} {...item} />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ mouseX, id, icon, label }: { mouseX: any; id: string; icon: React.ReactNode; label: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  // Use static width on mobile/touch
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const handleClick = () => {
    if (id === "terminal") {
      window.dispatchEvent(new KeyboardEvent('keydown', {'key': '`'}));
    } else if (id === "browser") {
      window.dispatchEvent(new CustomEvent("open-browser"));
    } else if (id === "dashboard") {
      window.dispatchEvent(new CustomEvent("open-dashboard"));
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width: isMobile ? 40 : width }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative aspect-square flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white/50 hover:text-white hover:bg-white/20 transition-colors cursor-pointer group"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] font-mono uppercase tracking-widest text-white border border-white/10 pointer-events-none"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="scale-[0.8]">{icon}</div>
    </motion.div>
  );
}
