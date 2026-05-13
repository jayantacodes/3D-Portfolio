"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X as CloseIcon, RotateCw, ChevronLeft, ChevronRight, Globe, Lock,
  ExternalLink, Bookmark, Search, ShieldAlert, Globe2,
  X, Briefcase, Camera, Hash, Code, Share2
} from "lucide-react";

const WHITELIST = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/jayanta-mondal-44a5473a2", domain: "linkedin.com", icon: <Briefcase size={24} /> },
  { name: "Twitter", url: "https://x.com/JayantaCodes", domain: "x.com", icon: <X size={24} /> },
  { name: "Instagram", url: "https://www.instagram.com/JayantaCodes", domain: "instagram.com", icon: <Camera size={24} /> },
  { name: "Threads", url: "https://www.threads.net/@JayantaCodes", domain: "threads.net", icon: <Hash size={24} /> },
  { name: "Facebook", url: "https://www.facebook.com/JayantaCodes", domain: "facebook.com", icon: <Share2 size={24} /> },
  { name: "Github", url: "https://github.com/jayantacodes", domain: "github.com", icon: <Code size={24} /> }
];

export default function BrowserApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("nova://home");
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState(["nova://home"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRestricted, setIsRestricted] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-browser", handleOpen);
    return () => window.removeEventListener("open-browser", handleOpen);
  }, []);

  const navigateTo = (url: string) => {
    setIsLoading(true);
    setIsRestricted(false);

    // Check if URL is whitelisted
    const isWhitelisted = WHITELIST.some(item => url.includes(item.domain));
    const isHome = url === "nova://home";

    setTimeout(() => {
      if (isHome || isWhitelisted) {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(url);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setCurrentUrl(url);
        setInputValue(url);
      } else {
        setIsRestricted(true);
        setCurrentUrl("nova://restricted");
        setInputValue(url);
      }
      setIsLoading(false);
    }, 800);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = inputValue.toLowerCase();
    if (!url.startsWith("http") && !url.startsWith("nova://")) {
      url = "https://" + url;
    }
    navigateTo(url);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentUrl(history[historyIndex - 1]);
      setInputValue(history[historyIndex - 1]);
      setIsRestricted(false);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentUrl(history[historyIndex + 1]);
      setInputValue(history[historyIndex + 1]);
      setIsRestricted(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed inset-4 md:inset-20 z-[5000] glass rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
        >
          {/* Browser Header */}
          <div className="bg-white/5 border-b border-white/5 p-4 flex items-center gap-4">
            <div className="flex gap-2 mr-4">
              <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500 hover:brightness-125 transition-all flex items-center justify-center">
                <CloseIcon size={8} className="text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-50" />
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-50" />
            </div>

            <div className="flex items-center gap-2 text-white/40">
              <button onClick={goBack} disabled={historyIndex === 0} className="hover:text-white disabled:opacity-20 transition-colors"><ChevronLeft size={20} /></button>
              <button onClick={goForward} disabled={historyIndex === history.length - 1} className="hover:text-white disabled:opacity-20 transition-colors"><ChevronRight size={20} /></button>
              <button onClick={() => navigateTo(currentUrl)} className="hover:text-white transition-colors ml-2"><RotateCw size={16} className={isLoading ? "animate-spin" : ""} /></button>
            </div>

            <form onSubmit={handleInputSubmit} className="flex-1 max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
                  {isRestricted ? <ShieldAlert size={14} className="text-red-500" /> : <Lock size={14} />}
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-full py-2 px-10 text-xs font-mono text-white/80 outline-none focus:border-accent/50 transition-all"
                />
              </div>
            </form>

            <div className="flex items-center gap-4 text-white/40 ml-4">
              <Globe size={18} />
              <div className="w-[1px] h-4 bg-white/10" />
              <div className="text-[10px] font-mono tracking-tighter uppercase">Nova v1.0.4</div>
            </div>
          </div>

          {/* Browser Content */}
          <div className="flex-1 bg-[#050505] relative overflow-hidden">
            <AnimatePresence mode="wait">
              {currentUrl === "nova://home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-20 h-20 rounded-3xl bg-accent/20 flex items-center justify-center text-accent mb-8">
                    <Globe2 size={40} />
                  </div>
                  <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">NOVA <span className="text-accent italic">BROWSER</span></h1>
                  <p className="text-white/30 font-mono text-xs mb-12 max-w-sm tracking-widest">ENCRYPTED_PORTAL // SYSTEM_WHITELIST_ACTIVE</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-xl w-full">
                    {WHITELIST.map((site) => (
                      <button
                        key={site.name}
                        onClick={() => navigateTo(site.url)}
                        className="p-6 glass rounded-2xl border border-white/5 hover:border-accent/30 hover:bg-white/5 transition-all group text-center"
                      >
                        <div className="text-white/20 group-hover:text-accent transition-colors mb-2 flex justify-center">
                          {site.icon}
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest block">{site.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentUrl === "nova://restricted" && (
                <motion.div
                  key="restricted"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mb-6">
                    <ShieldAlert size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-red-500 uppercase tracking-tighter mb-4">Access Restricted</h2>
                  <p className="text-white/40 font-mono text-xs max-w-md leading-relaxed">
                    The requested URL is not on the system whitelist. To maintain system integrity, only authorized social protocols are permitted in this session.
                  </p>
                  <button
                    onClick={() => navigateTo("nova://home")}
                    className="mt-8 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Return Home
                  </button>
                </motion.div>
              )}

              {currentUrl.startsWith("http") && !isRestricted && (
                <motion.div
                  key="site"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-white mb-8">
                    <Globe size={48} />
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter uppercase mb-4">Ready to Launch</h2>
                  <p className="text-white/40 font-mono text-xs mb-12 max-w-md">
                    Secure handshake complete. Redirecting to external protocol: <span className="text-accent">{currentUrl}</span>
                  </p>

                  <a
                    href={currentUrl} target="_blank" rel="noopener noreferrer"
                    className="px-12 py-4 bg-accent text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all flex items-center gap-3 shadow-2xl shadow-accent/20"
                  >
                    Enter Portal
                    <ExternalLink size={18} />
                  </a>

                  <button
                    onClick={() => navigateTo("nova://home")}
                    className="mt-8 text-[10px] font-mono text-white/20 hover:text-white transition-colors"
                  >
                    ABORT_CONNECTION
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading Overlay */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#050505] z-50 flex flex-col items-center justify-center"
                >
                  <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full bg-accent"
                    />
                  </div>
                  <span className="mt-4 text-[8px] font-mono text-white/20 uppercase tracking-[0.5em] animate-pulse">Syncing Protocols...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
