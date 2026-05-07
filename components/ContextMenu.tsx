"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, User, Mail, Volume2, VolumeX, Terminal, Search } from "lucide-react";
import { useAudio } from "./AudioManager";

export default function ContextMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const { isMuted, toggleMute } = useAudio();

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleClick = () => setIsVisible(false);
    
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const menuItems = [
    { label: "Home", icon: <Home size={14} />, action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "Work", icon: <Briefcase size={14} />, action: () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "About", icon: <User size={14} />, action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Contact", icon: <Mail size={14} />, action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
    { label: isMuted ? "Unmute" : "Mute", icon: isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />, action: toggleMute },
    { label: "Terminal", icon: <Terminal size={14} />, action: () => window.dispatchEvent(new KeyboardEvent('keydown', {'key': '`'})) },
    { label: "Command Palette", icon: <Search size={14} />, action: () => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })) },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          style={{ top: position.y, left: position.x }}
          className="fixed z-[10000] min-w-[180px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden p-1"
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                item.action();
                setIsVisible(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors group"
            >
              <span className="text-white/40 group-hover:text-white transition-colors">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className="h-[1px] bg-white/10 my-1 mx-2" />
          <div className="px-3 py-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
            Jayanta OS v3.0
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
