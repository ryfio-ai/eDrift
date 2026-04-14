"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm eDrift's AI expert. How can I help you with our power electronics or EV charging solutions today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: [...messages, userMsg] }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm having a bit of trouble connecting. Please try again or contact us directly at info@edriftelectric.com." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[380px] h-[540px] bg-white/80 backdrop-blur-xl border border-white/20 flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[32px] ring-1 ring-black/5"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-br from-brand-primary to-brand-primary-hover text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shadow-sm overflow-hidden shrink-0">
                   <Image 
                     src="/images/edrift logo.png" 
                     alt="eDrift" 
                     width={28} 
                     height={28} 
                     className="object-contain"
                   />
                </div>
                <div>
                   <span className="block font-bold text-sm tracking-tight text-white">eDrift AI Expert</span>
                   <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/80">Online</span>
                   </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                 <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/30">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed ${
                    m.role === "user" 
                    ? "bg-brand-primary text-white font-medium rounded-tr-none shadow-lg shadow-brand-primary/10" 
                    : "bg-white text-text-main border border-slate-100 rounded-tl-none shadow-sm"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                     <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
               <div className="px-6 py-4 bg-slate-50/30 flex flex-wrap gap-2">
                  {[
                    "Technical Specs",
                    "Custom R&D",
                    "Efficiency Rates"
                  ].map(s => (
                    <button 
                       key={s} 
                       onClick={() => setInput(s)}
                       className="text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-full bg-white border border-slate-100 text-slate-500 hover:text-brand-primary hover:border-brand-primary transition-all shadow-sm"
                    >
                       {s}
                    </button>
                  ))}
               </div>
            )}

            {/* Input */}
            <div className="p-6 pt-2 bg-white/50 backdrop-blur-md border-t border-slate-100">
               <div className="relative group">
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..." 
                    className="w-full bg-white border border-border-subtle rounded-2xl pl-5 pr-14 py-4 text-sm font-medium text-text-main focus:border-brand-primary outline-none transition-all shadow-inner"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50"
                  >
                     <Send className="w-5 h-5" />
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-brand-primary text-white shadow-2xl shadow-brand-primary/30 flex items-center justify-center relative group overflow-hidden border-2 border-white"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <div className="relative w-10 h-10 flex items-center justify-center">
            <Image 
              src="/images/edrift logo.png" 
              alt="eDrift" 
              width={40} 
              height={40} 
              className="object-contain invert brightness-0"
            />
          </div>
        )}
      </motion.button>
    </div>
  );
};
