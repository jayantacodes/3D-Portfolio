"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Music, Volume2 } from "lucide-react";
import { useAudio } from "./AudioManager";

export default function MusicPlayer() {
  const { isMuted, toggleMute } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent animate-pulse">
          <Music size={24} />
        </div>
        
        <div className="flex flex-col gap-1 pr-4">
          <span className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">Ambient Audio</span>
          <h4 className="text-xs font-bold text-foreground tracking-tight">Drone_v04.sys</h4>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <SkipBack size={14} className="text-foreground/30 hover:text-foreground cursor-pointer transition-colors" />
          <button 
            onClick={() => { setIsPlaying(!isPlaying); if (isMuted) toggleMute(); }}
            className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-110 transition-transform"
          >
            {!isMuted && isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>
          <SkipForward size={14} className="text-foreground/30 hover:text-foreground cursor-pointer transition-colors" />
        </div>

        <div className="flex flex-col gap-2 flex-grow max-w-[120px]">
          <div className="flex gap-1 items-end h-6 justify-center">
            {[0.4, 0.7, 0.3, 0.9, 0.5].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: isPlaying && !isMuted ? ["20%", "100%", "20%"] : "20%" }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 bg-accent/40 rounded-full"
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Volume2 size={12} className="text-foreground/40" />
            <div className="flex-grow h-1 bg-foreground/10 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-accent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

