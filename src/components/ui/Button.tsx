import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", magnetic = true, children, ...props }, _ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !buttonRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.2;
      const y = (clientY - (top + height / 2)) * 0.2;
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      if (!magnetic) return;
      setPosition({ x: 0, y: 0 });
    };

    const variants = {
      primary: "bg-accent text-black hover:bg-accent-dark",
      secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md",
      outline: "border border-white/20 text-white hover:bg-white/5",
      ghost: "text-white hover:text-accent",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const Content = (
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full font-medium transition-colors duration-300",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );

    if (magnetic) {
      return (
        <motion.div
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
          className="inline-block"
        >
          {Content}
        </motion.div>
      );
    }

    return Content;
  }
);
Button.displayName = "Button";
