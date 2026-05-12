import Hero from "@/components/hero";
import Services from "@/components/services";
import Work from "@/components/work";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import OceanHome from "@/components/ocean-home";

export default function Home() {
  return (
    <OceanHome>
      <Hero />
      <Services />
      <Work />
      <Testimonials />
      <Contact />
    </OceanHome>
  );
}
