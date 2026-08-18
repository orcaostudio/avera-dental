"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { services } from "@/data/services";
import PageContainer from "@/components/ui/PageContainer";

export default function Services() {
  const [hovered, setHovered] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const active = services[hovered];

  return (
    <section id="care" className="bg-ivory">
      <PageContainer className="py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-7">
          <span className="eyebrow text-muted block mb-6">03 — OUR CARE</span>
          <h2 className="display-major text-forest mb-12">
            Different needs.
            <br />
            One standard of care.
          </h2>

          <ul onMouseLeave={() => setHovered(hovered)}>
            {services.map((s, i) => (
              <li
                key={s.number}
                className="border-t border-text/10 last:border-b"
              >
                <a
                  href="#appointment"
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  className={`flex items-center justify-between py-5 group transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage ${
                    hovered === i ? "opacity-100" : "opacity-45"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="eyebrow text-muted">{s.number}</span>
                    <span className="text-lg md:text-xl font-serif text-forest">
                      {s.name}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-muted group-hover:translate-x-1 transition-transform"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop-only hover-reveal image; hidden on mobile where hover doesn't apply */}
        <div className="hidden md:block md:col-span-5 relative aspect-[4/5]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.image}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
              }
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={shouldReduceMotion ? {} : { opacity: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0"
            >
              <Image
                src={active.image}
                alt={active.name}
                fill
                sizes="35vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 bg-forest/90 text-ivory px-6 py-4">
            <p className="text-sm">{active.description}</p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
