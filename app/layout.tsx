import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import Terminal from "@/components/Terminal";
import AudioManager from "@/components/AudioManager";
import CommandPalette from "@/components/CommandPalette";
import KonamiGravity from "@/components/KonamiGravity";
import ConsoleArt from "@/components/ConsoleArt";
import TabManager from "@/components/TabManager";
import BinaryScroll from "@/components/BinaryScroll";
import AmbientGlow from "@/components/AmbientGlow";
import ContextMenu from "@/components/ContextMenu";
import Scanlines from "@/components/Scanlines";
import ScrollIndicator from "@/components/ScrollIndicator";
import ScrollPath from "@/components/ScrollPath";
import MatrixRain from "@/components/MatrixRain";
import AmbientVisualizer from "@/components/AmbientVisualizer";
import ZenMode from "@/components/ZenMode";
import { ThemeProvider } from "@/components/ThemeContext";
import SettingsPanel from "@/components/SettingsPanel";
import Dock from "@/components/Dock";
import PageLoader from "@/components/PageLoader";
import PixelBackground from "@/components/PixelBackground";
import ClickParticles from "@/components/ClickParticles";
import WindowManager from "@/components/WindowManager";
import Notifications from "@/components/Notifications";
import SystemDashboard from "@/components/SystemDashboard";
import BrowserApp from "@/components/BrowserApp";
import ClientOnly from "@/components/ClientOnly";
import { CornerProgress, ScrollGauge } from "@/components/ScrollGauges";

import { FaviconProgress, RGBGlitch, Connectors } from "@/components/FinalDetails";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jayanta | Creative Developer",
  description: "A high-end scrollytelling personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-full flex flex-col bg-[#121212] text-[#ededed]">
        <ThemeProvider>
          <AudioManager>
            <PageLoader />
            <ClientOnly>
              <ZenMode />
              <WindowManager />
              <Notifications />
              <SystemDashboard />
              <BrowserApp />
              <CornerProgress />
              <ScrollGauge />
              <FaviconProgress />
              <RGBGlitch />
              <Connectors />
              <Dock />
            </ClientOnly>
            <PixelBackground />
            <ClickParticles />
            <ConsoleArt />
            <TabManager />
            <AmbientGlow />
            <AmbientVisualizer />
            <FilmGrain />
            <Scanlines />
            <KonamiGravity />
            <BinaryScroll />
            <ScrollIndicator />
            <ScrollPath />
            <MatrixRain />
            <Terminal />
            <CommandPalette />
            <ContextMenu />
            <SettingsPanel />
            <LenisProvider>
              <CustomCursor />
              {children}
            </LenisProvider>
          </AudioManager>
        </ThemeProvider>



      </body>
    </html>
  );
}
