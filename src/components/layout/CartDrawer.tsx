"use client";

import React, { useEffect, useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isCartOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150]"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[160] flex flex-col border-l border-border-subtle"
        style={{
          transform: mounted ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-subtle bg-bg-main">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-brand-primary" />
            <h2 className="text-xl font-bold font-heading text-text-main tracking-tight">
              RFQ Cart
            </h2>
            <span className="bg-brand-primary/10 text-brand-primary text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-text-muted hover:text-text-main hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
              <ShoppingBag className="w-16 h-16 text-text-faint mb-4" />
              <p className="text-text-main font-semibold mb-2">Your cart is empty</p>
              <p className="text-sm text-text-muted max-w-[250px]">
                Add products to request a technical quote or engineering consultation.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 text-brand-primary font-semibold text-sm hover:underline"
              >
                Browse Products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-4 border border-border-subtle rounded-lg bg-bg-main relative group"
              >
                <div className="relative w-20 h-20 bg-white rounded border border-border-subtle overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-text-faint tracking-widest uppercase mb-1">
                      {item.product.metadata.sku}
                    </p>
                    <h3 className="text-sm font-bold text-text-main leading-tight line-clamp-2">
                      {item.product.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border-strong rounded bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-black/5 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-text-main">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-black/5 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-text-faint hover:text-red-500 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border-subtle bg-bg-main mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-text-muted font-medium">Items included</span>
              <span className="font-bold text-text-main">{totalItems} Products</span>
            </div>
            <Link
              href="/contact"
              onClick={() => setIsCartOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-4 bg-brand-primary text-white rounded font-bold uppercase tracking-wider text-xs hover:bg-brand-primary/90 transition-colors"
            >
              Request Technical Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-center text-[10px] text-text-faint mt-3 uppercase tracking-widest">
              No payment required
            </p>
          </div>
        )}
      </div>
    </>
  );
};
