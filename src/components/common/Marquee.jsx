import { motion, useMotionValue, useAnimationFrame, useTransform, wrap } from "framer-motion";
import C from "@/constants/colors";

export default function Marquee({ items, speed = 30, reverse = false }) {
  const x = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    const dir = reverse ? 1 : -1;
    x.set(wrap(-50, 0, (x.get() + dir * (delta / 1000) * speed) / 100 * 100));
  });
  const xPct    = useTransform(x, (v) => `${v}%`);
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", display: "flex", width: "100%" }}>
      <motion.div style={{ display: "flex", gap: 0, x: xPct }}>
        {doubled.map((item, i) => (
          <div key={i} style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 20px", borderRight: `1px solid ${C.gold}22`, whiteSpace: "nowrap", fontSize: 13, fontWeight: 600, color: C.gold, letterSpacing: ".3px" }}>
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
