"use client";

import { useEffect } from "react";

export default function ConsoleArt() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;
    
    // Prevent multiple logs in development
    if ((window as any)._consoleArtLogged) return;
    (window as any)._consoleArtLogged = true;

    const ascii = `
      ██╗ █████╗ ██╗   ██╗███████╗███╗   ██╗████████╗ █████╗ 
      ██║██╔══██╗╚██╗ ██╔╝██╔════╝████╗  ██║╚══██╔══╝██╔══██╗
      ██║███████║ ╚████╔╝ █████╗  ██╔██╗ ██║   ██║   ███████║
 ██   ██║██╔══██║  ╚██╔╝  ██╔══╝  ██║╚██╗██║   ██║   ██╔══██║
 ╚█████╔╝██║  ██║   ██║   ███████╗██║ ╚████║   ██║   ██║  ██║
  ╚════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝
    `;
    
    const style1 = "color: #00ff00; font-weight: bold; font-family: monospace;";
    const style2 = "color: #fff; font-size: 14px; font-family: sans-serif;";
    const style3 = "color: #00e5ff; font-size: 16px; font-weight: bold; padding: 10px 0;";

    console.log("%c" + ascii, style1);
    console.log("%cLooking under the hood? Let's build something amazing together.", style3);
    console.log("%cDrop me an email: hello@jayanta.dev", style2);
  }, []);

  return null;
}
