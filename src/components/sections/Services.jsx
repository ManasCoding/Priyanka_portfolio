import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Layers, Image, FileText, Video, PenLine } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Logo Design",
    desc: "Crafting memorable brand marks and visual identities that capture your brand's essence and stand out in the market.",
    tags: ["Brand Identity", "Typography", "Iconography"],
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    desc: "Creating intuitive, user-centered website and app interfaces with seamless user flows and beautiful visual design.",
    tags: ["Figma", "Wireframes", "Prototyping"],
  },
  {
    icon: Image,
    title: "Social Media Design",
    desc: "Eye-catching social media posts, stories, and campaign visuals that boost engagement and brand visibility.",
    tags: ["Instagram", "Facebook", "LinkedIn"],
  },
  {
    icon: FileText,
    title: "Print & Marketing",
    desc: "Professional brochures, flyers, visiting cards, banners, posters, and packaging designs for impactful marketing.",
    tags: ["Brochures", "Posters", "Banners"],
  },
  {
    icon: Video,
    title: "Motion Graphics",
    desc: "Dynamic animated content and video editing that brings your brand story to life with engaging visual motion.",
    tags: ["Canva", "Animation", "Video"],
  },
  {
    icon: PenLine,
    title: "Brand Collateral",
    desc: "Complete brand material packages including menu cards, identity cards, QR codes, and presentation designs.",
    tags: ["Menu Cards", "PPT", "ID Cards"],
  },
];

const easing = [0.22, 1, 0.36, 1];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-accent/[0.04] blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-accent" />
          <span className="text-sm font-medium tracking-widest uppercase text-accent">Services</span>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: easing }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            What I <span className="text-gradient-accent italic">create</span><br />
            for you
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-sm text-white/50 text-sm leading-relaxed"
          >
            End-to-end design solutions tailored to your business goals, from concept to pixel-perfect delivery.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: easing }}
              className="group glass-card rounded-3xl p-8 hover:border-accent/20 transition-all duration-500 relative overflow-hidden cursor-default"
              whileHover={{ y: -6 }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl" />

              <div className="relative z-10">
                <motion.div
                  className="mb-6 h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <svc.icon size={22} className="text-accent" />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{svc.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 group-hover:border-accent/20 group-hover:text-accent/70 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-accent to-accent/0 transition-all duration-500 rounded-b-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
