import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-accent"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-2 left-0 right-0 z-40 mx-auto max-w-7xl px-4 transition-all duration-300"
      >
        <div
          className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300 ${
            scrolled
              ? "bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl"
              : "bg-transparent"
          }`}
        >
          {/* Logo — PP Monogram */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* PP Monogram */}
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center shadow-lg shadow-accent/20">
              <span className="text-black font-black text-base leading-none tracking-tighter" style={{ fontFamily: "'Inter', sans-serif" }}>PP</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold text-white leading-tight">Priyanka Panda</span>
              <span className="text-[10px] text-white/40 leading-tight">UI/UX & Graphic Designer</span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <motion.button
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm transition-colors duration-200 relative group ${
                    activeSection === link.href
                      ? "text-accent font-medium"
                      : "text-white/60 hover:text-white"
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1px] bg-accent transition-all duration-300 ${
                      activeSection === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </motion.button>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.button
            onClick={() => handleNavClick("#contact")}
            className="hidden lg:inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
            <ArrowRight size={14} />
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 p-6"
            >
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`w-full text-left transition-colors py-1 ${
                        activeSection === link.href ? "text-accent font-medium" : "text-white/70 hover:text-accent"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handleNavClick("#contact")}
                    className="w-full rounded-full border border-accent/60 bg-accent/10 py-2.5 text-accent font-semibold hover:bg-accent hover:text-black transition-all"
                  >
                    Let's Connect →
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
