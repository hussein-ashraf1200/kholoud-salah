import Contact from "./components/Contact";
import HeroSection from "./components/HeroSection";
import RealStats from "./components/RealStats";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <div className=" p-2 bg-[#F8FAFB]">
      <main className="">
        <HeroSection />
        <RealStats />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
