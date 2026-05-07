"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "./AudioManager";
import { Search, Command, Briefcase, User, Mail, VolumeX, Volume2, Monitor } from "lucide-react";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isMuted, toggleMute } = useAudio();

  const actions = [
    { id: "work", title: "Go to Selected Work", icon: <Briefcase size={16} />, action: () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "about", title: "Go to About", icon: <User size={16} />, action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "contact", title: "Go to Contact", icon: <Mail size={16} />, action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "mute", title: isMuted ? "Unmute Audio" : "Mute Audio", icon: isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />, action: () => toggleMute() },
    { id: "matrix", title: "Run Matrix Theme", icon: <Monitor size={16} />, action: () => {
      document.documentElement.style.filter = "hue-rotate(90deg) saturate(200%)";
      setTimeout(() => { document.documentElement.style.filter = "none"; }, 5000);
    }},
  ];

  const filteredActions = actions.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
    }
  }, [isOpen, query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].action();
        setIsOpen(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] z-[10000] bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-4 border-b border-white/10">
              <Search className="text-white/50 mr-3" size={20} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="bg-transparent flex-1 outline-none text-lg text-white placeholder-white/30 font-medium"
              />
              <div className="flex items-center gap-1 text-white/30 text-xs font-mono bg-white/5 px-2 py-1 rounded">
                <Command size={12} />
                <span>K</span>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[300px] overflow-y-auto p-2">
              {filteredActions.length === 0 ? (
                <div className="py-8 text-center text-white/40 text-sm">No results found.</div>
              ) : (
                filteredActions.map((action, i) => (
                  <button
                    key={action.id}
                    onClick={() => {
                      action.action();
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      selectedIndex === i ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"
                    }`}
                  >
                    <div className={selectedIndex === i ? "text-white" : "text-white/40"}>
                      {action.icon}
                    </div>
                    <span className="font-medium text-sm">{action.title}</span>
                  </button>
                ))
              )}
            </div>

            <div className="px-4 py-3 bg-white/5 border-t border-white/10 text-xs text-white/40 flex items-center justify-between">
              <span>Use arrows to navigate, enter to select</span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
