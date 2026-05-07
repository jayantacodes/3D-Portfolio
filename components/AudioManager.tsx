"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playHoverSound: () => void;
  playClickSound: () => void;
  playTypeSound: () => void;
}

const AudioContext = createContext<AudioContextType>({
  isMuted: true,
  toggleMute: () => {},
  playHoverSound: () => {},
  playClickSound: () => {},
  playTypeSound: () => {},
});

export const useAudio = () => useContext(AudioContext);

export default function AudioManager({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOscillatorRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtxRef.current = new AudioContextClass();

    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    if (!isMuted) {
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(55, ctx.currentTime);

      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(5, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 3);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      lfo.start();

      droneOscillatorRef.current = osc;
      droneGainRef.current = gainNode;
    } else {
      if (droneGainRef.current && droneOscillatorRef.current) {
        droneGainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          droneOscillatorRef.current?.stop();
          droneOscillatorRef.current?.disconnect();
          droneGainRef.current?.disconnect();
        }, 1000);
      }
    }
  }, [isMuted]);

  const playHoverSound = () => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  const playClickSound = () => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  const playTypeSound = () => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.02);
  };

  const toggleMute = () => {
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button") || target.classList.contains("interactive")) {
        playHoverSound();
      }
    };
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button") || target.classList.contains("interactive")) {
        playClickSound();
      }
    };
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
    };
  }, [isMuted]);

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playHoverSound, playClickSound, playTypeSound }}>
      {children}
    </AudioContext.Provider>
  );
}
