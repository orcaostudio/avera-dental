"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { testimonial } from "@/data/testimonials";
import { resultCategories } from "@/data/results";
import PageContainer from "@/components/ui/PageContainer";

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const active = resultCategories[activeCategory];

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  return (
    <section id="trust" className="bg-warm-white">
      <PageContainer className="py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
          className="md:col-span-5 flex flex-col justify-between"
        >
          <div>
            <span className="eyebrow text-muted block mb-6">05 — TRUST</span>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-serif text-5xl text-forest">
                {testimonial.rating}
              </span>
              <span className="text-sm text-muted">/ 5</span>
            </div>
            <div aria-hidden="true" className="text-sage text-sm mb-8">
              ★★★★★
            </div>
            <blockquote>
              <p className="display-medium text-forest">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-4 text-sm text-muted">
                — {testimonial.author}
              </footer>
            </blockquote>
          </div>
          <p className="text-xs text-muted mt-10">
            Based on {testimonial.reviewCount} patient reviews
          </p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.7,
            delay: shouldReduceMotion ? 0 : 0.15,
          }}
          className="md:col-span-7"
        >
          <span className="eyebrow text-muted block mb-4">
            RESULTS YOU CAN FEEL
          </span>

          <div
            ref={containerRef}
            className="relative aspect-[4/3] select-none touch-none cursor-ew-resize overflow-hidden"
            onPointerDown={(e) => {
              dragging.current = true;
              updateFromClientX(e.clientX);
            }}
            onPointerMove={(e) => {
              if (dragging.current) updateFromClientX(e.clientX);
            }}
            onPointerUp={() => (dragging.current = false)}
            onPointerLeave={() => (dragging.current = false)}
            role="slider"
            aria-label="Drag to compare before and after"
            aria-orientation="horizontal"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
              if (e.key === "ArrowRight")
                setPosition((p) => Math.min(100, p + 5));
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={shouldReduceMotion ? {} : { opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
                className="absolute inset-0"
              >
                {/* AFTER — full size, static, always visible underneath */}
                <Image
                  src={active.after}
                  alt={`${active.label} — after`}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover pointer-events-none"
                />

                {/* BEFORE — same full size/crop, just clipped by clip-path so it never rescales */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                >
                  <Image
                    src={active.before}
                    alt={`${active.label} — before`}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <div
              className="absolute inset-y-0 w-px bg-ivory pointer-events-none"
              style={{ left: `${position}%` }}
            >
              <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-ivory flex items-center justify-center text-xs">
                ↔
              </span>
            </div>
            <span className="absolute bottom-3 left-3 eyebrow text-ivory bg-near-black/50 px-2 py-1 pointer-events-none">
              BEFORE
            </span>
            <span className="absolute bottom-3 right-3 eyebrow text-ivory bg-near-black/50 px-2 py-1 pointer-events-none">
              AFTER
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Select a result category"
            className="flex flex-wrap gap-x-8 gap-y-2 mt-6 pt-4 border-t border-text/10"
          >
            {resultCategories.map((cat, i) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === i}
                onClick={() => {
                  setActiveCategory(i);
                  setPosition(50);
                }}
                className={`relative eyebrow pb-1 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage ${
                  activeCategory === i
                    ? "text-forest opacity-100"
                    : "text-muted opacity-70 hover:opacity-100"
                }`}
              >
                {cat.label.toUpperCase()}
                {activeCategory === i && (
                  <motion.span
                    layoutId="results-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-px bg-forest"
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.35,
                      ease,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </PageContainer>
    </section>
  );
}
