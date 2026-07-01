import { useRef } from "react";
import { motion } from "framer-motion";
import C from "../../constants/colors";

export default function Stars({ count = 30 }) {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      id:    i,
      x:     Math.random() * 100,
      y:     Math.random() * 100,
      s:     Math.random() * 2 + 0.5,
      d:     Math.random() * 4 + 3,
      delay: Math.random() * 4,
    }))
  );

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {stars.current.map((s) => (
        <motion.div
          key={s.id}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
          transition={{ duration: s.d, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, borderRadius: "50%", background: C.gold }}
        />
      ))}
    </div>
  );
}
