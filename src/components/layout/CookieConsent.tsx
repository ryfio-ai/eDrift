"use client";

import React, { useState, useEffect } from "react";
import { Cookie, ShieldCheck, BarChart3, Target, Settings2, Check, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [view, setView] = useState<"summary" | "settings">("summary");
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: true,
    preference: true,
  });

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

  const handleDenyAll = () => {
    localStorage.setItem("edrift_cookie_consent", "essential");
    setIsVisible(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem("edrift_cookie_consent", JSON.stringify(preferences));
    setIsVisible(false);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center gap-4 p-6 border-b border-border-subtle bg-slate-50">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <Cookie className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-text-main tracking-tight">Privacy & Cookie Settings</h2>
                <p className="text-sm text-text-muted">Manage your data preferences</p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto">
              {view === "summary" ? (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <p className="text-text-main leading-relaxed text-[15px]">
                    The <strong className="text-brand-primary">“Allow all cookies”</strong> button gives the website permission to use <strong>all types of cookies</strong>, not just the essential ones.
                  </p>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-3 shadow-sm">
                    <h3 className="font-bold text-text-main flex items-center gap-2 mb-2 text-[15px]">
                      <Info className="w-4 h-4 text-brand-primary" />
                      In simple terms:
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      Clicking <strong>“Allow all cookies”</strong> means you agree to let the website collect data about your activity for functionality, analytics, and advertising purposes.
                    </p>
                    <div className="pt-2">
                      <ul className="text-sm text-text-muted space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-brand-primary font-bold mt-0.5">•</span>
                          <span>If you click <strong>“Deny all”</strong> → Only essential cookies are used.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand-primary font-bold mt-0.5">•</span>
                          <span>If you click <strong>“Cookie settings”</strong> → You can choose which types to allow.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-3"
                >
                  <p className="text-text-main font-bold mb-4 text-[15px]">What happens when you allow cookies?</p>
                  
                  {/* Essential Cookies (Always On) */}
                  <div className="flex gap-4 p-4 rounded-xl border border-border-subtle bg-slate-50/80">
                    <div className="mt-0.5 text-slate-400"><ShieldCheck className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-text-main text-sm">Store necessary cookies</h4>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-200 px-2 py-0.5 rounded">Always On</span>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">Required for basic website functionality (login, navigation, security).</p>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex gap-4 p-4 rounded-xl border border-border-subtle hover:border-brand-primary/30 hover:bg-slate-50/50 transition-all cursor-pointer group" onClick={() => togglePreference("analytics")}>
                    <div className="mt-0.5 text-blue-500"><BarChart3 className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-text-main text-sm group-hover:text-brand-primary transition-colors">Enable analytics cookies</h4>
                        <div className={`w-10 h-5 rounded-full transition-colors relative ${preferences.analytics ? 'bg-brand-primary' : 'bg-slate-200'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${preferences.analytics ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">Track how you use the site (pages visited, time spent) to improve performance.</p>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex gap-4 p-4 rounded-xl border border-border-subtle hover:border-brand-primary/30 hover:bg-slate-50/50 transition-all cursor-pointer group" onClick={() => togglePreference("marketing")}>
                    <div className="mt-0.5 text-pink-500"><Target className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-text-main text-sm group-hover:text-brand-primary transition-colors">Enable marketing/advertising cookies</h4>
                        <div className={`w-10 h-5 rounded-full transition-colors relative ${preferences.marketing ? 'bg-brand-primary' : 'bg-slate-200'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${preferences.marketing ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">Show personalized ads based on your browsing behavior.</p>
                    </div>
                  </div>

                  {/* Preference Cookies */}
                  <div className="flex gap-4 p-4 rounded-xl border border-border-subtle hover:border-brand-primary/30 hover:bg-slate-50/50 transition-all cursor-pointer group" onClick={() => togglePreference("preference")}>
                    <div className="mt-0.5 text-amber-500"><Settings2 className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-text-main text-sm group-hover:text-brand-primary transition-colors">Enable preference cookies</h4>
                        <div className={`w-10 h-5 rounded-full transition-colors relative ${preferences.preference ? 'bg-brand-primary' : 'bg-slate-200'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${preferences.preference ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">Remember your settings (language, region, theme, etc.).</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-5 border-t border-border-subtle bg-slate-50 flex flex-col-reverse sm:flex-row items-center gap-3 justify-end">
              {view === "summary" ? (
                <>
                  <button 
                    onClick={() => setView("settings")}
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-text-muted hover:text-text-main transition-colors sm:mr-auto"
                  >
                    Cookie Settings
                  </button>
                  <button 
                    onClick={handleDenyAll}
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-text-main bg-white border border-border-strong rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Deny All
                  </button>
                  <button 
                    onClick={handleAcceptAll}
                    className="w-full sm:w-auto px-8 py-2.5 text-sm font-bold text-white bg-brand-primary rounded-lg hover:bg-brand-primary/90 transition-colors shadow-md shadow-brand-primary/20"
                  >
                    Allow All Cookies
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setView("summary")}
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-text-muted hover:text-text-main transition-colors sm:mr-auto"
                  >
                    Back to Summary
                  </button>
                  <button 
                    onClick={handleSaveSettings}
                    className="w-full sm:w-auto px-8 py-2.5 text-sm font-bold text-white bg-brand-primary rounded-lg hover:bg-brand-primary/90 transition-colors shadow-md shadow-brand-primary/20 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Save Preferences
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
