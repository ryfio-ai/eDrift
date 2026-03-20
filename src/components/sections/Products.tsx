"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlowButton } from "@/components/ui/GlowButton";
import { ChevronRight, Cpu, Battery, Zap, RefreshCw, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const productCategories = [
  {
    id: "chargers",
    name: "EV Chargers",
    items: [
      { name: "On-Board Charger", href: "/products/onboard-charger", desc: "Automotive grade SiC charging." },
      { name: "Portable Charger", href: "/products/portable-charger", desc: "Premium plug-and-play charging." }
    ],
    tagline: "High-efficiency charging from 2.2kW to 6.6kW.",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&h=600&auto=format&fit=crop"
  },
  {
    id: "dcdc",
    name: "DC-DC Converters",
    status: "Upcoming",
    tagline: "High density isolated conversion for industrial fleets.",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop"
  },
  {
    id: "integrated",
    name: "Integrated Chargers",
    status: "Upcoming",
    tagline: "All-in-one charging and power conversion units.",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?q=80&w=800&h=600&auto=format&fit=crop"
  },
  {
    id: "bidirectional",
    name: "Bidirectional DC Chargers",
    status: "Upcoming",
    tagline: "V2G (Vehicle-to-Grid) and V2L ready DC technology.",
    icon: RefreshCw,
    image: "https://images.unsplash.com/photo-1620218173997-442402f114a2?q=80&w=800&h=600&auto=format&fit=crop"
  }
];

export const Products = () => {
  return (
    <section id="products" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <Badge variant="purple" className="mb-6">Global Lineup</Badge>
            <h2 className="text-4xl md:text-6xl font-black font-space tracking-tighter text-slate-900">
              Technical <br />
              <span className="text-gradient">Product Roadmap</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm mb-2 font-medium">
            From current production-ready chargers to our upcoming energy solutions, we cover the full power cycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col"
            >
              <div className="flex flex-col h-full bg-slate-50 border border-slate-100 rounded-[32px] overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[1/1] relative overflow-hidden bg-slate-200">
                  <Image 
                    src={cat.image} 
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute top-6 left-6">
                     {cat.status ? (
                       <Badge variant="purple" className="bg-white/90 backdrop-blur shadow-sm">Upcoming</Badge>
                     ) : (
                       <Badge variant="cyan" className="bg-white/90 backdrop-blur shadow-sm">Production</Badge>
                     )}
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-royal-blue mb-4 shadow-sm">
                     <cat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black font-space mb-2 text-slate-900">{cat.name}</h3>
                  <p className="text-slate-500 text-sm mb-6 font-medium leading-relaxed">{cat.tagline}</p>
                  
                  <div className="mt-auto space-y-3">
                    {cat.items ? (
                      cat.items.map((item, i) => (
                        <Link key={i} href={item.href} className="block group/link">
                           <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-royal-blue hover:shadow-md transition-all flex items-center justify-between">
                              <div>
                                 <span className="block text-xs font-black text-slate-900 mb-1">{item.name}</span>
                                 <span className="block text-[10px] text-slate-400 font-bold">{item.desc}</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-royal-blue group-hover/link:translate-x-1 transition-transform" />
                           </div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-4 rounded-2xl bg-slate-100/50 border border-dashed border-slate-200 text-center">
                         <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">Launching Soon</span>
                      </div>
                    )}
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
