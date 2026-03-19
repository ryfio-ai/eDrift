"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { GlowButton } from "@/components/ui/GlowButton";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  
  return (
    <header className={cn("fixed top-6 inset-x-0 w-full z-50 px-4", className)}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
           <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center font-bold text-navy-dark text-xl group-hover:shadow-[0_0_15px_rgba(0,198,255,0.5)] transition-all">
             e
           </div>
           <span className="font-space text-2xl font-black tracking-tighter text-text-primary">
             eDrift <span className="text-accent-teal">Electric</span>
           </span>
        </Link>

        {/* Navigation Menu */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Products">
              <div className="grid grid-cols-2 gap-10 p-4">
                <ProductItem
                  title="On-Board Charger"
                  href="/products/onboard-charger"
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=300&h=200&auto=format&fit=crop"
                  description="Advanced OBC with 98% efficiency and IP67 rating."
                />
                <ProductItem
                  title="Portable Charger"
                  href="/products/portable-charger"
                  src="https://images.unsplash.com/photo-1695653422718-990ff7302c61?q=80&w=300&h=200&auto=format&fit=crop"
                  description="Compact and lightweight charging on the go."
                />
                <ProductItem
                  title="DC-DC Converter"
                  href="#"
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=300&h=200&auto=format&fit=crop"
                  description="High-performance isolated power conversion (Coming Soon)."
                />
                <ProductItem
                  title="Bidirectional Charger"
                  href="#"
                  src="https://images.unsplash.com/photo-1558444479-c86e1055639d?q=80&w=300&h=200&auto=format&fit=crop"
                  description="Vehicle-to-Everything (V2X) technology (Coming Soon)."
                />
              </div>
            </MenuItem>
            
            <MenuItem setActive={setActive} active={active} item="Solution">
              <div className="flex flex-col space-y-4 text-sm w-48">
                <HoveredLink href="/#about">About Us</HoveredLink>
                <HoveredLink href="/#tech">Engineering</HoveredLink>
                <HoveredLink href="/#mission">Our Mission</HoveredLink>
                <HoveredLink href="/#clients">Partners</HoveredLink>
              </div>
            </MenuItem>
            
            <MenuItem setActive={setActive} active={active} item="Company">
               <div className="flex flex-col space-y-4 text-sm w-48">
                <HoveredLink href="/#team">Our Team</HoveredLink>
                <HoveredLink href="/contact">Careers</HoveredLink>
                <HoveredLink href="/contact">Press Kits</HoveredLink>
              </div>
            </MenuItem>
          </Menu>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
           <Link href="/contact" className="hidden sm:block">
              <GlowButton className="text-sm px-5 py-2.5">Get a Quote</GlowButton>
           </Link>
           {/* Mobile menu toggle would go here */}
        </div>
      </div>
    </header>
  );
}
