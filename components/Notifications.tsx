"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Info, CheckCircle, AlertTriangle } from "lucide-react";

interface Notification {
  id: string;
  message: string;
  type: "info" | "success" | "warning";
}

export default function Notifications() {
  const [items, setItems] = useState<Notification[]>([]);

  useEffect(() => {
    const handleNotify = (e: any) => {
      const { message, type = "info" } = e.detail;
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
      setItems(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setItems(prev => prev.filter(item => item.id !== id));
      }, 5000);
    };
    window.addEventListener("notify", handleNotify);
    return () => window.removeEventListener("notify", handleNotify);
  }, []);

  return (
    <div className="fixed top-24 right-6 z-[10000] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {items.map(item => (
          <motion.div
            key={item.id}
            initial={{ x: 100, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.9 }}
            className="w-72 glass p-4 rounded-xl flex items-start gap-4 pointer-events-auto shadow-2xl"
          >
            <div className={`p-2 rounded-lg ${
              item.type === "success" ? "bg-green-500/20 text-green-500" :
              item.type === "warning" ? "bg-yellow-500/20 text-yellow-500" :
              "bg-blue-500/20 text-blue-500"
            }`}>
              {item.type === "success" ? <CheckCircle size={18} /> : 
               item.type === "warning" ? <AlertTriangle size={18} /> : 
               <Info size={18} />}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">System Alert</span>
              <p className="text-xs text-foreground/80 leading-relaxed font-medium">{item.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
