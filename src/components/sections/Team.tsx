"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Linkedin } from "lucide-react";

const team = [
  {
    name: "Sankar S",
    role: "Founder & CEO",
    specialty: "EV Power Electronics Engineer",
    linkedin: "https://www.linkedin.com/in/sankar-edriftelectric",
    initials: "SS"
  },
  {
    name: "R&D Lead",
    role: "Senior Engineer",
    specialty: "Digital Control Systems",
    linkedin: "#",
    initials: "RD"
  },
  {
    name: "Power Systems",
    role: "Design Engineer",
    specialty: "High Density Converters",
    linkedin: "#",
    initials: "PS"
  }
];

export const Team = () => {
  return (
    <section id="team" className="py-24 px-6 bg-navy-mid/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4">Our Leaders</Badge>
          <h2 className="text-4xl md:text-5xl font-black font-space text-text-primary mb-4">
             Meet the <span className="text-gradient">Innovators</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
             A world-class team of engineers dedicated to revolutionizing the EV charging landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="text-center p-10 h-full flex flex-col items-center">
                 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center text-3xl font-black text-navy-dark mb-6 group-hover:scale-110 transition-transform">
                   {member.initials}
                 </div>
                 
                 <h3 className="text-xl font-bold text-text-primary mb-1">{member.name}</h3>
                 <p className="text-accent-teal text-sm font-mono uppercase tracking-wider mb-4">{member.role}</p>
                 <p className="text-text-secondary text-sm mb-8 flex-grow">{member.specialty}</p>

                 <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-accent-teal hover:bg-white/10 transition-all"
                 >
                    <Linkedin className="w-5 h-5" />
                 </a>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
