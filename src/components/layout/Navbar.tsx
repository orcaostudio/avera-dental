"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks } from "@/data/navigation";
import PageContainer from "@/components/ui/PageContainer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-ivory/90 backdrop-blur-sm border-b border-text/10"
          : "bg-transparent"
      }`}
    >
      <PageContainer className="flex items-center justify-between py-6">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-xl tracking-tight">AVERA</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="eyebrow text-current/70 hover:text-current transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
            >
              <span className="mr-1 opacity-50">{link.number}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#appointment"
          className="hidden md:inline-flex items-center gap-2 eyebrow border-b border-current pb-0.5 hover:opacity-60 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
        >
          BOOK A VISIT
          <span aria-hidden="true">→</span>
        </a>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded="false"
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="block w-6 h-px bg-current" />
          <span className="block w-6 h-px bg-current" />
        </button>
      </PageContainer>
    </header>
  );
}
