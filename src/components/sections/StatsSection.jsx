import { motion } from "framer-motion";
import C from "../../constants/colors";
import { STATS } from "../../constants/data";
import { fadeUp, containerV } from "../../utils/animations";
import Stars from "../common/Stars";
import Counter from "../common/Counter";
import Reveal from "../ui/Reveal";
import Label from "../ui/Label";

export default function StatsSection({ SH }) {
  return (
    <section style={{ padding: "80px 24px", background: C.navy, position: "relative", overflow: "hidden" }}>
      <Stars count={20} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.gold}08 1px,transparent 1px),linear-gradient(90deg,${C.gold}08 1px,transparent 1px)`, backgroundSize: "56px 56px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
          <Label>Our Numbers</Label>
          <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.white }}>Our Numbers Speak</h2>
        </Reveal>

        <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }} className="g4">
          {STATS.map((s, i) => (
            <motion.div key={s.l} variants={fadeUp(i * 0.08)} whileHover={{ scale: 1.06 }}
              style={{ textAlign: "center", padding: "28px 16px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: `1px solid ${C.gold}22`, cursor: "default" }}>
              <div style={{ ...SH, fontSize: 46, fontWeight: 900, color: C.gold, textShadow: `0 0 30px ${C.gold}55`, marginBottom: 8 }}>
                <Counter target={s.n} suffix={s.s} />
              </div>
              <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 600, letterSpacing: ".5px" }}>{s.l}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
