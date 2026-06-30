import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
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
        className={`fixed top-2 left-0 right-0 z-40 mx-auto max-w-7xl px-4 transition-all duration-300`}
      >
        <div
          className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300 ${
            scrolled
              ? "bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <motion.a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl font-bold tracking-tight text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Priyanka<span className="text-accent">.</span>
          </motion.a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <motion.button
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200 relative group"
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </motion.button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.button
            onClick={() => handleNavClick("#contact")}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black hover:bg-accent/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 p-6"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left text-white/70 hover:text-accent transition-colors py-1"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full rounded-full bg-accent py-2.5 text-black font-semibold"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
};
