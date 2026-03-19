"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Info */}
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6">Connect With Us</Badge>
          <h2 className="text-4xl md:text-5xl font-black font-space text-text-primary mb-8 leading-tight">
            Ready to <span className="text-gradient">Power Up</span><br />
            Your EV Project?
          </h2>
          <p className="text-text-secondary text-lg mb-12">
             Our team of experts is ready to assist you with technical specifications, custom solutions, or partnership opportunities.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
               <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-teal group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-text-secondary text-sm">Email Us</p>
                  <p className="text-text-primary font-bold">sankar.s@edriftelectric.com</p>
               </div>
            </div>
            <div className="flex items-center gap-6 group">
               <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-green group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-text-secondary text-sm">Call Us</p>
                  <p className="text-text-primary font-bold">+91-9790274709</p>
               </div>
            </div>
            <div className="flex items-center gap-6 group">
               <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-teal group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-text-secondary text-sm">Our Headquarters</p>
                  <p className="text-text-primary font-bold">Coimbatore, Tamil Nadu, India</p>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <GlassCard className="p-10 border-accent-teal/10">
            {submitted ? (
              <div className="text-center py-12">
                 <div className="w-20 h-20 rounded-full bg-accent-green/20 text-accent-green flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10" />
                 </div>
                 <h3 className="text-2xl font-bold text-text-primary mb-2">Message Sent!</h3>
                 <p className="text-text-secondary">We'll get back to you within 24-48 hours.</p>
                 <GlowButton className="mt-8" variant="outline" onClick={() => setSubmitted(false)}>Send Another</GlowButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-primary">Name</label>
                    <input required className="w-full bg-navy-dark/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:border-accent-teal outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-primary">Email</label>
                    <input required type="email" className="w-full bg-navy-dark/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:border-accent-teal outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-primary">Phone (Optional)</label>
                    <input className="w-full bg-navy-dark/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:border-accent-teal outline-none transition-colors" placeholder="+91..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-primary">Subject</label>
                    <select className="w-full bg-navy-dark/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:border-accent-teal outline-none transition-colors appearance-none">
                      <option>General Inquiry</option>
                      <option>Product Quote</option>
                      <option>Technical Support</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-primary">Message</label>
                  <textarea required rows={4} className="w-full bg-navy-dark/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:border-accent-teal outline-none transition-colors resize-none" placeholder="How can we help you?" />
                </div>

                <GlowButton type="submit" className="w-full py-4 text-lg" disabled={isSubmitting}>
                   {isSubmitting ? "Sending..." : "Send Message"}
                </GlowButton>
              </form>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
