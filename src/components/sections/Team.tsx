"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Linkedin, ArrowRight } from "lucide-react";

const team = [
  {
    name: "Sankar S",
    role: "Founder & CEO",
    specialty: "EV Power Electronics Engineer",
    initials: "SS",
    color: "from-royal-blue to-vibrant-purple"
  },
  {
    name: "R&D Lead",
    role: "Digital Control",
    specialty: "DSP & Smart Control Systems",
    initials: "JL",
    color: "from-royal-blue to-vivid-cyan"
  },
  {
    name: "Power Systems",
    role: "Mechanical Lead",
    specialty: "Thermal & Packaging Specialist",
    initials: "AK",
    color: "from-vibrant-purple to-royal-blue"
  }
];

export const Team = () => {
  return (
    <section id="team" className="py-32 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <Badge variant="cyan" className="mb-4">Our Visionaries</Badge>
            <h2 className="text-4xl md:text-6xl font-black font-space text-slate-900 tracking-tighter">
              Meet the <br />
              <span className="text-gradient">Innovators</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm mb-2 font-medium leading-relaxed">
            A specialized group of engineers building the next decade of power conversion technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="p-1 text-center h-full group bg-white border border-slate-100 transition-all duration-500 hover:shadow-2xl rounded-[32px] overflow-hidden">
                <div className="p-10 flex flex-col items-center">
                   <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${member.color} p-1 mb-8 shadow-xl shadow-royal-blue/10`}>
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl font-black text-slate-800">
                         {member.initials}
                      </div>
                   </div>
                   
                   <h3 className="text-2xl font-black font-space text-slate-900 mb-2">{member.name}</h3>
                   <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 mb-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-royal-blue">{member.role}</p>
                   </div>
                   <p className="text-sm text-slate-500 leading-relaxed mb-10 font-medium">{member.specialty}</p>

                   <a href="#" className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase hover:text-royal-blue transition-colors group/btn">
                      LinkedIn <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                   </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
