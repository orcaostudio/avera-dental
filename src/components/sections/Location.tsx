"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { location } from "@/data/location";
import PageContainer from "@/components/ui/PageContainer";

export default function Location() {
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="location" className="bg-near-black text-ivory">
      <PageContainer className="py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease }}
          className="md:col-span-4"
        >
          <span className="eyebrow text-ivory/50 block mb-6">07 — VISIT</span>
          <h2 className="display-major mb-10">
            Come in.
            <br />
            We&apos;re here.
          </h2>

          <p className="text-sm">{location.address[0]}</p>
          <p className="text-sm mb-6">{location.address[1]}</p>

          {location.hours.map((h) => (
            <div
              key={h.days}
              className="flex justify-between max-w-[220px] text-sm text-ivory/60 py-1"
            >
              <span>{h.days}</span>
              <span>{h.time}</span>
            </div>
          ))}

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 eyebrow border-b border-ivory pb-1 mt-8 hover:opacity-60 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
          >
            GET DIRECTIONS →
          </a>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease }}
          className="md:col-span-8 relative aspect-[16/9] overflow-hidden"
        >
          <Image
            src={location.exteriorImage}
            alt="AVERA clinic exterior at dusk"
            fill
            sizes="(max-width: 768px) 100vw, 65vw"
            className="object-cover"
          />
          <div className="absolute bottom-4 right-4 w-28 h-20 md:w-40 md:h-28 border border-ivory/30 overflow-hidden">
            <Image
              src={location.mapImage}
              alt="Map showing AVERA clinic location"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </PageContainer>
    </section>
  );
}
