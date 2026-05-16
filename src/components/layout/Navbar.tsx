"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown, ChevronRight,
  Settings2, BookOpen, FileText,
  ArrowRight, Download, Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── NAV DATA ───────────────────────────────────────────── */

const productMenu = [
  {
    label: "Portable EV Chargers",
    links: [{ name: "Portable EV Chargers", href: "/products/portable-charger" }],
  },
  {
    label: "On-Board Chargers",
    links: [
      { name: "Single Phase OBC", href: "/products/onboard-charger" },
      { name: "Three Phase OBC", href: "/products/onboard-charger" },
    ],
  },
  {
    label: "DC-DC & Combo",
    links: [
      { name: "On-Board DC-DC", href: "/products" },
      { name: "2-in-1 Integrated OBC", href: "/products" },
      { name: "Bi-Directional (V2L)", href: "/products" },
    ],
  },
];

const resourceMenu = [
  { name: "Case Studies", href: "/case-studies", icon: FileText, desc: "Real-world deployment stories" },
  { name: "Blog", href: "/blog", icon: BookOpen, desc: "Engineering insights & research" },
  { name: "Newsletter", href: "/newsletter", icon: Newspaper, desc: "Stay updated on EV tech" },
];

const companyMenu = [
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

/* ─── TYPES ──────────────────────────────────────────────── */
type MenuKey = "products" | "resources" | "company";

/* ─── MEGA DROPDOWN PANEL ────────────────────────────────── */
interface DropdownProps {
  open: boolean;
  children: React.ReactNode;
}
const Dropdown: React.FC<DropdownProps> = ({ open, children }) => (
  <div
    aria-hidden={!open}
    className="absolute top-full left-0 pt-2 z-50"
    style={{
      opacity: open ? 1 : 0,
      transform: open ? "translateY(0)" : "translateY(-8px)",
      pointerEvents: open ? "auto" : "none",
      transition: "opacity 0.18s ease, transform 0.18s ease",
    }}
  >
    <div className="bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.13)] border border-[#E5E7EB] overflow-hidden">
      <div className="h-0.5 bg-[#0A4FCC]" />
      {children}
    </div>
  </div>
);

/* ─── NAVBAR ─────────────────────────────────────────────── */
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMounted, setMobileMounted] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const pathname = usePathname();
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close on route change */
  useEffect(() => {
    setActiveMenu(null);
    closeMobile();
  }, [pathname]);

  /* helpers */
  const enter = useCallback((menu: MenuKey) => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    openTimer.current = window.setTimeout(() => setActiveMenu(menu), 80);
  }, []);

  const leave = useCallback(() => {
    if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), 160);
  }, []);

  const cancelLeave = useCallback(() => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
  }, []);

  const openMobile = () => {
    setMobileOpen(true);
    requestAnimationFrame(() => setMobileMounted(true));
  };
  const closeMobile = () => {
    setMobileMounted(false);
    setTimeout(() => { setMobileOpen(false); setMobileSection(null); }, 300);
  };

  /* active path checks */
  const isProducts = pathname.startsWith("/products");
  const isResources = ["/case-studies", "/blog", "/resources"].some(p => pathname.startsWith(p));
  const isCompany = ["/about", "/team", "/contact"].some(p => pathname.startsWith(p));

  /* reusable nav-button class */
  const navBtn = (active: boolean) => cn(
    "flex items-center gap-1 text-[15px] font-medium transition-colors duration-150 py-1 relative select-none",
    active ? "text-[#0A4FCC]" : "text-[#374151] hover:text-[#0A4FCC]"
  );

  return (
    <>
      {/* ── FIXED BAR ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] bg-white border-b border-[#E5E7EB] transition-shadow duration-300 print:hidden",
          scrolled && "shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
        )}
        style={{ height: 68 }}
      >
        <div className="max-w-[1280px] mx-auto px-10 h-full flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="shrink-0 flex items-center" style={{ width: 160 }}>
            <div className="relative w-36 h-9">
              <Image
                src="/images/edrift logo.png"
                alt="eDrift Electric"
                fill
                className="object-contain object-left"
                sizes="144px"
                priority
              />
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden lg:flex items-center gap-8 h-full">

            {/* PRODUCTS */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => enter("products")}
              onMouseLeave={leave}
            >
              <button suppressHydrationWarning className={navBtn(isProducts || activeMenu === "products")}>
                Products
                <ChevronDown
                  className="w-3.5 h-3.5 transition-transform duration-200"
                  style={{ transform: activeMenu === "products" ? "rotate(180deg)" : "none" }}
                />
                <span
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#0A4FCC] rounded-full"
                  style={{
                    transform: (isProducts || activeMenu === "products") ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              <Dropdown open={activeMenu === "products"}>
                <div style={{ width: 580 }} onMouseEnter={cancelLeave} onMouseLeave={leave}>
                  <div className="grid grid-cols-3 gap-0 px-6 pt-5 pb-4">
                    {productMenu.map(col => (
                      <div key={col.label} className="pr-5 last:pr-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9CA3AF] mb-3">
                          {col.label}
                        </p>
                        <ul className="space-y-2">
                          {col.links.map(link => (
                            <li key={link.name}>
                              <Link
                                href={link.href}
                                onClick={() => setActiveMenu(null)}
                                className="group flex items-center gap-0 text-[14px] font-medium text-[#374151] hover:text-[#0A4FCC] transition-all duration-150 py-1"
                              >
                                <span className="w-0 group-hover:w-1.5 mr-0 group-hover:mr-2 h-1.5 rounded-full bg-[#0A4FCC] shrink-0 transition-all duration-150" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {/* Bottom bar */}
                  <div className="bg-[#F7F9FF] border-t border-[#E5E7EB] px-6 py-3 flex items-center justify-between">
                    <Link
                      href="/resources"
                      onClick={() => setActiveMenu(null)}
                      className="flex items-center gap-2 text-[13px] text-[#6B7280] hover:text-[#374151] transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Full Product Catalogue
                    </Link>
                    <Link
                      href="/products"
                      onClick={() => setActiveMenu(null)}
                      className="flex items-center gap-1.5 text-[13px] font-semibold text-[#0A4FCC] hover:text-[#002B8A] transition-colors"
                    >
                      View All Products <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Dropdown>
            </div>

            {/* RESOURCES */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => enter("resources")}
              onMouseLeave={leave}
            >
              <button suppressHydrationWarning className={navBtn(isResources || activeMenu === "resources")}>
                Resources
                <ChevronDown
                  className="w-3.5 h-3.5 transition-transform duration-200"
                  style={{ transform: activeMenu === "resources" ? "rotate(180deg)" : "none" }}
                />
                <span
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#0A4FCC] rounded-full"
                  style={{
                    transform: (isResources || activeMenu === "resources") ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              <Dropdown open={activeMenu === "resources"}>
                <div style={{ width: 460 }} onMouseEnter={cancelLeave} onMouseLeave={leave}>
                  <div className="grid grid-cols-2">
                    <div className="px-5 py-5 border-r border-[#F3F4F6]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9CA3AF] mb-3">Explore</p>
                      <ul className="space-y-1">
                        {resourceMenu.map(item => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              onClick={() => setActiveMenu(null)}
                              className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#F7F9FF] transition-colors"
                            >
                              <item.icon className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#0A4FCC] mt-0.5 shrink-0 transition-colors" />
                              <div>
                                <p className="text-[14px] font-medium text-[#374151] group-hover:text-[#0A4FCC] transition-colors">{item.name}</p>
                                <p className="text-[12px] text-[#9CA3AF]">{item.desc}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-5 py-5 flex flex-col gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9CA3AF] mb-3">Featured</p>
                        <div className="bg-[#F7F9FF] rounded-lg p-3 mb-2">
                          <p className="text-[13px] font-semibold text-[#0D1117] leading-snug mb-2">
                            SiC vs IGBT in EV Chargers: Complete Guide
                          </p>
                          <Link
                            href="/blog"
                            onClick={() => setActiveMenu(null)}
                            className="text-[12px] font-semibold text-[#0A4FCC] hover:text-[#002B8A] flex items-center gap-1 transition-colors"
                          >
                            Read Article <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                      <div className="border-t border-[#F3F4F6] pt-4">
                        <p className="text-[12px] text-[#374151] mb-2 font-medium">Subscribe to Newsletter</p>
                        <Link
                          href="/newsletter"
                          onClick={() => setActiveMenu(null)}
                          className="text-[12px] font-semibold text-[#0A4FCC] hover:text-[#002B8A] flex items-center gap-1 transition-colors"
                        >
                          Subscribe Free <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Dropdown>
            </div>

            {/* COMPANY */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => enter("company")}
              onMouseLeave={leave}
            >
              <button suppressHydrationWarning className={navBtn(isCompany || activeMenu === "company")}>
                Company
                <ChevronDown
                  className="w-3.5 h-3.5 transition-transform duration-200"
                  style={{ transform: activeMenu === "company" ? "rotate(180deg)" : "none" }}
                />
                <span
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#0A4FCC] rounded-full"
                  style={{
                    transform: (isCompany || activeMenu === "company") ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              <Dropdown open={activeMenu === "company"}>
                <div style={{ width: 200 }} onMouseEnter={cancelLeave} onMouseLeave={leave}>
                  <ul className="py-2">
                    {companyMenu.map((item, i) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className={cn(
                            "flex items-center justify-between px-5 py-2.5 text-[14px] font-medium text-[#374151] hover:text-[#0A4FCC] hover:bg-[#F7F9FF] transition-all",
                            i < companyMenu.length - 1 && "border-b border-[#F3F4F6]"
                          )}
                        >
                          {item.name}
                          <ChevronRight className="w-3.5 h-3.5 text-[#D1D5DB]" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Dropdown>
            </div>

            {/* DESIGN CALCULATOR — pill */}
            <Link
              href="/engineering-tools"
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full border text-[14px] font-medium transition-all duration-150 whitespace-nowrap",
                pathname.startsWith("/engineering-tools")
                  ? "bg-[#0A4FCC] border-[#0A4FCC] text-white"
                  : "bg-[#EEF4FF] border-[#C7D9FF] text-[#0A4FCC] hover:bg-[#0A4FCC] hover:border-[#0A4FCC] hover:text-white"
              )}
            >
              <Settings2 className="w-3.5 h-3.5 shrink-0" />
              Design Calculator
            </Link>

            {/* CTA */}
            <Link
              href="/contact"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#0A4FCC] text-white text-[14px] font-semibold rounded-lg hover:bg-[#002B8A] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(10,79,204,0.3)] whitespace-nowrap"
            >
              Partner With Us
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </nav>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            suppressHydrationWarning
            className="lg:hidden p-2 text-[#374151] hover:text-[#0A4FCC] transition-colors"
            onClick={mobileOpen ? closeMobile : openMobile}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* height spacer so content flows below the fixed bar */}
      <div style={{ height: 68 }} aria-hidden="true" />

      {/* ── MOBILE DRAWER ── */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/25 z-[98] lg:hidden"
            style={{ opacity: mobileMounted ? 1 : 0, transition: "opacity 0.3s ease" }}
            onClick={closeMobile}
          />
          <div
            className="fixed top-0 right-0 h-full w-[min(360px,100vw)] bg-white z-[99] shadow-2xl flex flex-col lg:hidden"
            style={{
              transform: mobileMounted ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
          >
            {/* header */}
            <div className="flex items-center justify-between px-6 border-b border-[#E5E7EB]" style={{ height: 68 }}>
              <div className="relative w-32 h-8">
                <Image src="/images/edrift logo.png" alt="eDrift" fill className="object-contain object-left" sizes="128px" />
              </div>
              <button onClick={closeMobile} className="p-2 text-[#9CA3AF] hover:text-[#374151]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* scrollable body */}
            <div className="flex-1 overflow-y-auto">
              {/* Products accordion */}
              {[
                { key: "products", label: "Products", items: productMenu.flatMap(c => c.links.map(l => ({ ...l, group: c.label }))) },
              ].map(section => (
                <div key={section.key} className="border-b border-[#F3F4F6]">
                  <button
                    onClick={() => setMobileSection(prev => prev === section.key ? null : section.key)}
                    className="w-full flex items-center justify-between px-6 py-4 text-[15px] font-semibold text-[#0D1117]"
                  >
                    {section.label}
                    <ChevronDown
                      className="w-4 h-4 text-[#9CA3AF] transition-transform duration-200"
                      style={{ transform: mobileSection === section.key ? "rotate(180deg)" : "none" }}
                    />
                  </button>
                  {mobileSection === section.key && (
                    <div className="px-6 pb-4 bg-[#F9FAFB] space-y-1">
                      {productMenu.map(col => (
                        <div key={col.label}>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9CA3AF] pt-3 mb-2">{col.label}</p>
                          {col.links.map(link => (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={closeMobile}
                              className="flex items-center gap-2 py-2 text-[14px] font-medium text-[#374151] hover:text-[#0A4FCC]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C7D9FF] shrink-0" />
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                      <Link
                        href="/products"
                        onClick={closeMobile}
                        className="flex items-center gap-1.5 text-[13px] font-semibold text-[#0A4FCC] pt-3"
                      >
                        View All Products <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              {/* Resources accordion */}
              <div className="border-b border-[#F3F4F6]">
                <button
                  onClick={() => setMobileSection(prev => prev === "resources" ? null : "resources")}
                  className="w-full flex items-center justify-between px-6 py-4 text-[15px] font-semibold text-[#0D1117]"
                >
                  Resources
                  <ChevronDown
                    className="w-4 h-4 text-[#9CA3AF] transition-transform duration-200"
                    style={{ transform: mobileSection === "resources" ? "rotate(180deg)" : "none" }}
                  />
                </button>
                {mobileSection === "resources" && (
                  <div className="px-6 pb-4 bg-[#F9FAFB]">
                    {resourceMenu.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMobile}
                        className="flex items-center gap-3 py-2.5 text-[14px] font-medium text-[#374151] hover:text-[#0A4FCC]"
                      >
                        <item.icon className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Company accordion */}
              <div className="border-b border-[#F3F4F6]">
                <button
                  onClick={() => setMobileSection(prev => prev === "company" ? null : "company")}
                  className="w-full flex items-center justify-between px-6 py-4 text-[15px] font-semibold text-[#0D1117]"
                >
                  Company
                  <ChevronDown
                    className="w-4 h-4 text-[#9CA3AF] transition-transform duration-200"
                    style={{ transform: mobileSection === "company" ? "rotate(180deg)" : "none" }}
                  />
                </button>
                {mobileSection === "company" && (
                  <div className="px-6 pb-4 bg-[#F9FAFB]">
                    {companyMenu.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMobile}
                        className="flex items-center justify-between py-2.5 text-[14px] font-medium text-[#374151] hover:text-[#0A4FCC]"
                      >
                        {item.name}
                        <ChevronRight className="w-3.5 h-3.5 text-[#D1D5DB]" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Design Calculator direct link */}
              <Link
                href="/engineering-tools"
                onClick={closeMobile}
                className="flex items-center gap-2 px-6 py-4 text-[15px] font-semibold border-b border-[#F3F4F6] text-[#0D1117] hover:text-[#0A4FCC] transition-colors"
              >
                <Settings2 className="w-4 h-4 text-[#0A4FCC]" />
                Design Calculator
              </Link>
            </div>

            {/* footer CTAs */}
            <div className="px-6 py-5 border-t border-[#E5E7EB] space-y-3 shrink-0">
              <Link
                href="/contact"
                onClick={closeMobile}
                className="flex items-center justify-center gap-2 w-full bg-[#0A4FCC] hover:bg-[#002B8A] text-white text-[14px] font-semibold py-3 rounded-lg transition-colors"
              >
                Partner With Us <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                onClick={closeMobile}
                className="flex items-center justify-center w-full bg-[#F7F9FF] hover:bg-[#EEF4FF] text-[#0A4FCC] text-[14px] font-semibold py-3 rounded-lg border border-[#C7D9FF] transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
