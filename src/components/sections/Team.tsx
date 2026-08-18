"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { team } from "@/data/team";
import PageContainer from "@/components/ui/PageContainer";

export default function Team() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const doctor = team[active];
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="people" className="bg-forest text-ivory">
      <PageContainer className="py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-5">
          <span className="eyebrow text-ivory/50 block mb-6">
            04 — THE PEOPLE
          </span>
          <h2 className="display-major mb-14">
            Good care
            <br />
            begins with
            <br />
            good people.
          </h2>

          <div
            role="tablist"
            aria-label="Select a dentist"
            className="flex flex-col gap-1"
          >
            {team.map((member, i) => (
              <button
                key={member.number}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`text-left py-3 border-t border-ivory/15 last:border-b flex items-baseline gap-4 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage ${
                  active === i ? "opacity-100" : "opacity-50 hover:opacity-80"
                }`}
              >
                <span className="eyebrow">{member.number}</span>
                <span className="font-serif text-xl">
                  {member.name.replace("Dr. ", "")}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-end">
          <div className="relative aspect-[3/4] max-w-md overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={doctor.image}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, x: -16 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease }}
                className="absolute inset-0"
              >
                <Image
                  src={doctor.image}
                  alt={`Portrait of ${doctor.name}, ${doctor.role} at AVERA`}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={doctor.number}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? {} : { opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease }}
            >
              <p className="font-serif text-2xl">{doctor.name}</p>
              <p className="eyebrow text-ivory/50 mt-2">{doctor.role}</p>
              <p className="text-sm text-ivory/60 mt-1">{doctor.experience}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </PageContainer>
    </section>
  );
}
