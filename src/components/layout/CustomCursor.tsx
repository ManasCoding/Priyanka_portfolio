import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [data-cursor="hover"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [data-cursor="hover"]')) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-accent mix-blend-difference"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isClicking ? 0.6 : 1,
          width: isHovering ? 12 : 12,
          height: isHovering ? 12 : 12,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.1 }}
        style={{ width: 12, height: 12 }}
      />
      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-accent/60"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 2 : isClicking ? 0.8 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.2 }}
        style={{ width: 40, height: 40 }}
      />
    </>
  );
};
