import { motion } from "framer-motion";
import LOGO from "../../assets/logo.jpg";
import C from "../../constants/colors";
import { TRUST_POINTS } from "../../constants/data";
import Stars from "../common/Stars";
import Reveal from "../ui/Reveal";
import Label from "../ui/Label";

export default function WhyTrust({ SH }) {
  return (
    <section style={{ padding: "100px 24px", background: C.navy, position: "relative", overflow: "hidden" }}>
      <Stars count={25} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="g2">
          <Reveal>
            <Label>Why Choose Us</Label>
            <h2 style={{ ...SH, fontSize: 36, fontWeight: 900, color: C.white, marginBottom: 24, lineHeight: 1.2 }}>
              Why Clients Trust VISA BUDDIES
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {TRUST_POINTS.map((item, i) => (
                <motion.div key={item}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  whileHover={{ x: 6 }}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: `1px solid ${C.gold}18` }}>
                  <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} style={{ color: C.gold, fontSize: 18 }}>✔</motion.span>
                  <span style={{ color: C.white, fontSize: 14, fontWeight: 500 }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 24, padding: 36, border: `1px solid ${C.gold}22`, textAlign: "center" }}>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "white", borderRadius: 16, padding: 16, display: "inline-block", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
                <img src={LOGO} alt="Visa Buddies" style={{ width: "100%", maxWidth: 220, display: "block" }} />
              </motion.div>
              <div style={{ ...SH, color: C.gold, fontSize: 13, letterSpacing: "2px", marginTop: 16 }}>YOUR DREAM. OUR PLAN.</div>
              <div style={{ ...SH, color: C.goldL, fontSize: 11, letterSpacing: "2px", marginTop: 4 }}>BETTER FUTURE.</div>
              <div style={{ marginTop: 24, padding: "14px", background: `${C.gold}15`, borderRadius: 12, border: `1px solid ${C.gold}30` }}>
                <div style={{ color: C.gold, fontWeight: 700, fontSize: 13 }}>Global Mobility Experts</div>
                <div style={{ color: "#94A3B8", fontSize: 12, marginTop: 4 }}>Expert Guidance • Transparent Process</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
