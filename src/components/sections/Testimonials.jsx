import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Mishra",
    role: "Director, Zixin India Software Pvt. Ltd.",
    quote: "Priyanka's design work transformed our brand presence completely. From our logo to social media — everything she delivered was professional, creative, and exactly what we needed. A truly dedicated designer.",
    rating: 5,
    avatar: "RM",
    color: "#6C63FF",
  },
  {
    name: "Sneha Patnaik",
    role: "CEO, Barsha Tech Pvt. Ltd.",
    quote: "Working with Priyanka was a fantastic experience. Her motion graphics and video editing skills brought our marketing campaigns to life. She understands brand storytelling like no one else.",
    rating: 5,
    avatar: "SP",
    color: "#00C9A7",
  },
  {
    name: "Amit Sahoo",
    role: "Founder, OdiTech Global Pvt. Ltd.",
    quote: "Priyanka joined our team and immediately elevated our design quality. Her UI/UX work on our website pages and her menu card designs are some of the best work we've seen. Highly recommended.",
    rating: 5,
    avatar: "AS",
    color: "#FFD700",
  },
  {
    name: "Deepika Nayak",
    role: "Marketing Head, Local Business Client",
    quote: "The brochures and poster designs Priyanka created for our campaigns were stunning. She has an incredible eye for detail and always delivers on time with top-notch quality.",
    rating: 5,
    avatar: "DN",
    color: "#FF6B35",
  },
];

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const go = (dir) => {
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/3 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-accent" />
          <span className="text-sm font-medium tracking-widest uppercase text-accent">Testimonials</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-16"
        >
          What clients <span className="text-gradient-accent italic">say</span>
        </motion.h2>

        <div className="relative">
          {/* Main Featured Testimonial */}
          <div className="relative min-h-[280px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-3xl p-10 md:p-14"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed mb-8">
                  "{testimonials[current].quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div
                    className="h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold text-black"
                    style={{ background: testimonials[current].color }}
                  >
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonials[current].name}</div>
                    <div className="text-sm text-white/40">{testimonials[current].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-accent" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={() => go(-1)}
                className="h-10 w-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-accent hover:border-accent/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                onClick={() => go(1)}
                className="h-10 w-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-accent hover:border-accent/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mini testimonial grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.name}
              onClick={() => setCurrent(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08 }}
              className={`glass-card rounded-2xl p-4 text-left transition-all duration-300 ${
                i === current ? "border-accent/30 bg-accent/5" : "hover:border-white/15"
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-black shrink-0"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-white truncate">{t.name}</div>
                  <div className="text-[10px] text-white/30 truncate">{t.role}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
