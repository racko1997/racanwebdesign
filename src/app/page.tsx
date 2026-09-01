import { Header, MobileBar } from "@/components/Chrome";
import {
  Hero,
  Radovi,
  StaDobijete,
  Cijene,
  Kako,
  ONama,
  Pitanja,
} from "@/components/Sections";
import Kontakt from "@/components/Kontakt";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header overDark />
      <main id="sadrzaj">
        <Hero />
        <Radovi />
        <StaDobijete />
        <Cijene />
        <Kako />
        <ONama />
        <Pitanja />
        <Kontakt />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
