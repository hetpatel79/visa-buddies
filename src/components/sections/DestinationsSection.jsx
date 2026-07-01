import { motion } from "framer-motion";
import C from "../../constants/colors";
import { DESTINATIONS } from "../../constants/data";
import { fadeUp, containerV } from "../../utils/animations";
import Reveal from "../ui/Reveal";
import Label from "../ui/Label";

export default function DestinationsSection({ go, setForm, SH, SUB }) {
  return (
    <section id="tourist-visa" style={{ padding: "100px 24px", background: C.silver }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <Label>Popular Destinations</Label>
          <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 12 }}>Where Do You Want to Go?</h2>
          <p style={{ ...SUB, color: C.slate, fontSize: 16, fontStyle: "italic" }}>Premium visa pathways to the world's most sought-after destinations</p>
        </Reveal>

        <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 20 }} className="g4">
          {DESTINATIONS.map((d, i) => (
            <motion.div key={d.n} variants={fadeUp(i * 0.06)}
              whileHover={{ y: -6, boxShadow: `0 16px 40px ${C.gold}22`, borderColor: C.gold }}
              onClick={() => { const cn = d.formName || d.n; setForm((f) => ({ ...f, countries: f.countries.includes(cn) ? f.countries : [...f.countries, cn] })); go("assessment"); }}
              style={{ background: C.white, borderRadius: 18, padding: "28px 16px", border: `1px solid ${C.border}`, textAlign: "center", cursor: "pointer", transition: "all .25s", minWidth: 0 }}>
              <motion.div whileHover={{ scale: 1.2 }} style={{ fontSize: 42, marginBottom: 14, display: "inline-block" }}>{d.f}</motion.div>
              <div style={{ ...SH, fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 6 }}>{d.n}</div>
              <div style={{ fontSize: 12, color: C.slate, marginBottom: 16 }}>{d.sub}</div>
              <motion.div whileHover={{ background: C.gold, color: C.navy }}
                style={{ display: "inline-block", padding: "8px 12px", borderRadius: 6, border: `1px solid ${C.gold}`, color: C.gold, fontSize: 11, fontWeight: 700, transition: "all .2s", cursor: "pointer", whiteSpace: "normal", lineHeight: 1.4 }}>
                Book Free Consultation →
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
