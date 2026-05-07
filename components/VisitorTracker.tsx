"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Monitor, MapPin, Globe } from "lucide-react";

export default function VisitorTracker() {
  const [data, setData] = useState({
    ip: "192.168.1.1",
    browser: "Chrome 124.0",
    os: "Windows 11",
    loc: "Kolkata, IN"
  });

  useEffect(() => {
    const os = navigator.platform;
    const browser = navigator.userAgent.split(" ").pop();
    setData(prev => ({ ...prev, os, browser: browser || "Secure Browser" }));
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-foreground/30 uppercase tracking-[0.2em]">Session Identity</span>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center gap-3">
          <Globe size={14} className="text-accent/60" />
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-foreground/30 uppercase">Protocol IP</span>
            <span className="text-[10px] font-mono text-foreground/80">{data.ip}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Monitor size={14} className="text-accent/60" />
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-foreground/30 uppercase">System OS</span>
            <span className="text-[10px] font-mono text-foreground/80">{data.os}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <MapPin size={14} className="text-accent/60" />
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-foreground/30 uppercase">Location</span>
            <span className="text-[10px] font-mono text-foreground/80">{data.loc}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

