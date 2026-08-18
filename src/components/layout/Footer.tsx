import { footerLinks, socials } from "@/data/footer";
import PageContainer from "@/components/ui/PageContainer";

export default function Footer() {
  return (
    <footer className="bg-forest text-ivory/70 border-t border-ivory/10">
      <PageContainer className="py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-xs tracking-widest">
        <div>
          <span className="font-serif text-lg text-ivory block mb-1">
            AVERA
          </span>
          <span className="block">Dental &amp; Oral Care</span>
          <span className="block">South Jakarta</span>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="hover:text-ivory transition-colors"
            >
              {l.label.toUpperCase()}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ivory transition-colors"
            >
              {s.label.toUpperCase()}
            </a>
          ))}
        </div>

        <p>© 2025 AVERA. All rights reserved.</p>
      </PageContainer>
    </footer>
  );
}
