import { motion } from "framer-motion";
import C from "../../constants/colors";
import { TIMELINE } from "../../constants/data";
import Reveal from "../ui/Reveal";
import Label from "../ui/Label";

export default function ProcessTimeline({ SH, SUB }) {
  return (
    <section style={{ padding: "100px 24px", background: C.white }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <Label>Our Services</Label>
          <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 12 }}>Step-by-Step Visa Journey</h2>
          <p style={{ ...SUB, color: C.slate, fontSize: 15, fontStyle: "italic" }}>From first conversation to boarding the flight — we're with you every step.</p>
        </Reveal>

        <div style={{ position: "relative", paddingLeft: 40 }}>
          <div style={{ position: "absolute", left: 16, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom,${C.gold},${C.goldD})` }} />
          {TIMELINE.map((step, i) => (
            <motion.div key={step}
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 28, position: "relative" }}>
              <motion.div whileHover={{ scale: 1.15, boxShadow: `0 0 20px ${C.gold}66` }}
                style={{ position: "absolute", left: -32, width: 32, height: 32, borderRadius: "50%", background: C.navy, border: `3px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.gold, fontSize: 12, fontWeight: 900, flexShrink: 0, zIndex: 1 }}>
                {String(i + 1).padStart(2, "0")}
              </motion.div>
              <motion.div whileHover={{ x: 4, borderColor: C.gold, boxShadow: `0 4px 20px ${C.gold}18` }}
                style={{ flex: 1, background: C.silver, borderRadius: 14, padding: "18px 22px", border: `1px solid ${C.border}`, marginLeft: 16, transition: "all .25s" }}>
                <span style={{ ...SH, fontSize: 15, fontWeight: 700, color: C.navy }}>{step}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
