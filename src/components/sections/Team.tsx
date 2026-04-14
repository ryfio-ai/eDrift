"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const team = [
  {
    name: "Sankar S",
    role: "Engineering Lead & Founder",
    image: "/images/team/sankar.jpg",
    bio: "Pioneering high-efficiency power electronics with 15+ years of industrial experience. Led the design of eDrift's flagship Elite series 3.3kW OBC and secured CE certification for the entire product lineup.",
    linkedin: "https://www.linkedin.com/in/sankar-edriftelectric",
    email: "sankar.s@edriftelectric.com"
  },
  {
    name: "Engineering Support",
    role: "Technical Consultation",
    image: "/images/team/support.jpg",
    bio: "Our dedicated technical team provides comprehensive support and integration consultation for global automotive OEMs, ensuring seamless deployment of eDrift power chains.",
    linkedin: "#",
    email: "info@edriftelectric.com"
  }
];

export const Team = () => {
  return (
    <section id="team" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
             <div className="w-8 h-px bg-border-subtle" />
             <div className="text-[10px] tracking-[0.15em] font-semibold text-brand-primary uppercase">Leadership Team</div>
             <div className="w-8 h-px bg-border-subtle" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-text-main tracking-tight mb-8">
            Engineering the <span className="text-brand-primary">Future_</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            Led by a core team of specialists from India&apos;s premier engineering institutions, 
            dedicated to pushing the boundaries of power conversion density.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white border border-border-subtle rounded-[32px] p-10 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-brand-primary/20 hover:-translate-y-2">
                <div className="relative w-40 h-40 mx-auto mb-10">
                  <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-colors" />
                  <div className="relative w-full h-full rounded-full border-4 border-white overflow-hidden shadow-inner bg-bg-main">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 gray-placeholder"
                    />
                  </div>
                </div>

                <div className="text-center">
                   <h3 className="text-2xl font-bold text-text-main mb-2 tracking-tight">{member.name}</h3>
                   <p className="text-brand-primary font-semibold tracking-wider text-[11px] uppercase mb-8">{member.role}</p>
                   
                   <p className="text-text-muted text-sm font-medium leading-relaxed mb-10 italic px-4">
                     &quot;{member.bio}&quot;
                   </p>

                   <div className="flex justify-center gap-4">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-bg-main border border-border-subtle flex items-center justify-center text-text-faint hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-sm">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={`mailto:${member.email}`} className="w-12 h-12 rounded-xl bg-bg-main border border-border-subtle flex items-center justify-center text-text-faint hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-sm">
                        <Mail className="w-5 h-5" />
                      </a>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
