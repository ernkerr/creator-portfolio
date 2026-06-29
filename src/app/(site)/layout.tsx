import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { AsciiBoot } from "@/components/AsciiBoot";

// Layout for the marketing site (home / portfolio). Lives in a route group so
// the standalone /links "link in bio" page can opt out of the sticky nav whose
// anchors (#work, #about) only exist on the home page.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <JsonLd />
      <AsciiBoot />
    </>
  );
}
