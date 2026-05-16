"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Zap, Microscope, Users, Rocket, 
  ArrowRight, Download, Mail, 
  CheckCircle2, Info, ChevronRight,
  Monitor, Cpu, Beaker, FileText,
  UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CareersClient() {
  const [activeSection, setActiveSection] = useState("mission");
  const [formData, setFormData] = useState({ name: "", email: "", domain: "" });

  // Handle intersection observer for sticky nav
  useEffect(() => {
    const sections = ["mission", "values", "why-edrift", "process", "open-roles"];
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="bg-white min-h-screen font-sans">
      
      {/* S1: HERO SECTION */}
      <section className="relative bg-[#0B1120] overflow-hidden py-24 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 20 L100 20 M0 40 L100 40 M0 60 L100 60 M0 80 L100 80 M20 0 L20 100 M40 0 L40 100 M60 0 L60 100 M80 0 L80 100" stroke="white" strokeWidth="0.1" fill="none" />
            <circle cx="20" cy="20" r="0.5" fill="white" />
            <circle cx="40" cy="40" r="0.5" fill="white" />
            <circle cx="60" cy="60" r="0.5" fill="white" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#002B8A]/30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block text-[#60A5FA] text-[12px] font-bold uppercase tracking-[0.15em] mb-6">
            Join the Team
          </span>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-[1.1] mb-8 max-w-4xl mx-auto">
            Engineer the Future <br className="hidden md:block" /> of EV Power Electronics
          </h1>
          <p className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            We are a deep-tech power electronics company building next-generation EV charging systems using SiC and GaN semiconductor technology. We are looking for engineers who love hard problems.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button 
              suppressHydrationWarning
              onClick={() => scrollTo("open-roles")}
              className="w-full sm:w-auto bg-[#0A4FCC] hover:bg-[#002B8A] text-white px-8 h-14 rounded-lg font-bold text-base transition-all shadow-lg flex items-center justify-center gap-2"
            >
              View Open Roles <ChevronRight className="w-4 h-4 mt-0.5" />
            </button>
            <button 
              suppressHydrationWarning
              onClick={() => scrollTo("notify")}
              className="w-full sm:w-auto bg-transparent border border-white/20 hover:border-white/40 text-white px-8 h-14 rounded-lg font-bold text-base transition-all flex items-center justify-center gap-2"
            >
              Stay Notified <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Stats Row */}
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Deep-Tech", sub: "Team" },
                { label: "SiC & GaN", sub: "Focus" },
                { label: "End-to-End", sub: "Design" },
                { label: "Research", sub: "Driven" }
              ].map((stat, i) => (
                <div key={i} className="text-center relative group">
                  {i !== 0 && <div className="hidden md:block absolute left-[-16px] top-1/2 -translate-y-1/2 w-[1px] h-8 bg-white/20" />}
                  <div className="text-white font-bold text-lg mb-1">{stat.label}</div>
                  <div className="text-[#9CA3AF] text-[12px] uppercase tracking-wider font-semibold">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STICKY PAGE NAV */}
      <nav className="sticky top-[68px] z-40 bg-white border-b border-[#E5E7EB] h-14 hidden md:block shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center gap-10">
          {[
            { id: "mission", label: "Mission" },
            { id: "values", label: "Values" },
            { id: "why-edrift", label: "Why Edrift" },
            { id: "process", label: "Process" },
            { id: "open-roles", label: "Open Roles" }
          ].map((item) => (
            <button
              key={item.id}
              suppressHydrationWarning
              onClick={() => scrollTo(item.id)}
              className={cn(
                "h-full text-[13px] font-semibold transition-all relative px-1",
                activeSection === item.id 
                  ? "text-[#0A4FCC]" 
                  : "text-[#4B5563] hover:text-[#0A4FCC]"
              )}
            >
              {item.label}
              {activeSection === item.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A4FCC]" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* S2: MISSION STATEMENT */}
      <section id="mission" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="inline-block text-[#0A4FCC] text-[12px] font-bold uppercase tracking-[0.15em] mb-4">
                Our Mission
              </span>
              <h2 className="text-[#0B1120] text-3xl md:text-4xl font-bold font-heading leading-tight mb-8">
                Powering the Shift to <br /> Electric Mobility — <br /> From Silicon to System
              </h2>
              <div className="space-y-6 text-[#374151] text-[17px] leading-relaxed">
                <p>
                  Edrift Electric is building the next generation of power electronics for the EV charging ecosystem. We work at the intersection of semiconductor physics, magnetics design, and power conversion — solving problems that matter.
                </p>
                <p>
                  Our goal is to eliminate range anxiety and infrastructure bottlenecks by creating high-density, high-efficiency conversion hardware that scales with the global demand for electrification.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-[3px] bg-[#0A4FCC]" />
              <div className="pl-12">
                <blockquote className="text-[#0B1120] text-xl md:text-2xl font-semibold font-heading leading-[1.5] mb-6">
                  "We build the technology that goes inside EV chargers. Every line of design, every semiconductor choice, every magnetic calculation — is an act of engineering excellence."
                </blockquote>
                <cite className="text-[#6B7280] text-sm font-medium not-italic block">
                  — Edrift Engineering Team
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S3: CORE VALUES */}
      <section id="values" className="py-24 bg-[#F7F9FF] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-[#0A4FCC] text-[12px] font-bold uppercase tracking-[0.15em] mb-4">
              What We Stand For
            </span>
            <h2 className="text-[#0B1120] text-3xl md:text-4xl font-bold font-heading mb-6">Our Core Values</h2>
            <p className="text-[#6B7280] max-w-lg mx-auto">
              The principles that shape how we engineer, collaborate, and grow as a technology-first organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { 
                icon: Zap, 
                title: "Engineering Excellence", 
                body: "We pursue precision in every design decision — from topology selection to final validation."
              },
              { 
                icon: Microscope, 
                title: "Deep Specialization", 
                body: "We work at the frontier of SiC, GaN, and magnetic design — where few engineers dare to go."
              },
              { 
                icon: Users, 
                title: "First Principles Thinking", 
                body: "We solve problems from the ground up. No assumptions. No shortcuts. Just physics."
              },
              { 
                icon: Rocket, 
                title: "Ownership Mindset", 
                body: "Every engineer at Edrift owns their work end-to-end — from concept to tested hardware."
              }
            ].map((value, i) => (
              <div key={i} className="bg-white border border-[#E5E7EB] rounded-xl p-8 hover:border-[#0A4FCC] transition-all group">
                <div className="w-14 h-14 bg-[#EEF4FF] rounded-full flex items-center justify-center mb-6 transition-colors group-hover:bg-[#0A4FCC]/10">
                  <value.icon className="w-7 h-7 text-[#0A4FCC]" />
                </div>
                <h3 className="text-[#0B1120] text-xl font-bold font-heading mb-3">{value.title}</h3>
                <p className="text-[#374151] text-[15px] leading-relaxed">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S4: WHY JOIN EDRIFT */}
      <section id="why-edrift" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="inline-block text-[#0A4FCC] text-[12px] font-bold uppercase tracking-[0.15em] mb-4">
              Why Edrift
            </span>
            <h2 className="text-[#0B1120] text-3xl md:text-4xl font-bold font-heading mb-6">
              An Environment Where <br className="hidden md:block" /> Engineers Truly Thrive
            </h2>
            <p className="text-[#6B7280] max-w-xl">
              We offer more than a job. We offer a place to do your best engineering work alongside people who share your passion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: Cpu, 
                title: "Cutting-Edge Silicon", 
                body: "Work hands-on with SiC and GaN devices at the frontier of power electronics."
              },
              { 
                icon: Monitor, 
                title: "End-to-End Design", 
                body: "From schematic to prototype to tested system — you own the full engineering cycle."
              },
              { 
                icon: Beaker, 
                title: "Research-Grade Tools", 
                body: "Access to advanced lab equipment, simulation tools, and proprietary design calculators."
              },
              { 
                icon: Users, 
                title: "Technical Mentorship", 
                body: "Work directly with senior power electronics engineers and researchers in an open environment."
              },
              { 
                icon: FileText, 
                title: "Publication & IP", 
                body: "Contribute to patents, white papers, and engineering publications in your specialized field."
              },
              { 
                icon: ArrowRight, 
                title: "Career Ladder", 
                body: "Clear technical career path. Engineer → Senior → Lead → Principal Engineer."
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-[#F7F9FF] rounded-xl p-8 hover:bg-white hover:border hover:border-[#C7D9FF] hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <benefit.icon className="w-6 h-6 text-[#0A4FCC]" />
                </div>
                <h4 className="text-[#0B1120] text-lg font-bold font-heading mb-3">{benefit.title}</h4>
                <p className="text-[#374151] text-sm leading-relaxed">
                  {benefit.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S5: TEAM CULTURE */}
      <section className="py-24 bg-[#0B1120] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block text-[#60A5FA] text-[12px] font-bold uppercase tracking-[0.15em] mb-4">
            Our Culture
          </span>
          <h2 className="text-white text-3xl md:text-4xl font-bold font-heading mb-16">
            We Are Researchers, <br className="md:hidden" /> Engineers, and Builders
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { src: "/images/page-images/career-page/lab.png", alt: "Power Electronics Lab" },
              { src: "/images/page-images/career-page/discussion.png", alt: "Team technical discussion" },
              { src: "/images/page-images/career-page/prototype.png", alt: "Hardware prototyping" }
            ].map((img, i) => (
              <div key={i} className="aspect-[4/3] bg-white/5 rounded-xl relative overflow-hidden group">
                <Image 
                  src={img.src} 
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <div className="absolute inset-0 bg-[#0A4FCC]/10 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <span className="text-[#0A4FCC] text-6xl leading-none font-serif block mb-4">"</span>
            <p className="text-[#E5E7EB] text-xl font-medium font-heading leading-relaxed mb-6">
              At Edrift, every engineer works on problems that genuinely matter — pushing the limits of what silicon and magnetics can do.
            </p>
            <cite className="text-[#6B7280] text-sm not-italic font-medium">
              — Edrift Electric, Founding Engineering Team
            </cite>
          </div>
        </div>
      </section>

      {/* S6: HIRING PROCESS */}
      <section id="process" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-[#0A4FCC] text-[12px] font-bold uppercase tracking-[0.15em] mb-4">
              Hiring Process
            </span>
            <h2 className="text-[#0B1120] text-3xl md:text-4xl font-bold font-heading mb-6">What to Expect When You Apply</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto">
              We value technical depth, first-principles thinking, and genuine curiosity. Our process is transparent and fast.
            </p>
          </div>

          <div className="relative mt-20">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-dashed border-t border-dashed border-[#E5E7EB] z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {[
                { 
                  num: "01", 
                  title: "Application", 
                  body: "Submit your profile. We review every application for technical relevance.",
                  time: "1-2 weeks"
                },
                { 
                  num: "02", 
                  title: "Technical Screen", 
                  body: "A brief introductory call to discuss your experience and technical interests.",
                  time: "Within 5 days"
                },
                { 
                  num: "03", 
                  title: "Interview", 
                  body: "Deep-dive technical assessment covering power electronics and design.",
                  time: "Within 1 week"
                },
                { 
                  num: "04", 
                  title: "Decision & Offer", 
                  body: "Transparent feedback and offer presentation within days of the final interview.",
                  time: "Within 1 week"
                }
              ].map((step, i) => (
                <div key={i} className="text-center lg:text-left flex flex-col items-center lg:items-start">
                  <div className="w-12 h-12 bg-[#0A4FCC] text-white rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-md border-4 border-white">
                    {step.num}
                  </div>
                  <h4 className="text-[#0B1120] text-lg font-bold font-heading mb-3">{step.title}</h4>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-4 max-w-[200px]">
                    {step.body}
                  </p>
                  <span className="inline-block bg-[#EEF4FF] text-[#0A4FCC] text-[12px] font-bold px-3 py-1 rounded-full">
                    {step.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-20 bg-[#F7F9FF] border-l-4 border-[#0A4FCC] rounded-lg p-6 flex items-start gap-4">
            <Info className="w-5 h-5 text-[#0A4FCC] shrink-0 mt-0.5" />
            <p className="text-[#374151] text-sm leading-relaxed">
              We believe in merit and technical depth above all. Every application is evaluated by a practicing engineer — not just HR. Come ready to talk about how things work.
            </p>
          </div>
        </div>
      </section>

      {/* S7: OPEN ROLES (Empty State) */}
      <section id="open-roles" className="py-24 bg-[#F7F9FF] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <span className="inline-block text-[#0A4FCC] text-[12px] font-bold uppercase tracking-[0.15em] mb-4">
                Open Roles
              </span>
              <h2 className="text-[#0B1120] text-3xl md:text-4xl font-bold font-heading">Current Openings</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", "Power Electronics", "Firmware", "Research"].map((tab) => (
                <button 
                  key={tab}
                  suppressHydrationWarning
                  className={cn(
                    "px-5 py-2 rounded-full text-[13px] font-semibold transition-all",
                    tab === "All" ? "bg-[#0A4FCC] text-white shadow-md" : "bg-[#E5E7EB] text-[#374151] hover:bg-[#D1D5DB]"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Empty State */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-[#EEF4FF] rounded-full flex items-center justify-center mx-auto mb-8">
              <UserPlus className="w-10 h-10 text-[#0A4FCC]/40" />
            </div>
            <h3 className="text-[#0B1120] text-2xl font-bold font-heading mb-4">No Open Positions Right Now</h3>
            <p className="text-[#6B7280] leading-relaxed mb-10">
              We are a lean, focused engineering team. We hire rarely but deliberately — looking for exceptional engineers who want to work on some of the hardest problems in power electronics.
            </p>
            <button 
              suppressHydrationWarning
              onClick={() => scrollTo("notify")}
              className="bg-[#0A4FCC] hover:bg-[#002B8A] text-white px-8 h-12 rounded-lg font-bold text-sm transition-all shadow-md inline-flex items-center gap-2"
            >
              Notify Me When Roles Open <ArrowRight className="w-4 h-4" />
            </button>
            <p className="mt-6 text-[13px] text-[#6B7280]">
              Or send your CV directly to <a href="mailto:careers@edriftelectric.com" className="text-[#0A4FCC] hover:underline">careers@edriftelectric.com</a>
            </p>
          </div>

          <div className="mt-20 text-center">
            <span className="text-[#6B7280] text-[13px] font-bold uppercase tracking-wider block mb-8">Roles We Typically Hire For</span>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Power Electronics Design Engineer",
                "Magnetics Design Engineer",
                "Embedded Firmware Engineer"
              ].map((role, i) => (
                <div key={i} className="bg-white border-2 border-dashed border-[#C7D9FF] rounded-xl px-6 py-4 flex flex-col items-center">
                  <span className="text-[#374151] font-medium mb-2">{role}</span>
                  <span className="text-[11px] bg-[#F1F5F9] text-[#64748B] px-2 py-0.5 rounded uppercase font-bold tracking-tighter">Future Role</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[13px] text-[#9CA3AF]">
              These are example roles. We will post here when positions open.
            </p>
          </div>
        </div>
      </section>

      {/* S8: NOTIFY ME / STAY IN TOUCH */}
      <section id="notify" className="py-24 bg-gradient-to-br from-[#0A4FCC] to-[#002B8A] relative overflow-hidden">
        {/* Decorative Wave */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none flex items-center">
           <svg width="100%" height="200" viewBox="0 0 1000 200" className="w-full">
              <path d="M0 100 Q 250 50 500 100 T 1000 100" stroke="white" fill="none" strokeWidth="2" />
              <path d="M0 120 Q 250 70 500 120 T 1000 120" stroke="white" fill="none" strokeWidth="2" />
           </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block text-white/70 text-[12px] font-bold uppercase tracking-[0.15em] mb-4">
            Stay Connected
          </span>
          <h2 className="text-white text-3xl md:text-4xl font-bold font-heading mb-6">Don't See a Role That Fits?</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-12">
            We occasionally open highly specialized roles. Drop your details and we will reach out when something opens up.
          </p>

          <form className="max-w-lg mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-left">
            <div className="space-y-4">
              <input 
                suppressHydrationWarning
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-white border border-transparent rounded-lg h-12 px-4 text-sm focus:outline-none focus:border-white transition-all placeholder:text-[#4B5563]" 
              />
              <input 
                suppressHydrationWarning
                type="email" 
                placeholder="Work Email" 
                className="w-full bg-white border border-transparent rounded-lg h-12 px-4 text-sm focus:outline-none focus:border-white transition-all placeholder:text-[#4B5563]" 
              />
              <select 
                suppressHydrationWarning
                className="w-full bg-white border border-transparent rounded-lg h-12 px-4 text-sm focus:outline-none focus:border-white transition-all text-[#4B5563] appearance-none cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>Engineering Domain</option>
                <option value="PE">Power Electronics</option>
                <option value="Magnetics">Magnetics</option>
                <option value="Firmware">Firmware</option>
                <option value="Controls">Controls</option>
                <option value="Other">Other</option>
              </select>
              <button suppressHydrationWarning className="w-full bg-white text-[#0A4FCC] hover:bg-[#E8F0FF] h-14 rounded-lg font-bold text-base transition-all shadow-lg mt-4">
                Notify Me When Roles Open
              </button>
            </div>
            <p className="text-white/60 text-[11px] text-center mt-6">
              We respect your privacy. No spam. Only role alerts relevant to your domain.
            </p>
          </form>

          <div className="mt-12 pt-12 border-t border-white/10">
            <p className="text-white/70 text-sm font-medium mb-3">OR CONTACT US DIRECTLY:</p>
            <a href="mailto:careers@edriftelectric.com" className="text-white text-lg font-semibold hover:underline flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" /> careers@edriftelectric.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
