"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, BookOpen, MessageSquare, HelpCircle, ArrowRight, ExternalLink } from "lucide-react";

export function Testimonials() {
  const reviews = [
    { name: "Alex Rivers", role: "CEO @ FutureTech", text: "Jayanta'S work is simply on another level. The interactions are buttery smooth." },
    { name: "Sarah Chen", role: "Creative Director", text: "A rare blend of high-end design and absolute technical mastery." },
    { name: "Marcus Thorne", role: "Product Manager", text: "Delivered a masterpiece that exceeded all our expectations." }
  ];

  return (
    <section className="py-32 px-6 md:px-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-24 tracking-tighter uppercase">
          CLIENT <span className="text-accent italic">FEEDBACK</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass p-8 rounded-2xl flex flex-col gap-6 group hover:border-accent/30 transition-colors"
            >
              <MessageSquare className="text-accent/40 group-hover:text-accent transition-colors" size={32} />
              <p className="text-lg text-foreground/80 leading-relaxed italic">"{r.text}"</p>
              <div className="mt-auto">
                <h4 className="font-bold text-foreground">{r.name}</h4>
                <span className="text-xs font-mono text-foreground/40 uppercase tracking-widest">{r.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LabGrid() {
  const experiments = [
    { title: "Fluid Simulation", type: "WebGL", link: "#" },
    { title: "Audio Visualizer", type: "Web Audio", link: "#" },
    { title: "Physics Engine", type: "Canvas", link: "#" },
    { title: "Neural Mesh", type: "Three.js", link: "#" }
  ];

  return (
    <section className="py-32 px-6 md:px-20 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tighter uppercase">
            THE <span className="text-accent italic">LAB</span>
          </h2>
          <FlaskConical className="text-accent animate-pulse" size={48} />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {experiments.map((ex, i) => (
            <motion.a
              key={i}
              href={ex.link}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="aspect-square glass rounded-2xl flex flex-col items-center justify-center gap-4 group interactive"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all">
                <ExternalLink size={20} />
              </div>
              <div className="text-center">
                <h4 className="font-bold text-foreground text-sm uppercase tracking-widest">{ex.title}</h4>
                <span className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">{ex.type}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogPreview() {
  const posts = [
    { title: "The Future of Web Interactions", date: "May 12, 2026", category: "Design" },
    { title: "Optimizing WebGL for Mobile", date: "April 28, 2026", category: "Tech" },
    { title: "Building an Immersive Portfolio", date: "March 15, 2026", category: "Insights" }
  ];

  return (
    <section className="py-32 px-6 md:px-20 bg-background border-t border-foreground/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-24 tracking-tighter uppercase">
          INSIGHTS & <span className="text-accent italic">THOUGHTS</span>
        </h2>
        
        <div className="space-y-6">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group flex flex-col md:flex-row md:items-center justify-between p-8 glass rounded-2xl cursor-pointer hover:bg-foreground/5 transition-colors"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-accent uppercase tracking-[0.3em]">{post.category}</span>
                <h3 className="text-2xl md:text-4xl font-bold text-foreground group-hover:translate-x-4 transition-transform duration-500">{post.title}</h3>
              </div>
              <div className="flex items-center gap-8 mt-6 md:mt-0">
                <span className="text-sm font-mono text-foreground/30">{post.date}</span>
                <div className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
                  <ArrowRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [active, setActive] = useState<number | null>(null);
  const questions = [
    { q: "What is your typical project timeline?", a: "Most projects take between 4-8 weeks depending on complexity and specific interaction requirements." },
    { q: "Do you offer full-stack development?", a: "Yes, I specialize in the full cycle from high-fidelity design to robust backend architecture." },
    { q: "How do we get started?", a: "Simply send an email to hello@jayanta.dev or use the contact form to schedule a discovery call." }
  ];

  return (
    <section className="py-32 px-6 md:px-20 bg-background border-t border-foreground/5">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-24 tracking-tighter uppercase text-center">
          ANY <span className="text-accent italic">QUESTIONS?</span>
        </h2>
        
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left group"
              >
                <span className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">{q.q}</span>
                <div className={`transition-transform duration-300 ${active === i ? "rotate-45" : ""}`}>
                  <HelpCircle size={20} className="text-foreground/30" />
                </div>
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-foreground/60 leading-relaxed text-sm font-mono"
                  >
                    {q.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
