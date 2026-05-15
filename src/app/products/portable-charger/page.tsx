"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { GlowButton } from "@/components/ui/GlowButton";
import Link from "next/link";
import { ArrowLeft, Battery, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Portable_Specs = [
  { label: "Config. Output Voltage", value: "48V, 60V, 72V, 84V, 96V, 240V, & 400V Nominal" },
  { label: "Common Output Power", value: "3.3kW" },
  { label: "Max Output Current", value: "60A Max" },
  { label: "Efficiency", value: "> 97.5%" },
  { label: "IP Grade", value: "IP67 Rated Housing" },
  { label: "Portability", value: "Lightweight & Compact Enclosure" },
  { label: "Features", value: "Production Certified & Tested" },
];

export default function PortableChargerPage() {
  const portableProducts = products.filter(p => p.category === "Portable EV Charger");
  const [currentIdx, setCurrentIdx] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % portableProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [portableProducts.length]);

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link href="/products" className="inline-flex items-center text-brand-primary hover:underline mb-12 transition-all font-semibold uppercase text-[10px] tracking-widest gap-2">
           <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
           <div style={{ animation: "heroFadeUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms both" }}>
             <Badge variant="purple" className="mb-8 font-semibold">Premium Powerhouse</Badge>
             <h1 className="text-5xl md:text-7xl font-bold font-sans text-text-main mb-8 tracking-tighter leading-tight">
                Portable EV <br />
                <span className="text-brand-primary">Charger Series_</span>
             </h1>
             <p className="text-text-muted text-xl mb-12 leading-relaxed font-medium">
                Experience the pinnacle of portable power. Built using automotive-grade components, 
                our 3.3kW portable charger series offers unparalleled flexibility and industrial ruggedness.
             </p>
             <div className="space-y-4 mb-12">
                {["Suitable for 48V to 400V", "Vibration Resistant", "Smart Heat Sync", "Precision GUI Config"].map((f, i) => (
                  <div key={i} className="flex items-center gap-4 text-text-main font-semibold">
                    <div className="w-2 h-2 rounded-full bg-brand-primary" />
                    {f}
                  </div>
                ))}
             </div>
             <GlowButton variant="purple" size="lg" className="h-16 px-10 rounded-2xl">Download Portfolio</GlowButton>
           </div>

           <div
              className="relative aspect-square rounded-[32px] overflow-hidden group shadow-2xl bg-white border border-border-subtle"
              style={{ animation: "heroFadeUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 100ms both" }}
           >
              <div className="absolute inset-0 bg-slate-50/50" />
              
              {/* Image Slider */}
              <div className="relative w-full h-full flex items-center justify-center p-12">
                <div className="relative w-full h-full">
                  {portableProducts.map((product, idx) => (
                    <div
                      key={product.id}
                      className={cn(
                        "absolute inset-0 transition-all duration-700 ease-in-out flex flex-col items-center justify-center",
                        idx === currentIdx ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                      )}
                    >
                      <div className="relative w-full h-full transform hover:scale-105 transition-transform duration-500">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain mix-blend-multiply"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority={idx === 0}
                        />
                      </div>
                      
                      {/* Product Label */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-border-subtle shadow-sm flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">{product.metadata.sku}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-[10px] font-bold text-slate-900">{product.powerRating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {portableProducts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === currentIdx ? "w-6 bg-brand-primary" : "w-1.5 bg-slate-200"
                    )}
                  />
                ))}
              </div>

              <div className="absolute top-6 right-6 z-20">
                <Badge variant="cyan" className="font-semibold shadow-sm">Premium Grade Components</Badge>
              </div>
           </div>
        </div>

        {/* Technical Data */}
        <div className="mb-32">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-px bg-brand-primary" />
                    <p className="text-[10px] tracking-[0.15em] font-semibold text-brand-primary uppercase">Technical Specs</p>
                 </div>
                 <h2 className="text-4xl font-bold font-heading text-text-main tracking-tight">EBC Portable Series Data</h2>
              </div>
           </div>

           <div className="w-full overflow-hidden rounded-[24px] border border-border-subtle bg-bg-main shadow-sm">
              <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-white border-b border-border-subtle">
                      <th className="px-8 py-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-primary">Parameter</th>
                      <th className="px-8 py-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-primary">Official Rating</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border-subtle">
                   {Portable_Specs.map((row, i) => (
                     <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                       <td className="px-8 py-4.5 text-sm font-semibold text-text-muted group-hover:text-text-main transition-colors">{row.label}</td>
                       <td className="px-8 py-4.5 text-sm font-bold text-text-main tech-value">{row.value}</td>
                     </tr>
                   ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}
