"use client";

import React, { useState, useEffect } from "react";
import { X, Cookie, ShieldCheck } from "lucide-react";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("edrift_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("edrift_cookie_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-6 right-6 md:left-auto md:right-8 md:w-[420px] z-[9999] animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="relative overflow-hidden p-6 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
        {/* Decorative background pulse */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Cookie className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg tracking-tight">Cookie Settings_</h3>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Privacy & Performance</p>
            </div>
          </div>

          <p className="text-white/60 text-sm leading-relaxed mb-8">
            We use technical cookies to optimize your engineering workflows and enhance platform security. By accepting, you agree to our specialized data usage policy.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAccept}
              className="flex-grow bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 group"
            >
              <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Accept All
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="bg-white/5 hover:bg-white/10 text-white/80 px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all border border-white/5"
            >
              Details
            </button>
          </div>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-2 text-white/20 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
