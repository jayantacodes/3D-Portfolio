"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlitchText from "./GlitchText";
import Logo3D from "./Logo3D";
import { useAudio } from "./AudioManager";
import { Volume2, VolumeX, Terminal as TerminalIcon, Wifi, Battery } from "lucide-react";

const links = [
  { title: "Work", href: "#work" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

export default function Header() {
  const { isMuted, toggleMute } = useAudio();
  const [greeting, setGreeting] = useState("Hello");
  const [time, setTime] = useState("");
  const [battery, setBattery] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after the hero face model animation is fully complete (approx 4.5 screens)
      setIsVisible(window.scrollY > window.innerHeight * 4.4);
    };
    window.addEventListener("scroll", handleScroll);
    
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // @ts-ignore
    if (navigator.getBattery) {
      // @ts-ignore
      navigator.getBattery().then((bat: any) => {
        setBattery(Math.round(bat.level * 100));
        bat.addEventListener("levelchange", () => setBattery(Math.round(bat.level * 100)));
      });
    }

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 w-full z-50 px-6 md:px-20 py-4 flex items-center justify-between glass border-b border-white/5 pointer-events-auto shadow-2xl"
        >
          {/* Brand & Greeting */}
          <div className="flex items-center gap-4">
            <Logo3D />
            <div className="flex flex-col">
              <div className="text-white font-bold text-xl tracking-tighter cursor-pointer interactive">
                <GlitchText text="JAYANTA" />
                <span className="text-white/50 ml-1">®</span>
              </div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mt-1 hidden sm:block">
                {greeting} // {time}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-4 md:gap-12">
            <div className="hidden lg:flex items-center gap-8">
              {links.map((link) => (
                <MagneticLink key={link.title} href={link.href}>
                  {link.title}
                </MagneticLink>
              ))}
            </div>

            {/* System Tray */}
            <div className="flex items-center gap-2 md:gap-6 px-3 md:px-6 py-2 bg-white/10 backdrop-blur-xl rounded-full">
              <div className="flex items-center gap-2 text-foreground/40">
                <Wifi size={14} className="text-accent/50" />
                <span className="text-[10px] font-mono uppercase tracking-widest hidden md:block">ONLINE</span>
              </div>
              
              <div className="flex items-center gap-2 text-foreground/40">
                <Battery size={14} />
                <span className="text-[10px] font-mono uppercase tracking-widest hidden md:block">{battery !== null ? `${battery}%` : "100%"}</span>
              </div>

              <div className="w-[1px] h-3 bg-white/10" />

              <div className="flex items-center gap-4">
                {!isMuted && (
                  <div className="flex items-end gap-[1px] h-3">
                    {[0.6, 0.4, 0.8].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ["20%", "100%", "20%"] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-[1.5px] bg-white"
                      />
                    ))}
                  </div>
                )}

                <button 
                  onClick={toggleMute}
                  className="text-white/50 hover:text-white transition-colors interactive"
                  title="Toggle Ambient Audio"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              <button 
                className="text-white/50 hover:text-white transition-colors interactive" 
                title="Toggle Terminal (~)"
                onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', {'key': '`'}))}
              >
                <TerminalIcon size={16} />
              </button>
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

function MagneticLink({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="text-white/80 hover:text-white font-medium text-xs uppercase tracking-[0.2em] transition-colors interactive py-2"
    >
      {children}
    </motion.a>
  );
}
