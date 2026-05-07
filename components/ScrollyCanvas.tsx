"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useVelocity, useSpring } from "framer-motion";
import { useTheme } from "./ThemeContext";
import Overlay from "./Overlay";
import Preloader from "./Preloader";

const FRAME_COUNT = 120; // 0 to 119

const getFrameString = (index: number) => {
  return index.toString().padStart(3, "0");
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [canvasOpacity, setCanvasOpacity] = useState(0);

  const { scrollYProgress } = useScroll({

    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { settings } = useTheme();
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);


  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const glitchOpacity = useTransform(smoothVelocity, [-2, 0, 2], [0.3, 0, 0.3]);

  useEffect(() => {
    
    const loadImage = (index: number): Promise<HTMLImageElement> => {

      return new Promise((resolve) => {
        const img = new Image();
        img.src = `/sequence/frame_${getFrameString(index)}_delay-0.066s.webp`;
        img.onload = () => {
          setLoadingProgress(Math.round(((index + 1) / FRAME_COUNT) * 100));
          resolve(img);
        };
        img.onerror = () => {
          console.error(`Failed to load frame ${index}`);
          resolve(new Image()); 
        };
      });
    };

    const loadAllImages = async () => {
      try {
        const loadedImages = await Promise.all(
          Array.from({ length: FRAME_COUNT }).map((_, i) => loadImage(i))
        );
        setImages(loadedImages);
        setImagesLoaded(true);
        setTimeout(() => setCanvasOpacity(1), 100);
        window.dispatchEvent(new CustomEvent("notify", { 
          detail: { message: "Cinematic Protocol Active", type: "success" } 
        }));

      } catch (err) {
        console.error("Critical error loading cinematic frames:", err);
      }
    };

    loadAllImages();
  }, []);

  const renderCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = img.width / img.height;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect > imgAspect) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgAspect;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgAspect;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.round(latest);
    if (images[index]) {
      renderCanvas(images[index]);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const index = Math.round(frameIndex.get());
        if (images[index]) renderCanvas(images[index]);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          style={{ 
            transition: "filter 0.5s ease, opacity 1s ease",
            opacity: canvasOpacity
          }}
          className="block h-full w-full object-cover"
        />
        
        <motion.div 
          style={{ opacity: glitchOpacity }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none"
        />

        <Overlay scrollYProgress={scrollYProgress} />
        <Preloader progress={loadingProgress} isLoading={!imagesLoaded} />
      </div>
    </div>
  );
}

