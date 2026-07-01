import C from "@/constants/colors";
import { SH } from "@/constants/typography";
import { VISA_CATEGORIES } from "@/constants";
import { Reveal, Label, GoldBtn } from "@/components/ui";

export default function VisaCategories({ go, setForm }) {
  return (
    <section id="services" style={{ padding: "100px 24px", background: C.white }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
          <Label>Our Specializations</Label>
          <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 12 }}>Visa Categories We Handle</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }} className="g4">
          {VISA_CATEGORIES.map((c, i) => (
            <Reveal key={c.key} delay={i * 0.08}>
              <div style={{ background: C.silver, borderRadius: 18, padding: 30, border: `1px solid ${C.border}`, height: "100%" }}>
                <div style={{ fontSize: 38, marginBottom: 14 }}>{c.icon}</div>
                <h3 style={{ ...SH, fontSize: 18, fontWeight: 800, color: C.navy, marginBottom: 10 }}>{c.title}</h3>
                <p style={{ fontSize: 13.5, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>{c.desc}</p>
                <GoldBtn outline onClick={() => { setForm((f) => ({ ...f, visa: c.visa })); go("assessment"); }} style={{ fontSize: 13, padding: "9px 18px" }}>
                  Get Started
                </GoldBtn>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
