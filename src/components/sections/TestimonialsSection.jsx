import { motion } from "framer-motion";
import C from "../../constants/colors";
import { TESTIMONIALS } from "../../constants/data";
import { fadeUp, containerV } from "../../utils/animations";
import Reveal from "../ui/Reveal";
import Label from "../ui/Label";

export default function TestimonialsSection({ SH, SUB }) {
  return (
    <section id="success-stories" style={{ padding: "100px 24px", background: C.silver }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <Label>Success Stories</Label>
          <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 12 }}>What Our Clients Say</h2>
        </Reveal>

        <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="g3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name} variants={fadeUp(i * 0.09)}
              whileHover={{ y: -6, boxShadow: `0 16px 40px ${C.gold}18`, borderColor: C.gold }}
              style={{ background: C.white, borderRadius: 20, padding: 30, border: `1px solid ${C.border}`, transition: "all .25s" }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
                {[...Array(5)].map((_, j) => (
                  <motion.span key={j}
                    animate={{ textShadow: ["0 0 0px transparent", `0 0 10px ${C.gold}88`, "0 0 0px transparent"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: j * 0.15 + i * 0.3 }}
                    style={{ color: C.gold, fontSize: 16 }}>★</motion.span>
                ))}
              </div>
              <motion.div animate={{ rotate: [0, 3, -3, 0] }} transition={{ duration: 5, repeat: Infinity, delay: i }}
                style={{ fontSize: 36, color: C.gold, lineHeight: 1, marginBottom: 10, display: "inline-block", fontFamily: "Georgia,serif" }}>
                "
              </motion.div>
              <p style={{ ...SUB, fontSize: 14.5, color: C.text, lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                <div style={{ width: 44, height: 44, background: `linear-gradient(135deg,${C.navy},${C.gold})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontSize: 14, fontWeight: 800, flexShrink: 0 }}>
                  {t.av}
                </div>
                <div>
                  <div style={{ ...SH, fontWeight: 700, fontSize: 14, color: C.navy }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: C.slate }}>{t.visa}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
