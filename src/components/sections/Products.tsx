"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { GlowButton } from "@/components/ui/GlowButton";
import Link from "next/link";
import { ArrowRight, Zap, Battery, Shield, Cpu } from "lucide-react";

const products = [
  {
    title: "Onboard EV Charger",
    description: "Compact, automotive-grade charger with SiC technology for ultimate efficiency.",
    icon: <Zap className="w-6 h-6" />,
    status: "available",
    href: "/products/onboard-charger",
    features: ["2.2kW – 6.6kW", "IP67 Rated", "CAN Comms"]
  },
  {
    title: "Portable EV Charger",
    description: "Lightweight and robust charging solution for flexible electric mobility.",
    icon: <Battery className="w-6 h-6" />,
    status: "available",
    href: "/products/portable-charger",
    features: ["Compact Design", "Wide Temp Range", "Plug & Play"]
  },
  {
    title: "DC-DC Converter",
    description: "High-performance isolated power conversion for auxiliary systems.",
    icon: <Cpu className="w-6 h-6" />,
    status: "coming-soon",
    features: ["1kW – 1.5kW", "Wide Input Range", "14V Output"]
  },
  {
    title: "Integrated Charger",
    description: "All-in-one charging and power conversion system for modern EVs.",
    icon: <Shield className="w-6 h-6" />,
    status: "coming-soon",
    features: ["Space Saving", "Weight Optimized", "V2L Support"]
  }
];

export const Products = () => {
  return (
    <section id="products" className="py-24 px-6 relative bg-navy-mid/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4">Solution Suite</Badge>
          <h2 className="text-4xl md:text-5xl font-black font-space text-text-primary">
            Our <span className="text-accent-teal">Products</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Engineered for high-performance and extreme reliability in any environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col p-8 group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent-teal/10 flex items-center justify-center text-accent-teal group-hover:bg-accent-teal group-hover:text-navy-dark transition-all duration-300">
                    {product.icon}
                  </div>
                  <Badge variant={product.status === 'available' ? 'available' : 'coming-soon'}>
                    {product.status === 'available' ? 'Available' : 'Coming Soon'}
                  </Badge>
                </div>

                <h3 className="text-2xl font-black font-space text-text-primary mb-3">
                  {product.title}
                </h3>
                <p className="text-text-secondary mb-8 flex-grow">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                   {product.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-sm text-text-primary">
                         <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                         {feature}
                      </div>
                   ))}
                </div>

                {product.status === 'available' ? (
                  <Link href={product.href!}>
                    <GlowButton className="w-full" variant="outline">
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </GlowButton>
                  </Link>
                ) : (
                  <GlowButton className="w-full opacity-50 cursor-not-allowed" variant="outline" disabled>
                    Learn More
                  </GlowButton>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
