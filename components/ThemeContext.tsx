"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "cyberpunk" | "forest" | "mono";

interface ThemeSettings {
  theme: Theme;
  scanlines: boolean;
  grain: boolean;
  audioEnabled: boolean;
  performanceMode: boolean;
}

interface ThemeContextType {
  settings: ThemeSettings;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setTheme: (theme: Theme) => void;
  toggleScanlines: () => void;
  toggleGrain: () => void;
  toggleAudio: () => void;
  togglePerformance: () => void;
}

const defaultSettings: ThemeSettings = {
  theme: "cyberpunk",
  scanlines: false,
  grain: true,
  audioEnabled: false,
  performanceMode: false,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  const setTheme = (theme: Theme) => setSettings(s => ({ ...s, theme }));
  const toggleScanlines = () => setSettings(s => ({ ...s, scanlines: !s.scanlines }));
  const toggleGrain = () => setSettings(s => ({ ...s, grain: !s.grain }));
  const toggleAudio = () => setSettings(s => ({ ...s, audioEnabled: !s.audioEnabled }));
  const togglePerformance = () => setSettings(s => ({ ...s, performanceMode: !s.performanceMode }));

  // Apply theme class to body
  useEffect(() => {
    const body = document.body;
    body.classList.remove("theme-cyberpunk", "theme-forest", "theme-mono");
    body.classList.add(`theme-${settings.theme}`);
  }, [settings.theme]);

  return (
    <ThemeContext.Provider value={{ settings, isLoading, setIsLoading, setTheme, toggleScanlines, toggleGrain, toggleAudio, togglePerformance }}>
      {children}
    </ThemeContext.Provider>
  );
};
