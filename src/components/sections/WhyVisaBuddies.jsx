import { motion } from "framer-motion";
import C from "../../constants/colors";
import { SERVICES } from "../../constants/data";
import { fadeUp, containerV } from "../../utils/animations";
import Reveal from "../ui/Reveal";
import Label from "../ui/Label";
import GoldBtn from "../ui/GoldBtn";

export default function WhyVisaBuddies({ go, SH }) {
  return (
    <section id="about-us" style={{ padding: "100px 24px", background: C.white }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="g2">
          <Reveal>
            <Label>Why Visa Buddies?</Label>
            <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 20, lineHeight: 1.2 }}>
              More Than a Consultancy—<br />Your Global Mobility Partner.
            </h2>
            <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.85, marginBottom: 32 }}>
              Whether you're planning to study in Canada, secure a work permit in New Zealand, explore Australia, or travel the world, VISA BUDDIES simplifies every step of your journey. From documentation to visa approval, our experts are committed to making your international goals achievable with confidence and transparency.
            </p>
            <GoldBtn onClick={() => go("assessment")}>Start Your Journey</GoldBtn>
          </Reveal>

          <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp(i * 0.06)}
                whileHover={{ y: -5, boxShadow: `0 12px 32px ${C.gold}22`, borderColor: C.gold }}
                style={{ background: C.silver, borderRadius: 16, padding: 22, border: `1px solid ${C.border}`, transition: "border .25s,box-shadow .25s", cursor: "default" }}>
                <motion.div whileHover={{ scale: 1.2, rotate: 8 }} style={{ fontSize: 30, marginBottom: 10, display: "inline-block" }}>{s.icon}</motion.div>
                <div style={{ ...SH, fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: C.slate, lineHeight: 1.6 }}>{s.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
