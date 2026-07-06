import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Dynamically import all logo images from the assets folder
const logoModules = import.meta.glob('../../assets/oditechlogo/*.{png,jpg,jpeg,svg,webp}', { eager: true });
const clientLogos = Object.values(logoModules).map((module) => module.default);

// If there are too few logos, duplicate them to ensure the marquee works
const duplicatedLogos = clientLogos.length > 0 
  ? [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos]
  : [];

// Floating golden particle
const Particle = ({ delay, left, top, size = 3, duration = 8 }) => (
  <motion.div
    className="absolute rounded-full bg-accent/40 blur-[1px]"
    style={{
      left: `${left}%`,
      top: `${top}%`,
      width: size,
      height: size,
      boxShadow: "0 0 10px 2px rgba(255,215,0,0.3)",
    }}
    animate={{ 
      y: [0, -50, 0], 
      x: [0, 20, 0],
      opacity: [0, 0.6, 0], 
      scale: [0.5, 1.2, 0.5] 
    }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

export const ClientShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (clientLogos.length === 0) return null;

  return (
    <section id="clients" ref={ref} className="relative py-32 overflow-hidden bg-transparent">
      {/* Cinematic Lighting & Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Core ambient light */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[80%] rounded-full bg-accent/[0.015] blur-[150px]" />
        
        {/* Particles */}
        <Particle delay={0} left={10} top={20} size={4} duration={7} />
        <Particle delay={2} left={85} top={30} size={3} duration={9} />
        <Particle delay={4} left={25} top={80} size={5} duration={10} />
        <Particle delay={1} left={75} top={75} size={4} duration={8} />
        <Particle delay={3} left={50} top={10} size={3} duration={6} />
      </div>

      <div className="mx-auto max-w-7xl px-6 mb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-sm font-semibold tracking-[0.3em] uppercase text-accent/80 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            World-Class Partners
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex flex-col gap-16 md:gap-24 py-10">
        {/* Cinematic Vignette / Fade at edges */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />

        {/* Row 1: Left to Right */}
        <div className="flex w-max relative z-10">
          <motion.div
            className="flex items-center gap-16 md:gap-24 pl-16 md:pl-24"
            animate={{ x: [0, -2000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            {duplicatedLogos.map((logoUrl, index) => (
              <motion.div
                key={`row1-${index}`}
                className="relative group flex items-center justify-center w-24 h-16 md:w-36 md:h-24 shrink-0 cursor-pointer"
                animate={{ y: [-8, 8, -8] }}
                transition={{ 
                  duration: 4 + (index % 3), 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              >
                {/* Subtle golden ambient glow behind each logo */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 blur-[30px] rounded-full transition-all duration-700 ease-out" />
                
                {/* Realistic light reflection below logo */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-accent/0 group-hover:bg-accent/20 blur-[10px] rounded-[100%] transition-all duration-700 opacity-0 group-hover:opacity-100 transform scale-x-50 group-hover:scale-x-100" />
                
                <img 
                  src={logoUrl} 
                  alt="Client Logo" 
                  className="relative z-10 w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[0.16,1,0.3,1] drop-shadow-[0_0_0_rgba(255,215,0,0)] group-hover:drop-shadow-[0_10px_20px_rgba(255,215,0,0.15)]"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right to Left (Offset) */}
        <div className="flex w-max relative z-10 ml-[-400px]">
          <motion.div
            className="flex items-center gap-16 md:gap-24 pl-16 md:pl-24"
            animate={{ x: [-2000, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 55,
                ease: "linear",
              },
            }}
          >
            {duplicatedLogos.slice().reverse().map((logoUrl, index) => (
              <motion.div
                key={`row2-${index}`}
                className="relative group flex items-center justify-center w-24 h-16 md:w-36 md:h-24 shrink-0 cursor-pointer"
                animate={{ y: [8, -8, 8] }}
                transition={{ 
                  duration: 4.5 + (index % 3), 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.3
                }}
              >
                {/* Subtle golden ambient glow behind each logo */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 blur-[30px] rounded-full transition-all duration-700 ease-out" />
                
                {/* Realistic light reflection below logo */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-accent/0 group-hover:bg-accent/20 blur-[10px] rounded-[100%] transition-all duration-700 opacity-0 group-hover:opacity-100 transform scale-x-50 group-hover:scale-x-100" />
                
                <img 
                  src={logoUrl} 
                  alt="Client Logo" 
                  className="relative z-10 w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[0.16,1,0.3,1] drop-shadow-[0_0_0_rgba(255,215,0,0)] group-hover:drop-shadow-[0_10px_20px_rgba(255,215,0,0.15)]"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
