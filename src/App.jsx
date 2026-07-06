import { useEffect } from "react";
import Lenis from "lenis";

// Layout
import { LoadingScreen } from "./components/layout/LoadingScreen";
import { CustomCursor } from "./components/layout/CustomCursor";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { FloatingIcons } from "./components/ui/FloatingIcons";

// Sections
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { Projects } from "./components/sections/Projects";
import { Process } from "./components/sections/Process";
import { Skills } from "./components/sections/Skills";
import { ClientShowcase } from "./components/sections/ClientShowcase";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <div className="relative min-h-screen bg-background overflow-x-hidden cursor-none">
        <Navbar />
        <main>
          <Hero />
          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <About />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <Services />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <Projects />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <Process />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <Skills />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <ClientShowcase />
          <Testimonials />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <Contact />
        </main>
        <Footer />
        <FloatingIcons />
      </div>
    </>
  );
}

export default App;
