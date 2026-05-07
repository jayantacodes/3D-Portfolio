"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Cpu, Monitor, Volume2, Waves } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, setTheme, toggleScanlines, toggleGrain, toggleAudio, togglePerformance } = useTheme();

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-20 z-[999] p-3 glass rounded-full text-white/50 hover:text-white transition-colors"
      >
        <Settings size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm z-[10001] bg-black/90 glass border-l border-white/10 p-8 text-white"
            >

              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-bold tracking-tighter">SETTINGS</h2>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-10">
                {/* Theme Selection */}
                <section>
                  <h3 className="text-xs font-mono text-white/30 uppercase tracking-[0.2em] mb-4">Core Theme</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["cyberpunk", "forest", "mono"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t as any)}
                        className={`px-4 py-2 text-xs font-mono border rounded-lg transition-all ${
                          settings.theme === t ? "border-white bg-white text-black" : "border-white/10 text-white/50 hover:border-white/30"
                        }`}
                      >
                        {t.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Visual Toggles */}
                <section className="space-y-6">
                  <h3 className="text-xs font-mono text-white/30 uppercase tracking-[0.2em] mb-4">Environment</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Monitor size={18} className="text-white/40" />
                      <span className="text-sm">Scanlines</span>
                    </div>
                    <button onClick={toggleScanlines} className={`w-10 h-5 rounded-full relative transition-colors ${settings.scanlines ? "bg-green-500" : "bg-white/10"}`}>
                      <motion.div animate={{ x: settings.scanlines ? 20 : 2 }} className="absolute top-1 w-3 h-3 bg-white rounded-full" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Waves size={18} className="text-white/40" />
                      <span className="text-sm">Film Grain</span>
                    </div>
                    <button onClick={toggleGrain} className={`w-10 h-5 rounded-full relative transition-colors ${settings.grain ? "bg-green-500" : "bg-white/10"}`}>
                      <motion.div animate={{ x: settings.grain ? 20 : 2 }} className="absolute top-1 w-3 h-3 bg-white rounded-full" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Volume2 size={18} className="text-white/40" />
                      <span className="text-sm">Ambience</span>
                    </div>
                    <button onClick={toggleAudio} className={`w-10 h-5 rounded-full relative transition-colors ${settings.audioEnabled ? "bg-green-500" : "bg-white/10"}`}>
                      <motion.div animate={{ x: settings.audioEnabled ? 20 : 2 }} className="absolute top-1 w-3 h-3 bg-white rounded-full" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Cpu size={18} className="text-white/40" />
                      <span className="text-sm">Perf Mode</span>
                    </div>
                    <button onClick={togglePerformance} className={`w-10 h-5 rounded-full relative transition-colors ${settings.performanceMode ? "bg-green-500" : "bg-white/10"}`}>
                      <motion.div animate={{ x: settings.performanceMode ? 20 : 2 }} className="absolute top-1 w-3 h-3 bg-white rounded-full" />
                    </button>
                  </div>
                </section>
              </div>

              <div className="absolute bottom-8 left-8 right-8 text-[10px] font-mono text-white/20 uppercase leading-relaxed">
                System optimized for high-end scrollytelling. <br />
                Last build: {new Date().toLocaleDateString()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
