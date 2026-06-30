import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const easing = [0.22, 1, 0.36, 1];

const projects = [
  {
    id: 1,
    title: "Zenin Brand Identity Suite",
    category: "Branding · Logo & Collateral",
    desc: "Complete brand identity package for Zenin India Software — logo design, visiting cards, letterheads, brochures, and a comprehensive social media kit used across all platforms.",
    tags: ["Photoshop", "CorelDRAW", "Branding", "Print"],
    color: "from-blue-500/20 to-purple-500/20",
    accent: "#6C63FF",
    year: "2025",
  },
  {
    id: 2,
    title: "Bargha Tech Marketing Campaign",
    category: "Social Media · Motion Graphics",
    desc: "Designed a full-suite marketing campaign including animated social media posts, promotional banners, video reels, and presentation decks that boosted online engagement.",
    tags: ["Canva", "Motion", "Social Media", "Video"],
    color: "from-green-500/20 to-teal-500/20",
    accent: "#00C9A7",
    year: "2026",
  },
  {
    id: 3,
    title: "Restaurant Menu & Packaging",
    category: "Print Design · Menu Cards",
    desc: "Premium restaurant menu card design and food packaging visuals that elevated the dining brand's visual identity — from layout typography to mouth-watering food photography integration.",
    tags: ["Photoshop", "CorelDRAW", "Print", "Packaging"],
    color: "from-orange-500/20 to-red-500/20",
    accent: "#FF6B35",
    year: "2026",
  },
  {
    id: 4,
    title: "OdiTech Website UI/UX",
    category: "Web Design · UI/UX",
    desc: "Designed modern, conversion-focused website pages for OdiTech Global — including landing pages, service pages, and responsive UI components with a clean, professional aesthetic.",
    tags: ["Figma", "UI/UX", "Web Design", "Responsive"],
    color: "from-yellow-500/20 to-amber-500/20",
    accent: "#FFD700",
    year: "2026",
  },
];

const Marquee = () => {
  const items = ["Logo Design", "Brand Identity", "Social Media", "UI/UX Design", "Poster Design", "Motion Graphics", "Packaging", "Web Design"];
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-8 border-y border-white/5 my-16">
      <div className="flex gap-8 whitespace-nowrap" style={{ animation: "marquee 20s linear infinite", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} className="text-2xl font-bold text-white/10 hover:text-accent/40 transition-colors cursor-default shrink-0">
            {item} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-accent" />
          <span className="text-sm font-medium tracking-widest uppercase text-accent">Featured Work</span>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: easing }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Selected <span className="text-gradient-accent italic">projects</span>
          </motion.h2>
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group inline-flex items-center gap-2 text-sm text-white/50 hover:text-accent transition-colors"
          >
            View all work
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: easing }}
              className="group glass-card rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer"
              whileHover={{ y: -6 }}
            >
              {/* Project Preview */}
              <div className={`relative h-56 bg-gradient-to-br ${project.color} overflow-hidden`}>
                {/* Animated background grid in preview */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(${project.accent}22 1px, transparent 1px), linear-gradient(90deg, ${project.accent}22 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                  }}
                />
                {/* Floating mockup elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="glass rounded-2xl p-4 shadow-2xl"
                    style={{ borderColor: `${project.accent}30` }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  >
                    <div className="flex flex-col gap-2 w-48">
                      <div className="h-2 w-24 rounded-full" style={{ background: project.accent, opacity: 0.6 }} />
                      <div className="h-1.5 w-36 rounded-full bg-white/20" />
                      <div className="h-1.5 w-28 rounded-full bg-white/20" />
                      <div className="mt-2 flex gap-2">
                        <div className="h-8 w-16 rounded-lg" style={{ background: `${project.accent}40` }} />
                        <div className="h-8 w-16 rounded-lg bg-white/10" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Year badge */}
                <div className="absolute top-4 right-4 text-xs font-mono text-white/40 bg-black/30 rounded-full px-3 py-1 backdrop-blur-sm">
                  {project.year}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <motion.button
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-xs font-medium text-white border border-white/20 hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={12} />
                    Case Study
                  </motion.button>
                  <motion.button
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-black border border-transparent hover:opacity-90 transition-colors"
                    style={{ background: project.accent }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Demo
                    <ArrowUpRight size={12} />
                  </motion.button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="text-xs text-white/40 mb-2 font-medium">{project.category}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-white/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Marquee />
      </div>
    </section>
  );
};
