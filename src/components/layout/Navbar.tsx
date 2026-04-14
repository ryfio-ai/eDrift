"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6",
        scrolled 
          ? "bg-white/80 backdrop-blur-xl border-b border-border-strong py-4 shadow-sm" 
          : "bg-white/50 backdrop-blur-sm py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
           <div className="relative w-40 h-10">
              <Image 
                src="/images/edrift logo.png" 
                alt="eDrift Electric" 
                fill 
                className="object-contain object-left"
                priority
              />
           </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
           {navLinks.map((link) => (
             <Link 
                key={link.name} 
                href={link.href} 
                className={cn(
                  "text-sm font-semibold transition-all duration-300 relative py-1",
                  isActive(link.href) 
                    ? "text-brand-primary" 
                    : "text-slate-500 hover:text-slate-900"
                )}
             >
                {link.name}
                {isActive(link.href) && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-primary"
                  />
                )}
             </Link>
           ))}
           <Link href="/contact" className="btn-primary h-10 px-6 text-xs">
             Talk to Engineering
           </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border-strong py-8 px-6 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6">
               {navLinks.map((link) => (
                 <Link 
                   key={link.name} 
                   href={link.href}
                   onClick={() => setMobileMenuOpen(false)}
                   className={cn(
                     "text-lg font-bold flex items-center justify-between group py-2",
                     isActive(link.href) ? "text-brand-primary" : "text-slate-800"
                   )}
                 >
                    {link.name}
                    <ChevronRight className={cn(
                      "w-5 h-5 transition-all",
                      isActive(link.href) ? "text-brand-primary" : "text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1"
                    )} />
                 </Link>
               ))}
               <Link 
                 href="/contact" 
                 onClick={() => setMobileMenuOpen(false)}
                 className="btn-primary w-full py-4 mt-4"
               >
                 Talk to Engineering
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
