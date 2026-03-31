"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Linkedin, Mail, Sparkles } from "lucide-react";
import Image from "next/image";

const founder = {
  name: "Sankar S",
  role: "Founder & CEO",
  image: "/images/team/sankar.jpg",
  bio: "Visionary leader driving the next wave of power electronics innovation in India.",
  linkedin: "https://www.linkedin.com/in/sankar-edriftelectric"
};

export const Team = () => {
  return (
    <section id="team" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-20"
        >
          <Badge variant="purple" className="mb-6">Our Leadership</Badge>
          <h2 className="text-4xl md:text-6xl font-black font-space text-slate-900 tracking-tighter mb-8">
            Meet the <span className="text-gradient">Innovators_</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            Led by deep engineering expertise and a passion for sustainable technology.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative max-w-[440px] w-full"
          >
            {/* Soft Premium Glow */}
            <div className="absolute -inset-10 bg-royal-blue/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative bg-white border border-slate-100 rounded-[48px] p-12 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 group-hover:shadow-[0_48px_100px_-20px_rgba(0,0,0,0.12)] group-hover:-translate-y-2">
              {/* Circular Avatar with Sparkle - matching user reference */}
              <div className="relative w-56 h-56 mx-auto mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/20 to-vibrant-purple/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-br from-slate-50 to-white shadow-inner">
                  <div className="relative w-full h-full rounded-full border-4 border-white overflow-hidden shadow-xl">
                    <Image 
                      src={founder.image} 
                      alt={founder.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>
                </div>
                
              </div>
 
              <h3 className="text-4xl font-black font-space text-slate-900 mb-2 tracking-tight">{founder.name}</h3>
              <p className="text-royal-blue font-black uppercase tracking-[0.25em] text-[11px] mb-8">{founder.role}</p>
              
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10 italic px-4">
                &quot;{founder.bio}&quot;
              </p>
 
              <div className="flex justify-center gap-6">
                 {[
                   { icon: Linkedin, href: founder.linkedin, label: "LinkedIn" },
                   { icon: Mail, href: "mailto:sankar.s@edriftelectric.com", label: "Email" }
                 ].map((social, i) => (
                   <a 
                     key={i} 
                     href={social.href} 
                     target="_blank"
                     className="w-16 h-16 rounded-[24px] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-royal-blue hover:bg-white hover:border-royal-blue/20 hover:shadow-lg transition-all duration-500"
                   >
                     <social.icon className="w-6 h-6" />
                   </a>
                 ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
