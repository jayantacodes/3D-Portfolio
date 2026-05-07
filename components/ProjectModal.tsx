"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
  link: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-md cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100001] w-[90vw] max-w-4xl bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
                <h3 className="text-4xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="flex gap-4">
                  <div className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-white/40 uppercase tracking-widest">
                    Live Demo
                  </div>
                </div>
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 px-8 py-3 bg-white text-black text-center font-bold rounded-full hover:bg-white/90 transition-colors"
                >
                  View Live Site
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
