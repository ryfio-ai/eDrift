"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Product } from "@/data/products";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export const QuoteModal = ({ isOpen, onClose, product }: QuoteModalProps) => {
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitStatus("idle");
      setFormData({ email: "", mobile: "", description: "" });
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          product: {
            name: product.name,
            sku: product.metadata.sku,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quote request");
      }

      setSubmitStatus("success");
      // Auto close after 3 seconds on success
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Header */}
            <div className="bg-bg-main border-b border-border-subtle p-6 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-text-main mb-1">Request a Quote</h2>
                <p className="text-sm text-text-muted">
                  For <span className="font-semibold text-brand-primary">{product.name}</span> ({product.metadata.sku})
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 -mt-2 text-text-muted hover:text-text-main hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            {submitStatus === "success" ? (
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-text-main mb-2">Request Sent!</h3>
                <p className="text-text-muted">
                  Thank you for your interest. Our engineering team will contact you shortly regarding the {product.name}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                {submitStatus === "error" && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm border border-red-100">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>There was an error sending your request. Please try again or contact us directly.</p>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-text-main mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-border-strong rounded-md text-text-main placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
                    placeholder="engineering@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-semibold text-text-main mb-1.5">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-border-strong rounded-md text-text-main placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-text-main mb-1.5">
                    Description & Custom Requirements
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-border-strong rounded-md text-text-main placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all resize-none"
                    placeholder="Please specify quantity, specific voltage/current needs, or project context..."
                  />
                </div>

                <div className="pt-4 mt-2 border-t border-border-subtle flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-sm font-bold text-text-muted hover:text-text-main transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary px-6 py-2.5 flex items-center justify-center gap-2 min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
