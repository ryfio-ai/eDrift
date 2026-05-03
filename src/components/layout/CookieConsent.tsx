"use client";

import React, { useState, useEffect } from "react";
import { Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("edrift_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("edrift_cookie_consent", "all");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-auto sm:right-6 z-[9999] p-4">
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-border-subtle p-5 flex flex-col gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-text-main text-sm mb-1">We value your privacy</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Allow Cookies", you consent to our use of cookies.
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
