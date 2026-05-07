"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useAudio } from "./AudioManager";

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { playTypeSound } = useAudio();
  const [history, setHistory] = useState<string[]>([
    "JAYANTA_OS v3.0.0 (Ultimate Edition)",
    "Type 'help' to see all cool commands.",
  ]);
  const [batteryInfo, setBatteryInfo] = useState<string>("Detecting battery...");
  const [networkInfo, setNetworkInfo] = useState<string>("Detecting network...");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      // @ts-ignore
      if (navigator.getBattery) {
        // @ts-ignore
        navigator.getBattery().then((battery: any) => {
          setBatteryInfo(`Battery: ${Math.round(battery.level * 100)}% (${battery.charging ? "Charging" : "Discharging"})`);
        });
      }
      // @ts-ignore
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection && connection.effectiveType) {
        setNetworkInfo(`Network: ${connection.effectiveType.toUpperCase()} (${connection.downlink || 0}Mbps)`);
      } else {
        setNetworkInfo("Network: Stable (Online)");
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, `> ${input}`];
    const cmd = input.trim().toLowerCase();

    if (cmd === "help") {
      newHistory.push("Available: help, status, diag, me, matrix-rain, zen, sudo hire, clear, exit");
    } else if (cmd === "status") {
      newHistory.push(batteryInfo);
      newHistory.push(networkInfo);
    } else if (cmd === "zen") {
      newHistory.push("INITIATING ZEN MODE... FOCUSING...");
      window.dispatchEvent(new CustomEvent("trigger-zen"));
      setTimeout(() => setIsOpen(false), 500);
    } else if (cmd === "diag") {
      newHistory.push("RUNNING SYSTEM DIAGNOSTICS...");
      newHistory.push("CPU: OK [8-Core Creative Processor]");
      newHistory.push("RAM: OK [16GB Interactive Memory]");
      newHistory.push("GPU: OK [RTX 4090 Scrollytelling Engine]");
      newHistory.push("UPTIME: 100% RELIABILITY");
    } else if (cmd === "me") {
      newHistory.push("LOADING ASCII AVATAR...");
      newHistory.push("      _.-'''''-._");
      newHistory.push("    .'  _     _  '.");
      newHistory.push("   /   (o)   (o)   \\");
      newHistory.push("  |                 |");
      newHistory.push("  |  \\           /  |");
      newHistory.push("   \\  '.       .'  /");
      newHistory.push("    '.  '-----'  .'");
      newHistory.push("      '-._____.-'");
      newHistory.push("JAYANTA - CREATIVE DEVELOPER");
    } else if (cmd === "matrix-rain") {
      newHistory.push("INITIATING MATRIX PROTOCOL...");
      window.dispatchEvent(new CustomEvent("trigger-matrix"));
      setTimeout(() => setIsOpen(false), 500);
    } else if (cmd.startsWith("sudo hire")) {
      newHistory.push("ACCESS GRANTED. REDIRECTING...");
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => { window.location.href = "mailto:hello@jayanta.dev"; }, 2000);
    } else if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (cmd === "exit") {
      setIsOpen(false);
    } else {
      newHistory.push(`Unknown command: ${cmd}`);
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    playTypeSound();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          className="fixed top-0 left-0 w-full md:w-[600px] md:left-1/2 md:-translate-x-1/2 md:top-20 z-[9999] bg-background/95 glass p-6 rounded-b-2xl md:rounded-2xl shadow-2xl font-mono text-sm overflow-hidden"
        >
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2 relative z-10">
            <span className="text-foreground/40">jayanta@os: ~</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-2 h-2 rounded-full bg-red-500 hover:scale-125 transition-transform" 
                title="Close Terminal"
              />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
          </div>
          
          <div className="h-64 overflow-y-auto flex flex-col gap-1 text-accent/90 relative z-10 scrollbar-hide">
            {history.map((line, i) => (
              <div key={i} className={line.startsWith(">") ? "text-foreground/80" : ""}>{line}</div>
            ))}
          </div>

          <form onSubmit={handleCommand} className="mt-4 flex gap-2 text-foreground relative z-10">
            <span className="text-accent">λ</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              className="bg-transparent outline-none flex-1 font-mono text-foreground placeholder-foreground/20"
              placeholder="type command..."
              autoFocus
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

