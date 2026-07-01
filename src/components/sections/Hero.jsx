import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Download, MapPin, Star, Users, Award, Coffee } from "lucide-react";

const typingTexts = ["UI/UX Designer", "Graphic Designer", "Creative Designer", "Brand Identity Expert"];

// Floating golden particle
const GoldParticle = ({ delay, left, top, size = 4, dur = 5 }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${left}%`,
      top: `${top}%`,
      width: size,
      height: size,
      background: "radial-gradient(circle, #ffd700 0%, transparent 70%)",
    }}
    animate={{ y: [0, -40, 0], opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
    transition={{ duration: dur, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

// Tool icon badge component
const ToolIcon = ({ bg, text, delay }) => (
  <motion.div
    className="h-9 w-9 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg"
    style={{ background: bg, color: text || "#fff" }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.4 + delay * 0.1, type: "spring", stiffness: 200 }}
  >
    {text === "Bē" ? "Bē" : text}
  </motion.div>
);

const stats = [
  { value: "50+", label: "Projects Completed", icon: Star },
  { value: "30+", label: "Happy Clients", icon: Users },
  { value: "2+", label: "Years Experience", icon: Award },
  { value: "1000+", label: "Cups of Coffee", icon: Coffee },
];

export const Hero = () => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef(null);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const glowX = useTransform(springX, (v) => `${v}px`);
  const glowY = useTransform(springY, (v) => `${v}px`);

  // Typing animation
  useEffect(() => {
    const current = typingTexts[typingIndex];
    let timeout;
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

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left - width / 2);
    mouseY.set(e.clientY - top - height / 2);
  };

  const fadeUp = (delay) => ({
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, delay, ease: "easeOut" },
  });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
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
          background: "radial-gradient(circle, rgba(255,215,0,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Floating Gold Particles */}
      {[
        { left: 5, top: 20, delay: 0, size: 3 },
        { left: 15, top: 60, delay: 1, size: 5 },
        { left: 25, top: 35, delay: 2, size: 3 },
        { left: 45, top: 15, delay: 0.5, size: 4 },
        { left: 55, top: 70, delay: 1.5, size: 3 },
        { left: 65, top: 25, delay: 2.5, size: 5 },
        { left: 75, top: 55, delay: 0.8, size: 3 },
        { left: 85, top: 30, delay: 1.8, size: 4 },
        { left: 90, top: 65, delay: 2.2, size: 3 },
        { left: 35, top: 80, delay: 3, size: 4 },
        { left: 70, top: 10, delay: 1.2, size: 3 },
        { left: 80, top: 75, delay: 0.3, size: 5 },
        { left: 10, top: 85, delay: 2.8, size: 3 },
        { left: 50, top: 45, delay: 1.7, size: 4 },
        { left: 95, top: 50, delay: 0.6, size: 3 },
      ].map((p, i) => (
        <GoldParticle key={i} {...p} />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pt-28 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          {/* ===== LEFT CONTENT ===== */}
          <div className="flex flex-col gap-5">
            {/* Availability Badge */}
            <motion.div {...fadeUp(0.3)}>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.07] px-5 py-2.5 text-sm backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                <span className="text-accent font-semibold tracking-wide uppercase text-xs">Available for new projects</span>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div {...fadeUp(0.35)} className="flex items-center gap-2 text-white/40 text-sm">
              <MapPin size={14} className="text-accent" />
              <span>India</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div {...fadeUp(0.4)}>
              <h1 className="text-5xl md:text-6xl xl:text-[4.5rem] font-bold tracking-tight text-white leading-[1.08]">
                Crafting{" "}
                <span className="text-gradient-accent">visual</span>
                <br />
                stories that
                <br />
                <span
                  className="italic text-gradient-accent"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  leave a mark.
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p {...fadeUp(0.5)} className="max-w-lg text-white/50 text-base leading-relaxed">
              I'm <strong className="text-white font-semibold">Priyanka Panda</strong>, a UI/UX & Graphic Designer
              with 2+ years of experience creating stunning brand
              identities, marketing assets, and digital experiences
              for growing businesses.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.55)} className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-black hover:bg-accent/90 transition-all duration-300 shadow-[0_0_30px_rgba(255,215,0,0.25)]"
                whileHover={{ scale: 1.05, boxShadow: "0 0 45px rgba(255,215,0,0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                View My Work
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.a
                href="/Priyanka_Panda_CV.pdf"
                download
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={15} />
                Download CV
              </motion.a>
            </motion.div>
          </div>

          {/* ===== RIGHT — PROFILE VISUAL ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Large golden glow behind */}
              <div className="absolute inset-0 rounded-full bg-accent/10 blur-[80px] scale-[1.6]" />

              {/* Golden arc / crescent decoration */}
              <motion.div
                className="absolute -inset-6 rounded-full"
                style={{
                  background: "conic-gradient(from 200deg, transparent 0%, #ffd70040 15%, #ffd70080 25%, #ffd70040 35%, transparent 50%, transparent 100%)",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Secondary golden arc */}
              <motion.div
                className="absolute -inset-10 rounded-full"
                style={{
                  background: "conic-gradient(from 60deg, transparent 0%, #ffd70020 10%, #ffd70040 18%, #ffd70020 26%, transparent 40%, transparent 100%)",
                }}
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              {/* Avatar Container */}
              <div className="relative h-80 w-80 md:h-[22rem] md:w-[22rem]">
                {/* Outer rotating ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0%, #ffd700 15%, transparent 30%, transparent 70%, #ffd700 85%, transparent 100%)",
                    padding: "2px",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <div className="h-full w-full rounded-full bg-background" />
                </motion.div>

                {/* Profile Image */}
                <div className="absolute inset-2 rounded-full overflow-hidden border border-white/5">
                  <img
                    src="/priyanka.png"
                    alt="Priyanka Panda - UI/UX & Graphic Designer"
                    className="h-full w-full object-cover object-center"
                  />
                  {/* Soft gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                </div>

                {/* ===== FLOATING BADGES ===== */}

                {/* Top Designer Badge */}
                <motion.div
                  className="absolute -right-16 top-6 glass-card rounded-2xl p-3 px-4 shadow-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Award size={14} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Top Designer</div>
                      <div className="text-[10px] text-white/40">Featured 2026</div>
                    </div>
                  </div>
                </motion.div>

                {/* Happy Clients Badge */}
                <motion.div
                  className="absolute -left-14 bottom-20 glass-card rounded-2xl p-3 px-4 shadow-xl"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-2">
                      {["bg-amber-400", "bg-rose-400", "bg-blue-400"].map((c, i) => (
                        <div key={i} className={`h-7 w-7 rounded-full border-2 border-[#111] ${c}`} />
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Happy Clients</div>
                      <div className="text-[10px] text-white/40">50+ delivered</div>
                    </div>
                  </div>
                </motion.div>

                {/* Tool Icons Badge */}
                <motion.div
                  className="absolute -bottom-2 right-0 glass-card rounded-xl px-4 py-3 shadow-xl"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2">
                    <ToolIcon bg="#1769FF" text="Bē" delay={0} />
                    <ToolIcon bg="#0A66C2" text="in" delay={1} />
                    <ToolIcon bg="#F24E1E" text="F" delay={2} />
                    <ToolIcon bg="#31A8FF" text="Ps" delay={3} />
                    <ToolIcon bg="#FF9A00" text="Ai" delay={4} />
                  </div>
                  <div className="text-[11px] font-medium text-accent mt-1.5 text-center">Canva & Figma ✦</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== STATS BAR ===== */}
        <motion.div
          {...fadeUp(0.75)}
          className="mt-12 lg:mt-8"
        >
          <div className="max-w-2xl glass-card rounded-2xl px-8 py-6 flex items-center justify-between gap-6 flex-wrap">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                  <stat.icon size={14} className="text-accent/60" />
                  <span className="text-2xl font-bold text-accent">{stat.value}</span>
                </div>
                <span className="text-[11px] text-white/40 leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
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
