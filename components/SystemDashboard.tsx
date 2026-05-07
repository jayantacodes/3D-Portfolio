"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutGrid, X, Cpu, Globe, Cloud, Music, Calendar as CalendarIcon, 
  Activity, Zap, Shield, HardDrive, Clock, MousePointer2, Type, 
  Settings, RefreshCw, Terminal, Eye, Volume2, Database, Wifi
} from "lucide-react";
import { CalendarWidget, WeatherWidget } from "./Widgets";
import VisitorTracker from "./VisitorTracker";
import MusicPlayer from "./MusicPlayer";

export default function SystemDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("core");
  
  // System States
  const [rgbEnabled, setRgbEnabled] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(50);
  const [fontMode, setFontMode] = useState("modern");
  const [cursorMode, setCursorMode] = useState("default");
  
  // Simulation Values
  const [cpuLoad, setCpuLoad] = useState(42);
  const [ramLoad, setRamLoad] = useState(68);
  const [netSpeed, setNetSpeed] = useState(840);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(prev => Math.max(10, Math.min(95, prev + (Math.random() * 10 - 5))));
      setRamLoad(prev => Math.max(30, Math.min(90, prev + (Math.random() * 4 - 2))));
      setNetSpeed(prev => Math.max(100, Math.min(1000, prev + (Math.random() * 100 - 50))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSystemOptimize = () => {
    window.dispatchEvent(new CustomEvent("notify", { 
      detail: { message: "System Resources Optimized. Latency reduced by 14ms.", type: "success" } 
    }));
    setCpuLoad(15);
  };

  const menuItems = [
    { id: "core", icon: Cpu, label: "Core" },
    { id: "env", icon: Globe, label: "Env" },
    { id: "advanced", icon: Zap, label: "Advanced" },
    { id: "tools", icon: Settings, label: "Tools" },
  ];

  // Advanced States
  const [perfMode, setPerfMode] = useState("max");
  const [motionBlur, setMotionBlur] = useState(true);
  const [scanlines, setScanlines] = useState(false);
  const [particleDensity, setParticleDensity] = useState(40);
  const [soundProfile, setSoundProfile] = useState("cyber");
  const [autoSave, setAutoSave] = useState(true);
  const [firewallLevel, setFirewallLevel] = useState("strict");
  const [vramOptimized, setVramOptimized] = useState(true);
  const [kernelVersion, setKernelVersion] = useState("beta");
  
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-dashboard", handleOpen);
    return () => window.removeEventListener("open-dashboard", handleOpen);
  }, []);

  return (
    <>


      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[10000] bg-background/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className={`fixed inset-4 md:inset-10 z-[10001] glass rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row ${fontMode === "mono" ? "font-mono" : ""}`}
            >
              {/* Sidebar Navigation */}
              <div className="w-full md:w-24 bg-white/5 border-r border-white/5 flex md:flex-col items-center py-4 md:py-12 gap-8 justify-center md:justify-start">
                <div className="hidden md:block mb-12">
                  <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                    <Activity size={24} />
                  </div>
                </div>
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`p-4 rounded-2xl transition-all ${activeTab === item.id ? "bg-accent text-black scale-110" : "text-foreground/40 hover:text-foreground hover:bg-white/5"}`}
                    title={item.label}
                  >
                    <item.icon size={20} />
                  </button>
                ))}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="md:mt-auto p-4 text-foreground/40 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-12">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h2 className="text-4xl font-black tracking-tighter uppercase">OS <span className="text-accent italic">DASHBOARD</span></h2>
                    <p className="text-[10px] opacity-30 mt-2 tracking-[0.4em]">SYSTEM PROTOCOL v4.2.0 // HIGH_PRIORITY_INTERFACE</p>
                  </div>
                  <div className="hidden lg:flex items-center gap-4">
                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-mono opacity-50">STABLE</span>
                    </div>
                  </div>
                </div>

                {activeTab === "core" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* CPU Status */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono opacity-50 flex items-center gap-2"><Cpu size={12} /> CPU LOAD</span>
                        <span className="text-xs font-bold text-accent">{Math.round(cpuLoad)}%</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div animate={{ width: `${cpuLoad}%` }} className="h-full bg-accent" />
                      </div>
                    </div>

                    {/* RAM Status */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono opacity-50 flex items-center gap-2"><Database size={12} /> RAM USAGE</span>
                        <span className="text-xs font-bold text-blue-400">{Math.round(ramLoad)}%</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div animate={{ width: `${ramLoad}%` }} className="h-full bg-blue-400" />
                      </div>
                    </div>

                    {/* Net Status */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono opacity-50 flex items-center gap-2"><Wifi size={12} /> NETWORK</span>
                        <span className="text-xs font-bold text-purple-400">{Math.round(netSpeed)}Mbps</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div animate={{ width: `${(netSpeed/1000)*100}%` }} className="h-full bg-purple-400" />
                      </div>
                    </div>

                    {/* Security Status */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                        <Shield size={24} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold">FIREWALL ACTIVE</h4>
                        <p className="text-[10px] opacity-40">2,481 threats blocked</p>
                      </div>
                    </div>

                    {/* Storage */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <HardDrive size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold">DRIVE_MAIN</h4>
                        <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="w-[85%] h-full bg-orange-500" />
                        </div>
                      </div>
                    </div>

                    {/* Visitor Stats */}
                    <div className="md:col-span-2 lg:col-span-1 p-6 rounded-3xl bg-white/5 border border-white/5">
                      <VisitorTracker />
                    </div>

                    {/* Quick Optimization */}
                    <button 
                      onClick={handleSystemOptimize}
                      className="md:col-span-2 lg:col-span-3 p-8 rounded-3xl bg-accent text-black font-black uppercase text-xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <RefreshCw size={24} className="animate-spin-slow" />
                      Run Global Optimization
                    </button>
                  </div>
                )}

                {activeTab === "env" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Environment Controllers */}
                    <div className="space-y-6">
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-8">
                        <h3 className="text-xs font-mono opacity-30 flex items-center gap-2"><Globe size={14} /> ENVIRONMENT_VARS</h3>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">RGB Peripheral Sync</span>
                          <button 
                            onClick={() => setRgbEnabled(!rgbEnabled)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${rgbEnabled ? "bg-accent" : "bg-white/10"}`}
                          >
                            <motion.div 
                              animate={{ x: rgbEnabled ? 24 : 4 }}
                              className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-xl" 
                            />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between text-xs opacity-50">
                            <span>Glitch Intensity</span>
                            <span>{glitchIntensity}%</span>
                          </div>
                          <input 
                            type="range" 
                            value={glitchIntensity} 
                            onChange={(e) => setGlitchIntensity(parseInt(e.target.value))}
                            className="w-full accent-accent bg-white/10 rounded-lg appearance-none h-2"
                          />
                        </div>

                        <div className="space-y-4">
                          <span className="text-xs opacity-50">Cursor Manifestation</span>
                          <div className="grid grid-cols-2 gap-2">
                            {["default", "gravity", "invert", "ghost"].map((mode) => (
                              <button
                                key={mode}
                                onClick={() => setCursorMode(mode)}
                                className={`px-4 py-2 rounded-xl text-[10px] uppercase font-bold transition-all ${cursorMode === mode ? "bg-white text-black" : "bg-white/5 hover:bg-white/10"}`}
                              >
                                {mode}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Typography */}
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                        <h3 className="text-xs font-mono opacity-30 flex items-center gap-2"><Type size={14} /> TYPOGRAPHY_ENGINE</h3>
                        <div className="flex flex-col gap-2">
                          {["modern", "mono", "serif"].map((mode) => (
                            <button
                              key={mode}
                              onClick={() => setFontMode(mode)}
                              className={`p-4 rounded-2xl flex justify-between items-center transition-all ${fontMode === mode ? "bg-white/10 border-white/20" : "bg-transparent border-transparent opacity-40 hover:opacity-100"} border`}
                            >
                              <span className="text-sm font-bold uppercase tracking-widest">{mode}</span>
                              <Eye size={16} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Widgets Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-center"><CalendarWidget /></div>
                        <div className="flex justify-center"><WeatherWidget /></div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "advanced" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Performance Mode */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                      <span className="text-[10px] font-mono opacity-30">PERFORMANCE_MODE</span>
                      <div className="flex gap-2">
                        {["max", "eco", "safe"].map(m => (
                          <button key={m} onClick={() => setPerfMode(m)} className={`flex-1 py-2 rounded-xl text-[10px] uppercase font-bold transition-all ${perfMode === m ? "bg-accent text-black" : "bg-white/5"}`}>{m}</button>
                        ))}
                      </div>
                    </div>

                    {/* Motion Blur */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-mono opacity-30">MOTION_BLUR</span>
                      <button onClick={() => setMotionBlur(!motionBlur)} className={`w-10 h-5 rounded-full relative transition-colors ${motionBlur ? "bg-accent" : "bg-white/10"}`}>
                        <motion.div animate={{ x: motionBlur ? 22 : 2 }} className="absolute top-1 w-3 h-3 bg-white rounded-full" />
                      </button>
                    </div>

                    {/* CRT Scanlines */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-mono opacity-30">CRT_SCANLINES</span>
                      <button onClick={() => setScanlines(!scanlines)} className={`w-10 h-5 rounded-full relative transition-colors ${scanlines ? "bg-accent" : "bg-white/10"}`}>
                        <motion.div animate={{ x: scanlines ? 22 : 2 }} className="absolute top-1 w-3 h-3 bg-white rounded-full" />
                      </button>
                    </div>

                    {/* Particle Density */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                      <div className="flex justify-between text-[10px] font-mono opacity-30">
                        <span>PARTICLE_DENSITY</span>
                        <span>{particleDensity}%</span>
                      </div>
                      <input type="range" value={particleDensity} onChange={e => setParticleDensity(parseInt(e.target.value))} className="w-full h-1 accent-accent bg-white/10 appearance-none rounded-full" />
                    </div>

                    {/* Sound Profile */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                      <span className="text-[10px] font-mono opacity-30">SOUND_PROFILE</span>
                      <div className="grid grid-cols-2 gap-2">
                        {["cyber", "clean", "mute", "retro"].map(s => (
                          <button key={s} onClick={() => setSoundProfile(s)} className={`py-2 rounded-xl text-[10px] uppercase font-bold transition-all ${soundProfile === s ? "bg-accent text-black" : "bg-white/5"}`}>{s}</button>
                        ))}
                      </div>
                    </div>

                    {/* Auto-Save */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-mono opacity-30">AUTO_SAVE_PROTOCOL</span>
                      <button onClick={() => setAutoSave(!autoSave)} className={`w-10 h-5 rounded-full relative transition-colors ${autoSave ? "bg-green-500" : "bg-white/10"}`}>
                        <motion.div animate={{ x: autoSave ? 22 : 2 }} className="absolute top-1 w-3 h-3 bg-white rounded-full" />
                      </button>
                    </div>

                    {/* Firewall Level */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                      <span className="text-[10px] font-mono opacity-30">FIREWALL_LEVEL</span>
                      <div className="flex gap-2">
                        {["strict", "open"].map(l => (
                          <button key={l} onClick={() => setFirewallLevel(l)} className={`flex-1 py-2 rounded-xl text-[10px] uppercase font-bold transition-all ${firewallLevel === l ? "bg-red-500 text-white" : "bg-white/5"}`}>{l}</button>
                        ))}
                      </div>
                    </div>

                    {/* VRAM Optimization */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-mono opacity-30">VRAM_OPTIMIZED</span>
                      <button onClick={() => setVramOptimized(!vramOptimized)} className={`w-10 h-5 rounded-full relative transition-colors ${vramOptimized ? "bg-accent" : "bg-white/10"}`}>
                        <motion.div animate={{ x: vramOptimized ? 22 : 2 }} className="absolute top-1 w-3 h-3 bg-white rounded-full" />
                      </button>
                    </div>

                    {/* Kernel Version */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                      <span className="text-[10px] font-mono opacity-30">KERNEL_VERSION</span>
                      <div className="flex gap-2">
                        {["beta", "stable"].map(v => (
                          <button key={v} onClick={() => setKernelVersion(v)} className={`flex-1 py-2 rounded-xl text-[10px] uppercase font-bold transition-all ${kernelVersion === v ? "bg-white text-black" : "bg-white/5"}`}>{v}</button>
                        ))}
                      </div>
                    </div>

                    {/* Experimental: Gravity */}
                    <div className="p-6 rounded-3xl bg-white/10 border border-accent/20 flex justify-between items-center group cursor-help" title="Experimental Feature">
                      <span className="text-[10px] font-mono text-accent">GRAVITY_PHYSICS</span>
                      <div className="w-4 h-4 rounded-full bg-accent animate-ping opacity-20" />
                    </div>

                    {/* Lockdown */}
                    <button 
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent("trigger-glitch"));
                        setIsOpen(false);
                      }}
                      className="p-6 rounded-3xl bg-red-500/20 border border-red-500/30 text-red-500 font-bold uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Shield size={14} />
                      Emergency Lockdown
                    </button>
                    
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center">
                      <span className="text-[10px] font-mono opacity-20 italic">More protocols coming soon...</span>
                    </div>
                  </div>
                )}

                {activeTab === "tools" && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Media */}
                    <div className="lg:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/5">
                      <h3 className="text-xs font-mono opacity-30 flex items-center gap-2 mb-8"><Music size={14} /> AUDIO_PROCESSING</h3>
                      <MusicPlayer />
                    </div>

                    {/* Clock Utility */}
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                      <h3 className="text-xs font-mono opacity-30 flex items-center gap-2"><Clock size={14} /> MULTI_CLOCK</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                          <span className="text-[10px] opacity-40">UTC</span>
                          <span className="font-mono text-xl">{new Date().toISOString().slice(11, 19)}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                          <span className="text-[10px] opacity-40">TOKYO</span>
                          <span className="font-mono text-xl">{new Date(new Date().getTime() + 9*3600*1000).toISOString().slice(11, 19)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] opacity-40">NEW YORK</span>
                          <span className="font-mono text-xl">{new Date(new Date().getTime() - 4*3600*1000).toISOString().slice(11, 19)}</span>
                        </div>
                      </div>
                    </div>

                    {/* System Log */}
                    <div className="lg:col-span-3 p-6 rounded-3xl bg-black/40 border border-white/5 font-mono text-[10px] text-accent/60 h-48 overflow-hidden relative">
                      <div className="absolute top-4 right-6 flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                      </div>
                      <div className="animate-pulse mb-2 tracking-[0.2em] text-accent">SYSTEM_CONSOLE [ACTIVE]</div>
                      <div className="space-y-1">
                        <p>{`> Initializing neural kernel... OK`}</p>
                        <p>{`> Checking network redundancy... [8 nodes found]`}</p>
                        <p>{`> Syncing viewport metrics to cloud_edge_v2`}</p>
                        <p>{`> Security protocols verified: 2048-bit AES`}</p>
                        <p>{`> Memory buffer flushed at 0x7FFF043A`}</p>
                        <p className="text-foreground/30">{`> Background worker #4 active (PID: 2841)`}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
