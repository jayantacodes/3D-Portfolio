"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

function Window({ id, title, children, onClose }: WindowProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="fixed z-[5000] w-full max-w-2xl bg-background/90 glass rounded-xl shadow-2xl overflow-hidden"
      style={{ left: "calc(50% - 300px)", top: "20%" }}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-foreground/5 border-b border-foreground/10 cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest ml-4">{title}</span>
        </div>
        <div className="flex items-center gap-4 text-foreground/20">
          <Minus size={14} />
          <Square size={10} />
        </div>
      </div>
      <div className="p-8 max-h-[60vh] overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </motion.div>
  );
}

export default function WindowManager() {
  const [windows, setWindows] = useState<{ id: string; title: string; content: React.ReactNode }[]>([]);

  useEffect(() => {
    const handleOpenWindow = (e: any) => {
      const { id, title, content } = e.detail;
      if (!windows.find(w => w.id === id)) {
        setWindows(prev => [...prev, { id, title, content }]);
      }
    };
    window.addEventListener("open-window", handleOpenWindow);
    return () => window.removeEventListener("open-window", handleOpenWindow);
  }, [windows]);

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  return (
    <AnimatePresence>
      {windows.map(w => (
        <Window key={w.id} id={w.id} title={w.title} onClose={() => closeWindow(w.id)}>
          {w.content}
        </Window>
      ))}
    </AnimatePresence>
  );
}
