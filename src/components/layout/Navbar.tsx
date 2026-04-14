"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: motionTokens.easeEnter }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all",
        scrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-border-subtle py-3 shadow-sm" 
          : "bg-transparent py-5"
      )}
      style={{
        transitionDuration: `${motionTokens.durationFast * 1000}ms`,
        transitionTimingFunction: `cubic-bezier(${motionTokens.easeEnter.join(",")})`
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
           <div className="relative w-36 h-9">
              <Image 
                src="/images/edrift logo.png" 
                alt="eDrift Electric" 
                fill 
                className="object-contain object-left"
                priority
              />
           </div>
        </Link>

        {/* Desktop Links - Geist font for Swiss B2B feel */}
        <div className="hidden lg:flex items-center gap-8">
           {navLinks.map((link) => (
             <Link 
                key={link.name} 
                href={link.href} 
                className={cn(
                  "text-[13px] font-heading font-semibold transition-colors relative py-1",
                  isActive(link.href) 
                    ? "text-brand-primary" 
                    : "text-text-muted hover:text-text-main"
                )}
             >
                {link.name}
                {isActive(link.href) && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-brand-primary"
                    transition={{ duration: 0.18, ease: motionTokens.easeEnter }}
                  />
                )}
             </Link>
           ))}
           <Link href="/contact" className="btn-primary h-9 px-5 text-[12px]">
             Talk to Engineering
           </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-text-muted"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.32, ease: motionTokens.easeEnter }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border-strong py-6 px-6 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col gap-4">
               {navLinks.map((link) => (
                 <Link 
                   key={link.name} 
                   href={link.href}
                   onClick={() => setMobileMenuOpen(false)}
                   className={cn(
                     "text-base font-heading font-semibold flex items-center justify-between py-2 border-b border-border-subtle last:border-0",
                     isActive(link.href) ? "text-brand-primary" : "text-text-main"
                   )}
                 >
                    {link.name}
                    <ChevronRight className="w-4 h-4 text-text-faint" />
                 </Link>
               ))}
               <Link 
                 href="/contact" 
                 onClick={() => setMobileMenuOpen(false)}
                 className="btn-primary w-full py-3 mt-2"
               >
                 Talk to Engineering
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
