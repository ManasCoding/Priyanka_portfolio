import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, PenLine, Palette, PlayCircle, CheckCircle2, Rocket } from "lucide-react";

const easing = [0.22, 1, 0.36, 1];

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Research",
    desc: "Deep-dive user research, competitor analysis, and stakeholder interviews to establish clear project foundations.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: PenLine,
    number: "02",
    title: "Wireframing",
    desc: "Low-fidelity sketches and wireframes that map user flows and establish structural hierarchy before visual design.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    icon: Palette,
    number: "03",
    title: "UI Design",
    desc: "Pixel-perfect high-fidelity designs with comprehensive design systems, components, and visual guidelines.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: PlayCircle,
    number: "04",
    title: "Prototyping",
    desc: "Interactive prototypes that simulate real product behavior for stakeholder presentations and user testing.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    icon: CheckCircle2,
    number: "05",
    title: "Testing",
    desc: "Iterative usability testing, A/B experiments, and feedback loops that validate assumptions and refine the design.",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    icon: Rocket,
    number: "06",
    title: "Launch",
    desc: "Development handoff with detailed specs, assets, and ongoing collaboration to ensure design intent is preserved.",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
];

export const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/[0.03] blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-accent" />
          <span className="text-sm font-medium tracking-widest uppercase text-accent">Process</span>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: easing }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            How I <span className="text-gradient-accent italic">work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="max-w-sm text-white/50 text-sm leading-relaxed"
          >
            A structured, human-centered process that minimizes risk and maximizes impact at every stage.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-7 top-8 bottom-8 w-[1px] bg-gradient-to-b from-accent/40 via-white/10 to-transparent hidden md:block" />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: easing }}
                className="group flex gap-6 md:gap-10 items-start"
              >
                {/* Step Icon */}
                <div className={`relative z-10 shrink-0 h-14 w-14 rounded-2xl ${step.bg} flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300`}>
                  <step.icon size={22} className={step.color} />
                  {/* Connector dot */}
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-accent/50 hidden md:block" />
                </div>

                {/* Content */}
                <div className="glass-card rounded-2xl flex-1 p-6 hover:border-white/15 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,215,0,0.04)]">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                    <span className="text-xs font-mono text-white/20">{step.number}</span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
