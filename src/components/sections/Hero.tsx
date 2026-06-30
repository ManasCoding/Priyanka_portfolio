import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";

const typingTexts = ["UI/UX Designer", "Graphic Designer", "Creative Designer", "Brand Identity Expert"];

// Floating particle component
const Particle = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.div
    className="absolute h-1 w-1 rounded-full bg-accent/40"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
    transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

const particles = Array.from({ length: 20 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: i * 0.2,
}));

export const Hero = () => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const glowX = useTransform(springX, (v) => `${v}px`);
  const glowY = useTransform(springY, (v) => `${v}px`);

  // Typing animation
  useEffect(() => {
    const current = typingTexts[typingIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 100);
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 50);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setTypingIndex((i) => (i + 1) % typingTexts.length);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, typingIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left - width / 2);
    mouseY.set(e.clientY - top - height / 2);
  };

  const fadeUp = (delay: number) => ({
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, delay, ease: "easeOut" as const },
  });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,215,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-accent/[0.03] blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[80px]" />
      </div>

      {/* Mouse glow */}
      <motion.div
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full"
        style={{
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
          background: "radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            {/* Availability Badge */}
            <motion.div {...fadeUp(0.3)}>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                <span className="text-accent font-medium">Available for new projects</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div {...fadeUp(0.4)} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <MapPin size={14} className="text-accent" />
                <span>India</span>
              </div>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.05]">
                Crafting <span className="text-gradient-accent">visual</span><br />
                stories<br />
                that <span className="italic text-white/70">leave a mark</span>.
              </h1>
            </motion.div>

            {/* Typing Text */}
            <motion.div {...fadeUp(0.5)} className="flex items-center gap-3">
              <div className="h-px w-8 bg-accent/50" />
              <span className="text-accent font-mono text-lg">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>

            {/* Description */}
            <motion.p {...fadeUp(0.55)} className="max-w-lg text-white/50 text-lg leading-relaxed">
              I'm <strong className="text-white">Priyanka Panda</strong>, a UI/UX & Graphic Designer with 2+ years of experience creating stunning brand identities, marketing assets, and digital experiences for growing businesses.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.6)} className="flex flex-wrap items-center gap-4">
              <motion.button
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-black hover:bg-accent/90 transition-all duration-300 shadow-[0_0_30px_rgba(255,215,0,0.2)]"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,215,0,0.35)" }}
                whileTap={{ scale: 0.97 }}
              >
                View My Work
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-base font-medium text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={16} />
                Download CV
              </motion.button>
            </motion.div>

            {/* Stats Row */}
            <motion.div {...fadeUp(0.7)} className="flex items-center gap-8 pt-4">
              {[
                { value: "2+", label: "Years Exp." },
                { value: "50+", label: "Projects" },
                { value: "100%", label: "Dedication" },
                { value: "3", label: "Companies" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-accent">{stat.value}</span>
                  <span className="text-xs text-white/40">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Profile Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow behind avatar */}
              <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl scale-150" />
              
              {/* Avatar Ring */}
              <div className="relative h-80 w-80 md:h-96 md:w-96">
                {/* Outer animated border */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0%, #ffd700 20%, transparent 40%, transparent 60%, #ffd700 80%, transparent 100%)",
                    padding: "2px",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <div className="h-full w-full rounded-full bg-background" />
                </motion.div>

                {/* Profile visual */}
                <div className="absolute inset-3 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-br from-[#1a1a1a] via-[#222] to-[#111] flex items-center justify-center">
                    <div className="relative flex flex-col items-center">
                      {/* Head */}
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 shadow-lg" />
                      {/* Body */}
                      <div className="mt-2 h-16 w-32 rounded-t-3xl bg-gradient-to-br from-[#ffd700]/80 to-[#b39700]/60" />
                    </div>
                  </div>
                </div>

                {/* Floating UI elements */}
                <motion.div
                  className="absolute -right-8 top-8 glass-card rounded-2xl p-3 shadow-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Sparkles size={14} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Top Designer</div>
                      <div className="text-[10px] text-white/40">Featured 2026</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -left-10 bottom-12 glass-card rounded-2xl p-3 shadow-xl"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {["bg-blue-400", "bg-purple-400", "bg-pink-400"].map((c, i) => (
                        <div key={i} className={`h-6 w-6 rounded-full border-2 border-black ${c}`} />
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Happy Clients</div>
                      <div className="text-[10px] text-white/40">50+ delivered</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating skills badge */}
                <motion.div
                  className="absolute -bottom-4 right-8 glass-card rounded-xl px-4 py-2"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="text-xs font-medium text-accent">Canva & Figma ✦</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs tracking-widest text-white/30 uppercase">Scroll</span>
        <motion.div
          className="h-8 w-[1px] bg-gradient-to-b from-accent/60 to-transparent"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
};
