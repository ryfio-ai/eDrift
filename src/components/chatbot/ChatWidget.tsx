"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Zap, Loader2 } from "lucide-react";
import { GlowButton } from "../ui/GlowButton";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm eDrift's AI assistant. How can I help you with our EV charging solutions today?" }
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
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[380px] h-[500px] glass bg-navy-mid/95 flex flex-col overflow-hidden shadow-2xl border-accent-teal/20"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary-start/20 to-primary-end/20 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent-teal/10 flex items-center justify-center text-accent-teal">
                   <Zap className="w-4 h-4" />
                </div>
                <span className="font-bold text-text-primary">eDrift AI Expert</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-text-secondary hover:text-text-primary transition-colors">
                 <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user" 
                    ? "bg-accent-teal text-navy-dark font-medium rounded-tr-none" 
                    : "bg-white/5 text-text-primary border border-white/5 rounded-tl-none"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none">
                     <Loader2 className="w-4 h-4 animate-spin text-accent-teal" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
               <div className="p-4 pt-0 flex flex-wrap gap-2">
                  {[
                    "OBC Specs",
                    "Portable vs OBC?",
                    "Efficiency rates"
                  ].map(s => (
                    <button 
                       key={s} 
                       onClick={() => setInput(s)}
                       className="text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-text-secondary hover:text-accent-teal hover:border-accent-teal transition-all"
                    >
                       {s}
                    </button>
                  ))}
               </div>
            )}

            {/* Input */}
            <div className="p-4 pt-0">
               <div className="relative">
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask about SiC technology..." 
                    className="w-full bg-navy-dark/50 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:border-accent-teal outline-none transition-colors"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-accent-teal/10 flex items-center justify-center text-accent-teal hover:bg-accent-teal hover:text-navy-dark transition-all disabled:opacity-50"
                  >
                     <Send className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-start to-primary-end text-navy-dark shadow-[0_0_20px_rgba(0,198,255,0.4)] flex items-center justify-center relative group"
      >
        <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20 pointer-events-none group-hover:block hidden" />
        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
      </motion.button>
    </div>
  );
};
