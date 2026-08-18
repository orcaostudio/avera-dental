"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { experience } from "@/data/experience";
import PageContainer from "@/components/ui/PageContainer";

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const reveal = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.7,
      delay: shouldReduceMotion ? 0 : delay,
      ease,
    },
  });

  return (
    <section id="experience" className="bg-warm-white">
      <PageContainer className="py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
        <motion.div {...reveal()} className="md:col-span-4">
          <span className="eyebrow text-muted block mb-6">
            {experience.number} — {experience.label}
          </span>
          <h2 className="display-major text-forest">{experience.heading}</h2>
          <p className="mt-6 text-sm text-muted max-w-xs leading-relaxed">
            {experience.body}
          </p>
        </motion.div>

        {/* Asymmetric collage: large horizontal + tall narrow + small detail */}
        <div className="md:col-span-8 grid grid-cols-6 grid-rows-[auto_auto] gap-3 md:gap-4">
          <motion.div
            {...reveal(0.1)}
            className="col-span-6 md:col-span-4 row-span-1 relative aspect-[16/10]"
          >
            <Image
              src={experience.images[0].src}
              alt={experience.images[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
              style={{ objectPosition: "center 35%" }}
            />
          </motion.div>

          <motion.div
            {...reveal(0.2)}
            className="col-span-3 md:col-span-2 row-span-2 relative aspect-[3/5] md:aspect-auto"
          >
            <Image
              src={experience.images[1].src}
              alt={experience.images[1].alt}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            {...reveal(0.3)}
            className="col-span-3 md:col-span-4 relative aspect-[16/9]"
          >
            <Image
              src={experience.images[2].src}
              alt={experience.images[2].alt}
              fill
              sizes="(max-width: 768px) 33vw, 16vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
