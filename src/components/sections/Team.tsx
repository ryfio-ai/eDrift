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
    bio: "Pioneering high-efficiency power electronics with 15+ years of industrial experience. Led the design of eDrift's flagship 3.3kW OBC series and secured CE certification for the entire product lineup.",
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
          <div className="flex items-center justify-center gap-4 mb-6">
             <div className="w-8 h-px bg-slate-200" />
             <div className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-primary">Our Leadership</div>
             <div className="w-8 h-px bg-slate-200" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
            Engineering the <span className="text-brand-primary">Future_</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-semibold text-lg leading-relaxed">
            Led by a core team of specialists from India's premier engineering institutions, 
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
              <div className="relative bg-white border border-slate-100 rounded-[40px] p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-2xl hover:border-brand-primary/10 hover:-translate-y-2">
                <div className="relative w-40 h-40 mx-auto mb-10">
                  <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-colors" />
                  <div className="relative w-full h-full rounded-full border-4 border-white overflow-hidden shadow-lg">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 gray-placeholder"
                    />
                  </div>
                </div>

                <div className="text-center">
                   <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{member.name}</h3>
                   <p className="text-brand-primary font-black uppercase tracking-[0.2em] text-[10px] mb-8">{member.role}</p>
                   
                   <p className="text-slate-500 text-sm font-semibold leading-relaxed mb-10 italic">
                     &quot;{member.bio}&quot;
                   </p>

                   <div className="flex justify-center gap-4">
                      <a href={member.linkedin} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-all shadow-sm">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@edriftelectric.in`} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-all shadow-sm">
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
