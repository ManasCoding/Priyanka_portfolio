import { motion } from "framer-motion";
import { ExternalLink, Mail, Code2, Rss, ArrowUp } from "lucide-react";

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const socialLinks = [
  { icon: Code2, href: "#", label: "GitHub" },
  { icon: Rss, href: "#", label: "Twitter" },
  { icon: ExternalLink, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Dribbble" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
];

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/10 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold text-white mb-4">
              Priyanka<span className="text-accent">.</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Crafting beautiful digital experiences with purpose, precision, and passion.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-white/40 hover:text-accent transition-colors"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-5">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/60 hover:text-accent transition-colors text-sm relative group inline-flex items-center gap-1"
                  >
                    <span className="h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-5">
              Get In Touch
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:pandapriyanka181@gmail.com"
                className="text-white/60 hover:text-accent transition-colors text-sm"
              >
                pandapriyanka181@gmail.com
              </a>
              <p className="text-white/40 text-sm">Available for freelance projects</p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs text-accent">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                Open to Work
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Priyanka Panda. Designed & Developed by Manas Kumar Gumansingh
          </p>
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-white/40 hover:text-accent transition-colors"
            whileHover={{ y: -2 }}
          >
            Back to top
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-1" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
