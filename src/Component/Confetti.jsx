import React, { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = ["#14dbd1", "#FAC898", "#FF6B6B", "#4ADE80", "#FFD93D", "#A78BFA"];

// A small, dependency-free confetti burst built from animated divs.
function Confetti({ count = 24 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 320,
        rotate: Math.random() * 360,
        delay: Math.random() * 0.15,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 6,
      })),
    [count]
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          animate={{ opacity: 0, x: p.x, y: 260, rotate: p.rotate }}
          transition={{ duration: 1.1, delay: p.delay, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: "50%",
            top: "10%",
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;
