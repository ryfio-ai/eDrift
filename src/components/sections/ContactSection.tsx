"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlowButton } from "@/components/ui/GlowButton";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-32 px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left: Info */}
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <Badge variant="purple" className="mb-6">Connect With Us</Badge>
          <h2 className="text-4xl md:text-6xl font-black font-space text-slate-900 mb-10 leading-tight tracking-tighter">
            Ready to <span className="text-gradient">Power Up</span><br />
            Your Project?
          </h2>
          <p className="text-slate-600 text-lg mb-12 font-medium">
             Our team of experts is ready to assist you with technical specifications, custom solutions, or partnership opportunities.
          </p>

          <div className="space-y-10">
            {[
              { icon: Mail, label: "Email Us", val: "info@edriftelectric.com", color: "text-royal-blue" },
              { icon: Phone, label: "Call Us", val: "+91 97902 74709", color: "text-emerald-600" },
              { icon: MapPin, label: "Visit Us", val: "Hosur, Tamil Nadu, India", color: "text-vibrant-purple" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 group">
                 <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform shadow-sm">
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                 </div>
                 <div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-slate-900 font-black font-space text-lg leading-tight">{item.val}</p>
                 </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="p-12 border border-slate-100 bg-white rounded-[48px] shadow-2xl">
            {submitted ? (
              <div className="text-center py-20">
                 <div className="w-24 h-24 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <Send className="w-10 h-10" />
                 </div>
                 <h3 className="text-3xl font-black font-space text-slate-900 mb-4">Message Sent!</h3>
                 <p className="text-slate-500 font-medium mb-10">We&apos;ll get back to you within 24-48 hours.</p>
                 <GlowButton variant="outline" onClick={() => setSubmitted(false)} className="rounded-2xl">Send Another</GlowButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-royal-blue font-space">Full Name</label>
                    <input required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 focus:border-royal-blue outline-none transition-all font-medium" placeholder="Your Name" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-royal-blue font-space">Email Address</label>
                    <input required type="email" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 focus:border-royal-blue outline-none transition-all font-medium" placeholder="email@address.com" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-royal-blue font-space">Interest Area</label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 focus:border-royal-blue outline-none transition-all font-medium appearance-none">
                    <option>EV Charging Solutions</option>
                    <option>Industrial Automation</option>
                    <option>Technical Partnership</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-royal-blue font-space">Your VISION</label>
                  <textarea required rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 focus:border-royal-blue outline-none transition-all font-medium resize-none" placeholder="How can we help you innovate?" />
                </div>

                <GlowButton type="submit" variant="primary" className="w-full h-16 text-lg rounded-2xl shadow-xl shadow-royal-blue/30" disabled={isSubmitting}>
                   {isSubmitting ? "Transmitting..." : "Send Secure Message"}
                   <ArrowRight className="w-5 h-5 ml-2" />
                </GlowButton>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
