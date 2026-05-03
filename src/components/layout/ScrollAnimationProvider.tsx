"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollAnimationProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const observeElements = () => {
      const animatableElements = document.querySelectorAll(
        "[data-animate]:not(.animate-in), [data-animate-stagger]:not(.animate-in)"
      );
      animatableElements.forEach((el) => observer.observe(el));
    };

    // Initial observation
    observeElements();

    // Use MutationObserver to watch for dynamically added content (like filtered products)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
