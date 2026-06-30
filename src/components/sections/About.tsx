import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Zap, Target, Users } from "lucide-react";

const stats = [
  { value: "2+", label: "Years of Experience", icon: Zap },
  { value: "50+", label: "Projects Completed", icon: Target },
  { value: "3", label: "Companies Worked", icon: Heart },
  { value: "100%", label: "Client Dedication", icon: Users },
];

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const fadeUp = (delay: number) => ({
    initial: { y: 40, opacity: 0 },
    animate: isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 },
    transition: { duration: 0.7, delay, ease: easing },
  });

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Label */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-accent" />
          <span className="text-sm font-medium tracking-widest uppercase text-accent">About Me</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Text Content */}
          <div>
            <motion.h2
              {...fadeUp(0.1)}
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
            >
              Designing experiences <br />
              <span className="text-gradient-accent italic">beyond the screen</span>.
            </motion.h2>

            <motion.div {...fadeUp(0.2)} className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Hi, I'm <strong className="text-white">Priyanka Panda</strong> — a UI/UX & Graphic Designer driven by the belief that great design transforms brands, communicates stories, and creates lasting impressions.
              </p>
              <p>
                With over 2 years of professional experience working with companies like Zenin India Software, Bargha Tech, and OdiTech Global, I specialize in logo design, brand identity, marketing collateral, social media design, and UI/UX for web and mobile.
              </p>
              <p>
                My philosophy: <em className="text-white/80">design is storytelling with visual impact</em>. Every element has a purpose. Every design speaks to its audience.
              </p>
            </motion.div>

            {/* Philosophy Cards */}
            <motion.div {...fadeUp(0.3)} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "User-First", desc: "I start and end every decision with the user in mind." },
                { title: "Pixel Perfect", desc: "Details make the difference between good and great." },
                { title: "Story-Driven", desc: "Every design tells a story worth experiencing." },
                { title: "Collaborative", desc: "Great design is born from open, honest collaboration." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="glass-card rounded-2xl p-4 hover:border-accent/20 transition-colors"
                >
                  <h4 className="text-sm font-semibold text-accent mb-1">{item.title}</h4>
                  <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUp(0.1 + i * 0.1)}
                className="group glass-card rounded-3xl p-6 hover:border-accent/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.05)]"
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="mb-4 h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <stat.icon size={18} className="text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </motion.div>
            ))}

            {/* Experience Timeline */}
            <motion.div {...fadeUp(0.6)} className="col-span-2 glass-card rounded-3xl p-6">
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-5">Experience</h3>
              <div className="space-y-4">
                {[
                  { role: "UI/UX & Graphic Designer", company: "OdiTech Global Pvt. Ltd.", period: "May 2026–Present" },
                  { role: "UI & Graphic Designer", company: "Bargha Tech Pvt. Ltd.", period: "Nov 2025–May 2026" },
                  { role: "UI & Graphic Designer", company: "Zenin India Software Pvt. Ltd.", period: "Nov 2024–Nov 2025" },
                ].map((exp) => (
                  <div key={exp.role} className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-white">{exp.role}</div>
                      <div className="text-xs text-accent/70">{exp.company}</div>
                    </div>
                    <div className="text-xs text-white/30 shrink-0 ml-4">{exp.period}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
