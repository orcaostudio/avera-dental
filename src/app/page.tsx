import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Appointment from "@/components/sections/Appointment";
import Services from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Clinic from "@/components/sections/Clinic";
import Location from "@/components/sections/Location";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <Appointment />
      <Services />
      <Team />
      <Testimonials />
      <Clinic />
      <Location />
      <FinalCta />
      <Footer />
    </main>
  );
}
