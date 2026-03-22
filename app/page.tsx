import Hero from "@/components/Hero";
import Agenda from "@/components/Agenda";
import Speakers from "@/components/Speakers";
import FAQ from "@/components/FAQ";
import Sponsors from "@/components/Sponsors";
import Registration from "@/components/Registration";
import ShareEvent from "@/components/ShareEvent";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#0A0A0A" }}>
      <Nav />
      <Hero />
      <Agenda />
      <Speakers />
      <FAQ />
      <Sponsors />
      <Registration />
      <ShareEvent />
      <Footer />
    </main>
  );
}
