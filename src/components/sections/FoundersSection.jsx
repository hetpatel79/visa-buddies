import { motion } from "framer-motion";
import LOGO from "../../assets/logo.jpg";
import C from "../../constants/colors";
import { FOUNDERS } from "../../constants/data";
import Reveal from "../ui/Reveal";
import Label from "../ui/Label";

export default function FoundersSection({ SH }) {
  return (
    <section style={{ padding: "100px 24px", background: C.silver }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
          <Label>Leadership</Label>
          <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 12 }}>Meet Our Founders</h2>
          <p style={{ fontSize: 15, color: C.slate, maxWidth: 560, margin: "0 auto" }}>The vision and leadership driving Visa Buddies forward.</p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="g2">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, boxShadow: `0 16px 40px ${C.gold}22`, borderColor: C.gold }}
                style={{ background: C.white, borderRadius: 20, padding: "36px 28px", border: `1px solid ${C.border}`, textAlign: "center", transition: "all .25s" }}>
                <div style={{ width: 84, height: 84, borderRadius: "50%", background: `linear-gradient(135deg,${C.gold},${C.goldL})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: C.navy, margin: "0 auto 18px" }}>
                  {f.av}
                </div>
                <div style={{ ...SH, fontSize: 19, fontWeight: 800, color: C.navy, marginBottom: 6 }}>{f.name}</div>
                <div style={{ fontSize: 13, color: C.gold, fontWeight: 700, letterSpacing: ".3px" }}>{f.role}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
