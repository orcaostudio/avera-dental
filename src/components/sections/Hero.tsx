"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { hero } from "@/data/hero";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative w-full min-h-screen bg-ivory overflow-hidden">
      {/* Image occupies ~65% width, full height, right-anchored */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[65%]">
        <motion.div
          initial={
            shouldReduceMotion ? false : { clipPath: "inset(0 0 0 100%)" }
          }
          animate={{ clipPath: "inset(0 0 0 0%)" }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.1, ease }}
          className="relative w-full h-full"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1.4, ease }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/hero-treatment-room.png"
              alt="A warm, naturally lit dental treatment room at AVERA clinic"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 65vw"
              className="object-cover"
              style={{ objectPosition: "60% center" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Ivory panel, left ~40%, sits under the overlapping headline */}
      <div className="relative z-10 w-full md:w-[42%] min-h-screen bg-ivory flex flex-col justify-between px-6 md:px-10 lg:px-14 pt-32 pb-10 md:pb-14">
        <div>
          <div className="flex flex-col gap-1 mb-10">
            <span className="eyebrow text-muted">AVERA</span>
            <span className="eyebrow text-muted">DENTAL &amp; ORAL CARE</span>
            <span className="eyebrow text-muted">SOUTH JAKARTA</span>
          </div>

          <h1 className="display-hero text-forest">
            {hero.headline.map((line, i) => (
              <motion.span
                key={line}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.8,
                  delay: shouldReduceMotion ? 0 : 0.3 + i * 0.12,
                  ease,
                }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.7,
              ease,
            }}
            className="mt-8 text-base text-muted max-w-[26ch] leading-relaxed"
          >
            {hero.subtext}
          </motion.p>

          <motion.a
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.9,
            }}
            href="#appointment"
            className="inline-flex items-center gap-2 eyebrow border-b border-forest text-forest pb-1 mt-10 w-fit hover:opacity-60 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
          >
            BOOK A VISIT →
          </motion.a>
        </div>

        <a
          href="#experience"
          className="group inline-flex items-center gap-3 eyebrow text-muted hover:text-forest transition-colors w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
        >
          <span
            aria-hidden="true"
            className="block w-px h-8 bg-current group-hover:translate-y-1 transition-transform"
          />
          SCROLL TO EXPLORE
        </a>
      </div>
    </section>
  );
}
