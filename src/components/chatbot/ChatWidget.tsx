"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Link as LinkIcon, Calculator, Box, ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Action {
  type: "product" | "calculator";
  slug: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  action?: Action;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm eDrift's AI Expert. How can I assist you with our automotive power electronics or design tools today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);

  const parseAction = (text: string): { cleanText: string; action?: Action } => {
    const actionRegex = /\[ACTION:\s*(product|calculator)=(.*?)\]/;
    const match = text.match(actionRegex);
    
    if (match) {
      return {
        cleanText: text.replace(actionRegex, "").trim(),
        action: {
          type: match[1] as "product" | "calculator",
          slug: match[2].trim()
        }
      };
    }
    
    return { cleanText: text };
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) }),
        headers: { "Content-Type": "application/json" }
      });
      
      const data = await res.json();
      const { cleanText, action } = parseAction(data.content);
      
      setMessages(prev => [...prev, { role: "assistant", content: cleanText, action }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm having a bit of trouble connecting. Please try again or visit our contact page." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionUrl = (action: Action) => {
    return action.type === "product" 
      ? `/products/${action.slug}` 
      : `/design-calculator/${action.slug}`;
  };

  return (
    <div className="flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
            className="mb-4 w-[360px] h-[520px] bg-[#fcfdfe]/95 backdrop-blur-2xl border border-slate-200/50 flex flex-col overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] rounded-[32px] z-[1000] ring-1 ring-black/5"
          >
            {/* Premium Header */}
            <div className="px-6 py-5 bg-white/40 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/10 border border-white/10">
                   <Image 
                     src="/images/edrift logo.png" 
                     alt="eDrift" 
                     width={28} 
                     height={28} 
                     className="object-contain"
                   />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 tracking-tight">eDrift AI Expert</h3>
                   <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Low Latency Groq</span>
                   </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all group"
              >
                 <X className="w-5 h-5 text-slate-400 group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Message Feed */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-8 scroll-smooth no-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex flex-col gap-3", m.role === "user" ? "items-end" : "items-start")}>
                  <div className={cn(
                    "max-w-[85%] px-5 py-4 rounded-[24px] text-[14px] leading-relaxed shadow-sm",
                    m.role === "user" 
                    ? "bg-brand-primary text-white font-medium rounded-tr-none" 
                    : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                  )}>
                    {m.content}
                  </div>
                  
                  {m.action && (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-full max-w-[85%]"
                    >
                      <a 
                        href={getActionUrl(m.action)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 p-4 bg-white border border-slate-100 rounded-[20px] hover:border-brand-primary transition-all group shadow-md hover:shadow-lg"
                      >
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center text-brand-primary">
                               {m.action.type === "product" ? <Box className="w-5 h-5" /> : <Calculator className="w-5 h-5" />}
                            </div>
                            <div>
                               <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recommendation</span>
                               <span className="block text-[13px] font-bold text-slate-800 capitalize">
                                 {m.action.type === "product" ? "View Product Specs" : "Open Engineering Tool"}
                               </span>
                            </div>
                         </div>
                         <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                      </a>
                    </motion.div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-5 py-4 rounded-[24px] rounded-tl-none border border-slate-100 shadow-sm">
                     <div className="flex gap-1">
                        {[0, 1, 2].map((dot) => (
                          <motion.div
                            key={dot}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: dot * 0.2 }}
                            className="w-1.5 h-1.5 rounded-full bg-brand-primary"
                          />
                        ))}
                     </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Layer */}
            <div className="p-8 pt-4 bg-white/80 backdrop-blur-md border-t border-slate-100">
               <div className="relative">
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask about products or calculations..." 
                    className="w-full bg-slate-50 border border-slate-100 rounded-[28px] pl-6 pr-16 py-5 text-[14px] font-medium text-slate-800 focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center hover:scale-[1.05] active:scale-[0.95] transition-all shadow-xl shadow-brand-primary/30 disabled:opacity-30 disabled:scale-100 disabled:shadow-none"
                  >
                     {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
               </div>
               <p className="text-center mt-4 text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                 Advanced Llama 3.3 • Real-time Engineering Context
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-[20px] bg-brand-primary text-white shadow-[0_12px_24px_-6px_rgba(0,134,193,0.4)] flex items-center justify-center relative group overflow-hidden border-2 border-white/40 ring-1 ring-brand-primary/20 transition-all z-[1001]"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};
