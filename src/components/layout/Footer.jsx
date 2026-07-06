import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const TwitterIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
  </svg>
);

const MailIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"/>
  </svg>
);

const socialLinks = [
  { icon: LinkedinIcon, href: "#", label: "LinkedIn", color: "text-[#0077b5]", border: "border-[#0077b5]/30", hover: "hover:bg-[#0077b5]/10 hover:border-[#0077b5] hover:shadow-[0_0_15px_rgba(0,119,181,0.3)]" },
  { icon: GithubIcon, href: "#", label: "GitHub", color: "text-white", border: "border-white/30", hover: "hover:bg-white/10 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]" },
  { icon: TwitterIcon, href: "#", label: "Twitter", color: "text-[#1DA1F2]", border: "border-[#1DA1F2]/30", hover: "hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2] hover:shadow-[0_0_15px_rgba(29,161,242,0.3)]" },
  { icon: MailIcon, href: "mailto:pandapriyanka181@gmail.com", label: "Email", color: "text-[#EA4335]", border: "border-[#EA4335]/30", hover: "hover:bg-[#EA4335]/10 hover:border-[#EA4335] hover:shadow-[0_0_15px_rgba(234,67,53,0.3)]" },
];

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-background py-16 px-6 overflow-hidden">
      {/* Background ambient lighting similar to the image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 h-[300px] w-[80%] rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="relative rounded-3xl bg-[#080808] border border-white/5 shadow-[0_0_40px_rgba(255,215,0,0.05)] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Top border glowing highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
          {/* Bottom border glowing highlight */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 p-8 md:p-12">
            
            {/* Left Section */}
            <div className="flex-1 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8 w-full">
              {/* Circular Icon */}
              <div className="relative flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-full border-[0.5px] border-accent/30">
                <div className="w-5 h-5 bg-accent rounded-full shadow-[0_0_20px_rgba(255,215,0,1)]" />
                {/* Orbit dots */}
                <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full opacity-50" />
                <div className="absolute bottom-4 right-3 w-1.5 h-1.5 bg-accent rounded-full opacity-80" />
                <div className="absolute -top-1 right-8 w-0.5 h-0.5 bg-white rounded-full opacity-60" />
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center w-full">
                <h3 className="text-white text-lg md:text-xl font-medium tracking-wide">
                  Let's Build Something <span className="text-accent font-semibold">Amazing Together</span>
                </h3>
                <p className="text-white/50 text-sm mt-2">
                  Crafting digital experiences that make impact.
                </p>
                <div className="w-full h-px bg-white/5 my-5" />
                <p className="text-white/40 text-xs tracking-wide leading-relaxed">
                  © 2026 Priyanka Panda. Designed & Developed by{' '}
                  <span className="text-accent text-sm md:text-base font-semibold whitespace-nowrap">
                    Manas Kumar Gumansingh
                  </span>
                </p>
              </div>
            </div>

            {/* Vertical Divider (Hidden on small screens) */}
            <div className="hidden lg:block w-px h-24 bg-white/5" />

            {/* Middle Section: Socials */}
            <div className="flex flex-col items-center md:items-start gap-4 shrink-0">
              <span className="text-white/80 text-sm tracking-wide">Stay Connected</span>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label, color, border, hover }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`w-10 h-10 rounded-full border bg-white/[0.02] flex items-center justify-center transition-all duration-300 ${color} ${border} ${hover}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Vertical Divider (Hidden on small screens) */}
            <div className="hidden lg:block w-px h-24 bg-white/5" />

            {/* Right Section: Back to Top */}
            <div className="flex items-center gap-4 shrink-0 mt-4 lg:mt-0">
              <span className="text-accent text-sm font-medium tracking-wide">Back to top</span>
              <motion.button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full border border-accent/30 bg-accent/[0.02] flex items-center justify-center text-accent hover:bg-accent/10 hover:border-accent/60 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] transition-all duration-300 group"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to top"
              >
                <ArrowUp size={18} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-1" />
              </motion.button>
            </div>

          </div>
        </motion.div>
      </div>
    </footer>
  );
};
