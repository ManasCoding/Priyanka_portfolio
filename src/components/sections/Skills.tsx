import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

const skills = [
  { name: "Canva", level: 95, category: "Design Tools" },
  { name: "Figma", level: 88, category: "Design Tools" },
  { name: "Adobe Photoshop", level: 85, category: "Design Tools" },
  { name: "CorelDRAW", level: 82, category: "Design Tools" },
  { name: "Logo Design", level: 92, category: "Graphic Design" },
  { name: "Poster & Banner Design", level: 95, category: "Graphic Design" },
  { name: "Brochure & Flyer Design", level: 90, category: "Graphic Design" },
  { name: "Social Media Design", level: 93, category: "Graphic Design" },
  { name: "Motion Graphics", level: 85, category: "Motion & Video" },
  { name: "Video Editing", level: 80, category: "Motion & Video" },
  { name: "UI/UX Design", level: 88, category: "Digital Design" },
  { name: "Website Design", level: 85, category: "Digital Design" },
];

const categories = ["Design Tools", "Graphic Design", "Motion & Video", "Digital Design"];

const categoryColors: Record<string, string> = {
  "Design Tools": "#6C63FF",
  "Graphic Design": "#FFD700",
  "Motion & Video": "#00C9A7",
  "Digital Design": "#FF6B35",
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const grouped = categories.map((cat) => ({
    category: cat,
    skills: skills.filter((s) => s.category === cat),
  }));

  return (
    <section id="skills" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-accent/[0.03] blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-accent" />
          <span className="text-sm font-medium tracking-widest uppercase text-accent">Expertise</span>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: easing }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Skills & <span className="text-gradient-accent italic">tools</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {grouped.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.15, ease: easing }}
              className="glass-card rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ background: categoryColors[group.category] }}
                />
                <h3 className="text-sm font-semibold tracking-widest uppercase text-white/50">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-col gap-6">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-sm font-medium text-white">{skill.name}</span>
                      <span
                        className="text-xs font-mono font-bold"
                        style={{ color: categoryColors[group.category] }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${categoryColors[group.category]}, ${categoryColors[group.category]}88)` }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.2, delay: gi * 0.15 + si * 0.1, ease: easing }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tool Icons Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 glass-card rounded-3xl p-8"
        >
          <p className="text-center text-sm text-white/30 uppercase tracking-widest mb-6">Trusted by my workflow</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {["Canva", "Figma", "Photoshop", "CorelDRAW", "Illustrator", "Capcut", "PowerPoint", "Google Slides", "Notion"].map((tool, i) => (
              <motion.div
                key={tool}
                className="px-4 py-2.5 rounded-xl glass text-sm text-white/60 hover:text-accent hover:border-accent/20 transition-all duration-300 cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.06 }}
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
