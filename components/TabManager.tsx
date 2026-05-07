"use client";

import { useEffect } from "react";

export default function TabManager() {
  useEffect(() => {
    let originalTitle = document.title;
    let timeoutId: NodeJS.Timeout;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Save the original title just in case it changed
        if (document.title !== "(1) Miss you...") {
          originalTitle = document.title;
        }
        
        // Wait a second before changing it to be less jarring
        timeoutId = setTimeout(() => {
          document.title = "(1) Miss you...";
          
          // Optional: Change favicon
          const link: HTMLLinkElement = document.querySelector("link[rel~='icon']") || document.createElement('link');
          link.type = 'image/svg+xml';
          link.rel = 'shortcut icon';
          // A simple SVG red dot for favicon
          link.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23ff0000%22/></svg>';
          document.head.appendChild(link);
        }, 1000);
      } else {
        clearTimeout(timeoutId);
        document.title = originalTitle;
        
        // Restore original favicon
        const link: HTMLLinkElement = document.querySelector("link[rel~='icon']") || document.createElement('link');
        link.href = '/favicon.ico'; // default nextjs favicon path
        document.head.appendChild(link);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
