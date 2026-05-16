"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Send, Loader2, Calculator, Box, ArrowRight, MessageCircle } from "lucide-react";
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
  const [panelMounted, setPanelMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm eDrift's AI Expert. How can I assist you with our automotive power electronics or design tools today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const parseAction = (text: string): { cleanText: string; action?: Action } => {
    const actionRegex = /\[ACTION:\s*(product|calculator)=(.*?)\]/;
    const match = text.match(actionRegex);
    if (match) {
      return {
        cleanText: text.replace(actionRegex, "").trim(),
        action: { type: match[1] as "product" | "calculator", slug: match[2].trim() }
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
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm having a bit of trouble connecting. Please try again or visit our contact page." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionUrl = (action: Action) => {
    return action.type === "product" ? `/products/${action.slug}` : `/design-calculator/${action.slug}`;
  };

  const toggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      requestAnimationFrame(() => setPanelMounted(true));
    } else {
      setPanelMounted(false);
      setTimeout(() => setIsOpen(false), 400);
    }
  };

  return (
    <div className="flex flex-col items-end relative">
      {isOpen && (
        <div
          className="fixed inset-x-4 md:inset-auto bottom-24 md:bottom-auto md:right-24 md:top-1/2 md:-translate-y-1/2 w-auto md:w-[400px] h-[70vh] md:h-auto md:max-h-[85vh] bg-white/98 backdrop-blur-3xl border border-slate-200/60 flex flex-col overflow-hidden shadow-[0_24px_80px_-12px_rgba(0,0,0,0.2)] rounded-[32px] z-[1000]"
          style={{
            opacity: panelMounted ? 1 : 0,
            transform: panelMounted 
              ? "translate(0, 0) scale(1)" 
              : "translate(0, 20px) scale(0.95)",
            filter: panelMounted ? "blur(0px)" : "blur(8px)",
            transition: "all 0.4s cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          {/* Header */}
          <div className="px-8 py-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-[50px] rounded-full -mr-16 -mt-16" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 p-2">
                  <Image src="/images/edrift logo.png" alt="eDrift" width={32} height={32} className="object-contain brightness-0 invert" />
                </div>
                <div>
                  <h3 className="font-bold text-lg tracking-tight">eDrift Assistant</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/50">Engineering AI</span>
                  </div>
                </div>
              </div>
              <button 
                suppressHydrationWarning 
                onClick={toggleOpen} 
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all group border border-white/10"
              >
                <X className="w-5 h-5 text-white/80 group-hover:rotate-90 transition-transform" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth bg-slate-50/30">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex flex-col gap-2", m.role === "user" ? "items-end" : "items-start")}>
                <div className={cn(
                  "max-w-[85%] px-5 py-4 rounded-3xl text-[14px] leading-relaxed",
                  m.role === "user"
                    ? "bg-brand-primary text-white font-medium rounded-tr-sm shadow-lg shadow-brand-primary/10"
                    : "bg-white text-slate-800 border border-slate-100 rounded-tl-sm shadow-sm"
                )}>
                  {m.content}
                </div>
                {m.action && (
                  <div className="w-full max-w-[85%]" style={{ animation: "heroFadeIn 0.5s ease both" }}>
                    <a
                      href={getActionUrl(m.action)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:border-brand-primary hover:shadow-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-brand-primary">
                          {m.action.type === "product" ? <Box className="w-6 h-6" /> : <Calculator className="w-6 h-6" />}
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Recommended</span>
                          <span className="block text-[13px] font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                            {m.action.type === "product" ? "Product Datasheet" : "Engineering Calculator"}
                          </span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </a>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-5 py-4 rounded-3xl rounded-tl-sm border border-slate-100 shadow-sm flex gap-1.5">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-bounce"
                      style={{ animationDelay: `${dot * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <div className="p-6 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input
                suppressHydrationWarning
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="How can we help?"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-6 pr-14 py-4 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 w-11 h-11 rounded-xl bg-brand-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-30 disabled:scale-100 disabled:shadow-none"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              Llama 3.3 Engine
              <span className="w-1 h-1 rounded-full bg-slate-300" />
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        suppressHydrationWarning
        onClick={toggleOpen}
        className={cn(
          "w-16 h-16 rounded-2xl bg-brand-primary text-white shadow-2xl flex items-center justify-center relative group overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 z-[1001]",
          isOpen && "bg-slate-900"
        )}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X className="w-8 h-8 animate-in spin-in-90 duration-300" />
        ) : (
          <MessageCircle className="w-8 h-8 animate-in zoom-in-50 duration-300" />
        )}
      </button>
    </div>
  );
};
