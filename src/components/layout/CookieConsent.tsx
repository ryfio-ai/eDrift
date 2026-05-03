"use client";

import React, { useState, useEffect } from "react";
import { Cookie } from "lucide-react";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("edrift_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        requestAnimationFrame(() => setMounted(true));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("edrift_cookie_consent", "all");
    setMounted(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-auto sm:right-6 z-[9999] p-4">
      <div
        className="w-full sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-border-subtle p-5 flex flex-col gap-4"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(50px) scale(0.95)",
          transition: "opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-text-main text-sm mb-1">We value your privacy</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              We use cookies to enhance your browsing experience and analyze our traffic. By clicking &quot;Allow Cookies&quot;, you consent to our use of cookies.
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-1">
          <button
            onClick={handleAcceptAll}
            className="w-full py-2.5 text-sm font-bold text-white bg-brand-primary rounded-lg hover:bg-brand-primary/90 transition-colors shadow-sm"
          >
            Allow Cookies
          </button>
        </div>
      </div>
    </div>
  );
};
