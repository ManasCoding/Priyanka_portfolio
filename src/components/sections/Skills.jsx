import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

import canvaIcon from "../../logo/Canva icon.png";
import figmaIcon from "../../logo/Figma icon.png";
import photoshopIcon from "../../logo/Photoshop icon.png";
import coreldrawIcon from "../../logo/Coreldraw icon.png";
import illustratorIcon from "../../logo/Adobe illustrator icon.png";

// Automatically import all created logos
const logoModules = import.meta.glob('../../assets/created logo/*.jpeg', { eager: true, import: 'default' });
const createdLogos = Object.values(logoModules).map((src, index) => ({
  name: `Created Logo ${index + 1}`,
  category: "Graphic Design",
  iconSrc: src
}));

const categoryColors = {
  "Design Tools": "#EAB308", // Yellow 500
  "Graphic Design": "#FBBF24", // Amber 400
  "Motion & Video": "#FCD34D", // Amber 300
  "UI/UX & Web Design": "#F59E0B", // Amber 500
};

const baseSkills = [
  { name: "Figma", category: "Design Tools", iconSrc: figmaIcon, bgColor: "#F24E1E" },
  { name: "Adobe Photoshop", category: "Design Tools", iconSrc: photoshopIcon, bgColor: "#31A8FF" },
  { name: "Illustrator", category: "Design Tools", iconSrc: illustratorIcon, bgColor: "#FF9A00" },
  { name: "CorelDRAW", category: "Design Tools", iconSrc: coreldrawIcon, bgColor: "#22C55E" },
  { name: "Canva", category: "Design Tools", iconSrc: canvaIcon, bgColor: "#00C4CC" },
];

const allSkills = [...baseSkills, ...createdLogos];

// Helper to create a long enough row for seamless looping on wide screens
const createRow = (skillsArray) => {
  return [...skillsArray, ...skillsArray, ...skillsArray];
};

// Split all skills into 2 rows
const half = Math.ceil(allSkills.length / 2);
const row1 = createRow(allSkills.slice(0, half));
const row2 = createRow(allSkills.slice(half));

const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-yellow-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 12px 2px rgba(250, 204, 21, 0.2)",
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, (Math.random() - 0.5) * 60, 0],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

const IconWrapper = ({ skill, index }) => {
  const glowColor = "#FBBF24"; // Amber-400 for yellow glowing shadow

  // Randomize the starting phase of the float animation based on index
  const yOffset = useMemo(() => (index % 2 === 0 ? [0, -12, 0] : [-12, 0, -12]), [index]);
  const duration = useMemo(() => 4 + (index % 4), [index]);

  return (
    <motion.div
      className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full cursor-pointer group shadow-lg overflow-hidden"
      style={{
        background: `rgba(255, 255, 255, 0.02)`,
        backdropFilter: "blur(16px)",
        border: `1px solid ${glowColor}30`,
        boxShadow: `0 0 20px ${glowColor}15, inset 0 0 15px ${glowColor}10`,
      }}
      whileHover={{ 
        scale: 1.15,
        borderColor: `${glowColor}80`,
        boxShadow: `0 0 40px ${glowColor}50, inset 0 0 25px ${glowColor}30`,
        transition: { duration: 0.3 }
      }}
      animate={{ y: yOffset }}
      transition={{
        y: {
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
        }
      }}
    >
      <div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
        style={{ background: `radial-gradient(circle at center, ${glowColor}40 0%, transparent 70%)` }} 
      />
      
      {skill.iconSrc ? (
        <img 
          src={skill.iconSrc} 
          alt={skill.name || "Logo"} 
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110" 
          style={{ filter: `drop-shadow(0 0 12px ${glowColor}60)` }} 
        />
      ) : null}
    </motion.div>
  );
};

const MarqueeRow = ({ items, duration, reverse = false }) => {
  return (
    <div className="flex w-full overflow-hidden pause-on-hover py-4 sm:py-6" style={{ '--duration': `${duration}s` }}>
      <div className={`flex w-max shrink-0 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {items.map((skill, i) => (
          <div key={i} className="mr-6 sm:mr-8">
            <IconWrapper skill={skill} index={i} />
          </div>
        ))}
      </div>
      <div className={`flex w-max shrink-0 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`} aria-hidden="true">
        {items.map((skill, i) => (
          <div key={`dup-${i}`} className="mr-6 sm:mr-8">
            <IconWrapper skill={skill} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="relative py-32 overflow-hidden" style={{ backgroundColor: "#050505" }}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee var(--duration, 30s) linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse var(--duration, 30s) linear infinite;
        }
        .pause-on-hover:hover .animate-marquee,
        .pause-on-hover:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background Effects */}
      <Particles />
      <div 
        className="absolute inset-0 z-0 opacity-[0.04]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Radial Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-400/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full mb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-yellow-500/30" />
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-yellow-500/60">Showcase</span>
            <div className="h-px w-8 bg-yellow-500/30" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Crafted <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500">Logos</span>
          </h2>
          <p className="text-white/40 max-w-xl mt-4 text-sm md:text-base font-light">
            A curated collection of bespoke brand identities and custom logo designs I have brought to life.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col gap-2 w-full max-w-[100vw] overflow-hidden">
        {/* Gradient Masks for smooth fade on edges */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        <MarqueeRow items={row1} duration={60} />
        <MarqueeRow items={row2} duration={75} reverse={true} />
      </div>
    </section>
  );
};
