"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

function StarBackground() {
  const ref = React.useRef<any>(null);
  const [sphere] = React.useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00C6FF"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-navy-dark pt-20">
      {/* Background 3D Particles */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <StarBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* Decorative Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-start/20 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-space tracking-tighter mb-6 leading-tight">
            Powering the Future of <br />
            <span className="text-gradient">Electric Mobility</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
            Advanced OBC & Portable EV Chargers — SiC Technology <span className="text-accent-teal mx-2">|</span> 
            97%+ Efficiency <span className="text-accent-teal mx-2">|</span> IP67 Rated
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <GlowButton className="min-w-[200px] text-lg py-4">
               Explore Products
            </GlowButton>
            <GlowButton variant="outline" className="min-w-[200px] text-lg py-4">
               Get in Touch
            </GlowButton>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-border-subtle bg-navy-mid/30 backdrop-blur-sm rounded-2xl px-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-space font-black text-text-primary">
                <AnimatedCounter from={0} to={97} suffix="%" />
              </span>
              <span className="text-xs uppercase tracking-widest text-accent-teal font-bold mt-2">Efficiency</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-space font-black text-text-primary">
                <AnimatedCounter from={0} to={6.6} /> 
                <span className="text-xl ml-1">kW</span>
              </span>
              <span className="text-xs uppercase tracking-widest text-accent-teal font-bold mt-2">Max Power</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-space font-black text-text-primary uppercase">
                 IP67
              </span>
              <span className="text-xs uppercase tracking-widest text-accent-teal font-bold mt-2">Protection</span>
            </div>
            <div className="flex flex-col items-center border-0">
              <span className="text-3xl md:text-4xl font-space font-black text-text-primary">
                -40<span className="text-xl">°C</span>
              </span>
              <span className="text-xs uppercase tracking-widest text-accent-teal font-bold mt-2">Op Range</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Image Placeholder (CAD Render) */}
      <motion.div 
        className="relative z-10 mt-12 w-full max-w-4xl px-6"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="aspect-[16/9] relative rounded-2xl overflow-hidden glass border-white/5 shadow-2xl group">
           <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent z-10" />
           {/* Replace with actual charger image when available */}
           <div className="w-full h-full bg-gradient-to-br from-navy-mid to-navy-dark flex items-center justify-center p-12">
              <div className="w-2/3 h-2/3 border-4 border-dashed border-white/10 rounded-3xl flex items-center justify-center text-white/20 font-space font-black text-4xl italic uppercase">
                 Charger 3D Visual
              </div>
           </div>
        </div>
      </motion.div>
    </section>
  );
};
