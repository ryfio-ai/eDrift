"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Zap, Loader2, Sparkles } from "lucide-react";
import { GlowButton } from "../ui/GlowButton";

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
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[380px] h-[540px] bg-white border border-slate-200 flex flex-col overflow-hidden shadow-2xl rounded-[32px]"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-royal-blue to-vibrant-purple text-white flex items-center justify-between">
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
                   <span className="block font-black font-sans text-sm tracking-tight text-white">eDrift AI Expert</span>
                   <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] uppercase tracking-widest font-black text-white/70">Online</span>
                   </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                 <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                    m.role === "user" 
                    ? "bg-royal-blue text-white font-medium rounded-tr-none" 
                    : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                     <Loader2 className="w-4 h-4 animate-spin text-royal-blue" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
               <div className="px-6 py-4 bg-slate-50/50 flex flex-wrap gap-2">
                  {[
                    "Technical Specs",
                    "Custom R&D",
                    "Efficiency Rates"
                  ].map(s => (
                    <button 
                       key={s} 
                       onClick={() => setInput(s)}
                       className="text-[10px] uppercase tracking-wider font-black px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-royal-blue hover:border-royal-blue transition-all shadow-sm"
                    >
                       {s}
                    </button>
                  ))}
               </div>
            )}

            {/* Input */}
            <div className="p-6 pt-2 bg-white border-t border-slate-100">
               <div className="relative group">
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-5 pr-14 py-4 text-sm font-medium text-slate-900 focus:border-royal-blue focus:bg-white outline-none transition-all group-hover:border-slate-300"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-royal-blue text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-royal-blue/20 disabled:opacity-50"
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
        className="w-16 h-16 rounded-[24px] bg-gradient-to-r from-royal-blue to-vibrant-purple text-white shadow-2xl shadow-royal-blue/30 flex items-center justify-center relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
      </motion.button>
    </div>
  );
};
