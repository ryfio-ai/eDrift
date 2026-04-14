"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ShieldCheck, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeIn, tabPanel, motionTokens } from "@/lib/motion";

export const ContactSection = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-white overflow-hidden relative border-t border-border-subtle reveal-fade">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Left Side: Contact Information */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-4 mb-8">
               <div className="w-12 h-[1px] bg-brand-primary" />
               <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary">Technical Engagement</div>
            </motion.div>
            <motion.h2 variants={fadeIn} className="mb-8 text-text-main">
               Talk to our <br />
               <span className="text-brand-primary">Technical Team</span>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-text-muted font-medium leading-relaxed mb-12 max-w-lg">
               Connect with eDrift for feasibility reviews, system-level discussions, custom specifications, and RFQ planning for production programs.
            </motion.p>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
               {[
                 { icon: Mail, label: "Technical Support", val: "eng@edriftelectric.com" },
                 { icon: Phone, label: "Business Development", val: "+91 97902 74709" },
                 { icon: MapPin, label: "Engineering Base", val: "Hosur, Tamil Nadu / IIT Palakkad Ecosystem" }
               ].map((item, i) => (
                 <motion.div 
                    key={i} 
                    variants={fadeIn}
                    className={cn(
                      "p-8 bg-bg-main rounded-lg border border-border-subtle transition-all duration-300 hover:border-brand-primary/20 hover:shadow-sm",
                      i === 2 ? "sm:col-span-2" : ""
                    )}
                 >
                    <item.icon className="w-5 h-5 text-brand-primary mb-6" />
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-text-faint font-bold mb-2">{item.label}</p>
                        <p className="text-sm font-bold text-text-main tech-value">{item.val}</p>
                    </div>
                 </motion.div>
               ))}
            </motion.div>

            <motion.p variants={fadeIn} className="text-[10px] text-text-faint font-bold uppercase tracking-widest flex items-center gap-3 mt-auto">
              <Clock className="w-4 h-4 text-brand-primary" />
              Initial response within 1 business day for qualified inquiries
            </motion.p>
          </motion.div>

          {/* Right Side: Progressive RFQ Form */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 lg:p-12 rounded-lg border border-border-subtle shadow-sm"
            >
              <div className="mb-10 text-center">
                 <h3 className="text-xl font-bold text-text-main mb-3">Initiate Technical RFQ</h3>
                 <p className="text-[10px] font-bold text-text-faint uppercase tracking-widest">
                    {step === 1 ? "Step 1: Application" : "Step 2: Project Details"}
                 </p>
                 <div className="flex gap-1.5 mt-5 justify-center">
                    <div className={cn("h-1 rounded-full transition-all duration-500", step === 1 ? "w-8 bg-brand-primary" : "w-4 bg-bg-main")} />
                    <div className={cn("h-1 rounded-full transition-all duration-500", step === 2 ? "w-8 bg-brand-primary" : "w-4 bg-bg-main")} />
                 </div>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <div className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-brand-primary/10">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-text-main mb-3">Transmission Successful</h3>
                  <p className="text-text-muted text-sm font-medium mb-8">Our engineering lead will contact you within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setStep(1); }} className="btn-outline w-full text-xs">Initiate New Inquiry</button>
                </motion.div>
              ) : (
                <div className="relative min-h-[400px]">
                   <AnimatePresence mode="wait" custom={step}>
                      {step === 1 ? (
                        <motion.div 
                          key="step-1"
                          custom={step}
                          variants={tabPanel}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <label className="text-[11px] font-semibold tracking-wider text-text-main">Organization Name</label>
                            <input required className="w-full bg-bg-main border border-border-subtle h-11 rounded-input px-4 outline-none focus:border-brand-primary transition-all text-sm font-medium text-text-main" placeholder="OEM / Industrial Partner" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-semibold tracking-wider text-text-main">Work Email</label>
                            <input required type="email" className="w-full bg-bg-main border border-border-subtle h-11 rounded-input px-4 outline-none focus:border-brand-primary transition-all text-sm font-medium text-text-main" placeholder="engineering@company.com" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-semibold tracking-wider text-text-main">Product Category</label>
                            <div className="relative">
                              <select className="w-full bg-bg-main border border-border-subtle h-11 rounded-input px-4 outline-none focus:border-brand-primary transition-all text-sm font-medium text-text-main appearance-none cursor-pointer">
                                <option>3.3kW On-Board Charger</option>
                                <option>Portable EV Fleet Charger</option>
                                <option>Bi-Directional PSU (V2L)</option>
                                <option>Integrated 2-in-1 OBC + DC-DC</option>
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint pointer-events-none" />
                            </div>
                          </div>
                          <div className="space-y-2 pb-4">
                            <label className="text-[11px] font-semibold tracking-wider text-text-main">Projected Annual Volume</label>
                            <input required className="w-full bg-bg-main border border-border-subtle h-11 rounded-input px-4 outline-none focus:border-brand-primary transition-all text-sm font-medium text-text-main tech-value" placeholder="e.g. 5,000 units / year" />
                          </div>
                          <button type="button" onClick={nextStep} className="btn-primary w-full group">
                            Next: Project Details
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="step-2"
                          custom={step}
                          variants={tabPanel}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[11px] font-semibold tracking-wider text-text-main">Full Name</label>
                              <input required className="w-full bg-bg-main border border-border-subtle h-11 rounded-input px-4 outline-none focus:border-brand-primary transition-all text-sm font-medium text-text-main" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[11px] font-semibold tracking-wider text-text-main">Job Title</label>
                              <input required className="w-full bg-bg-main border border-border-subtle h-11 rounded-input px-4 outline-none focus:border-brand-primary transition-all text-sm font-medium text-text-main" placeholder="Engineering Lead" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-text-main">Requirement Brief</label>
                            <textarea required rows={4} className="w-full bg-bg-main border border-border-subtle rounded-input px-4 py-3 outline-none focus:border-brand-primary transition-all text-sm font-medium text-text-main resize-none" placeholder="Share power architecture requirements, voltage ranges, and deployment scope..." />
                          </div>
                          <div className="flex gap-4 pt-4">
                            <button type="button" onClick={prevStep} className="btn-outline flex-1 text-xs">Back</button>
                            <button type="submit" onClick={handleSubmit} className="btn-primary flex-[2] group" disabled={isSubmitting}>
                              {isSubmitting ? "Routing..." : "Submit RFQ"}
                              <ArrowRight className={`ml-2 w-4 h-4 ${isSubmitting ? '' : 'group-hover:translate-x-1 transition-transform'}`} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
              )}
              
              <div className="mt-8 pt-6 border-t border-border-subtle flex items-center justify-center gap-6">
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-text-faint">NDA Protected</span>
                 </div>
                 <div className="w-px h-3 bg-border-subtle" />
                 <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-text-faint">Secure Routing</span>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
