import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, Mail, MessageSquare } from "lucide-react";

const projectTypes = ["UI/UX Design", "Mobile App", "Web Design", "Design System", "Branding", "Consultation"];
const budgetRanges = ["< $5K", "$5K – $15K", "$15K – $50K", "$50K+"];



export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState("idle");
  const [form, setForm] = useState({
    name: "", email: "", projectType: "", budget: "", message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email required";
    if (!form.projectType) newErrors.projectType = "Please select a project type";
    if (!form.message.trim() || form.message.length < 20) newErrors.message = "Message must be at least 20 characters";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("loading");

    // Build WhatsApp message from form data
    const whatsappNumber = "916370459553";
    const messageParts = [
      `👋 Hi Priyanka!`,
      ``,
      `*Name:* ${form.name}`,
      `*Email:* ${form.email}`,
      `*Project Type:* ${form.projectType}`,
      form.budget ? `*Budget Range:* ${form.budget}` : null,
      ``,
      `*Message:*`,
      form.message,
    ].filter(Boolean);

    const whatsappMessage = encodeURIComponent(messageParts.join("\n"));
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    // Short delay for UX feedback, then redirect
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setFormState("success");
    }, 1000);
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-accent" />
          <span className="text-sm font-medium tracking-widest uppercase text-accent">Contact</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Let's create something <span className="text-gradient-accent italic">amazing</span> together.
            </h2>
            <p className="text-white/50 leading-relaxed mb-10">
              Got a project in mind? I'd love to hear about it. Let's discuss how we can work together to create exceptional digital experiences.
            </p>

            <div className="flex flex-col gap-4">
              <a href="mailto:pandapriyanka151@gmail.com" className="group inline-flex items-center gap-3 text-white/60 hover:text-accent transition-colors">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail size={16} className="text-accent" />
                </div>
                <span className="text-sm">pandapriyanka151@gmail.com</span>
              </a>
              <a href="https://wa.me/916370459553" className="group inline-flex items-center gap-3 text-white/60 hover:text-accent transition-colors">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <MessageSquare size={16} className="text-accent" />
                </div>
                <span className="text-sm">WhatsApp: +91 6370459553</span>
              </a>
            </div>

            {/* Availability */}
            <div className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/5 px-5 py-3 self-start">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <span className="text-sm text-accent font-medium">Available for freelance & full-time projects</span>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card rounded-3xl p-12 flex flex-col items-center text-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center"
                  >
                    <CheckCircle2 size={32} className="text-accent" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">Message sent!</h3>
                  <p className="text-white/50 text-sm">
                    Thanks for reaching out! I'll get back to you within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => { setFormState("idle"); setForm({ name: "", email: "", projectType: "", budget: "", message: "" }); }}
                    className="mt-4 rounded-full border border-white/20 px-6 py-2.5 text-sm text-white hover:bg-white/5 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Send another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="glass-card rounded-3xl p-8 flex flex-col gap-5"
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-white/40 mb-1.5 block">Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Your name"
                        className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-accent/50 transition-colors ${errors.name ? "border-red-500/50" : "border-white/10"}`}
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-white/40 mb-1.5 block">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="your@email.com"
                        className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-accent/50 transition-colors ${errors.email ? "border-red-500/50" : "border-white/10"}`}
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="text-xs font-medium text-white/40 mb-2 block">Project Type *</label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleChange("projectType", type)}
                          className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                            form.projectType === type
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    {errors.projectType && <p className="text-xs text-red-400 mt-1">{errors.projectType}</p>}
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="text-xs font-medium text-white/40 mb-2 block">Budget Range</label>
                    <div className="flex flex-wrap gap-2">
                      {budgetRanges.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => handleChange("budget", range)}
                          className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                            form.budget === range
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-medium text-white/40 mb-1.5 block">Message *</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell me about your project..."
                      className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-accent/50 transition-colors resize-none ${errors.message ? "border-red-500/50" : "border-white/10"}`}
                    />
                    {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formState === "loading"}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-semibold text-black hover:bg-accent/90 transition-colors shadow-[0_0_25px_rgba(255,215,0,0.2)] disabled:opacity-70"
                    whileHover={formState !== "loading" ? { scale: 1.02, boxShadow: "0 0 35px rgba(255,215,0,0.3)" } : {}}
                    whileTap={formState !== "loading" ? { scale: 0.98 } : {}}
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={14} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
