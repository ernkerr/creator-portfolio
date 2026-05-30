import { Hero } from "@/components/Hero";
import { BlueStripe } from "@/components/BlueStripe";
import { ClientList } from "@/components/ClientList";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BlueStripe />
      <ClientList />
      <Work />
      <About />
      <Contact />
    </>
  );
}
