"use client";

import { motion, useReducedMotion } from "framer-motion";
import PageContainer from "@/components/ui/PageContainer";

export default function FinalCta() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-forest text-ivory">
      <PageContainer className="py-24 md:py-32">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
          className="flex flex-col md:items-end"
        >
          <span className="eyebrow text-ivory/50 mb-6">08 — BOOK A VISIT</span>
          <h2 className="display-hero text-right md:max-w-2xl">
            Take care
            <br />
            of your smile.
          </h2>
          <a
            href="#appointment"
            className="inline-flex items-center gap-3 eyebrow border-b border-ivory pb-1 mt-10 hover:opacity-60 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
          >
            BOOK AN APPOINTMENT →
          </a>
        </motion.div>
      </PageContainer>
    </section>
  );
}
