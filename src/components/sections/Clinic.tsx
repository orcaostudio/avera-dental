"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { clinicImages } from "@/data/clinic";
import PageContainer from "@/components/ui/PageContainer";

export default function Clinic() {
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const reveal = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, scale: 1.04 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.7,
      delay: shouldReduceMotion ? 0 : delay,
      ease,
    },
  });

  return (
    <section id="clinic" className="bg-stone">
      <PageContainer className="py-20 md:py-28">
        <span className="eyebrow text-muted block mb-4">06 — THE CLINIC</span>
        <h2 className="display-major text-forest mb-14 max-w-lg">
          A quieter
          <br />
          kind of clinical.
        </h2>

        {/* Broken grid: dominant large image + two stacked small + narrow vertical + detail crop */}
        <div className="grid grid-cols-6 md:grid-cols-12 gap-3 md:gap-4">
          <motion.div
            {...reveal(0)}
            className="col-span-6 md:col-span-7 relative aspect-[4/3] md:aspect-[16/11] overflow-hidden"
          >
            <Image
              src={clinicImages[0].src}
              alt={clinicImages[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
            />
          </motion.div>

          <div className="col-span-6 md:col-span-3 grid grid-rows-2 gap-3 md:gap-4">
            <motion.div
              {...reveal(0.1)}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src={clinicImages[1].src}
                alt={clinicImages[1].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              {...reveal(0.15)}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src={clinicImages[2].src}
                alt={clinicImages[2].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            {...reveal(0.2)}
            className="col-span-3 md:col-span-2 relative aspect-[3/5] overflow-hidden md:-mt-8"
          >
            <Image
              src={clinicImages[3].src}
              alt={clinicImages[3].alt}
              fill
              sizes="(max-width: 768px) 50vw, 16vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            {...reveal(0.25)}
            className="col-span-3 md:col-span-4 relative aspect-[3/2] overflow-hidden"
          >
            <Image
              src={clinicImages[4].src}
              alt={clinicImages[4].alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-fill"
            />
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
