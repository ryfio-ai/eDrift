"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { Menu, X, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "/#products" },
    { name: "Technology", href: "/#tech" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Integration */}
        <Link href="/" className="flex items-center gap-3">
           <div className="relative w-64 h-16">
              <Image 
                src="/images/edrift logo.png" 
                alt="eDrift Electric" 
                fill 
                className="object-contain"
                priority
              />
           </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
           {navLinks.map((link) => (
             <Link 
               key={link.name} 
               href={link.href} 
               className="text-sm font-bold text-slate-600 hover:text-royal-blue transition-colors"
             >
               {link.name}
             </Link>
           ))}
           <Link href="/contact">
             <GlowButton variant="primary" size="sm">Get a Quote</GlowButton>
           </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden absolute top-full left-0 right-0 px-6 py-8 shadow-xl"
          >
            <div className="flex flex-col gap-6">
               {navLinks.map((link) => (
                 <Link 
                   key={link.name} 
                   href={link.href} 
                   onClick={() => setMobileMenuOpen(false)}
                   className="text-2xl font-black text-slate-900 flex justify-between items-center"
                 >
                   {link.name} <ChevronRight className="text-royal-blue" />
                 </Link>
               ))}
               <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                 <GlowButton className="w-full">Get a Quote</GlowButton>
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
