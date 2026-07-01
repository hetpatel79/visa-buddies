import C from "@/constants/colors";
import { SH } from "@/constants/typography";
import { FAQS } from "@/constants";
import { Accordion } from "@/components/common";
import { Reveal, Label } from "@/components/ui";

export default function FAQSection() {
  return (
    <section style={{ padding: "100px 24px", background: C.white }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
          <Label>FAQ</Label>
          <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 12 }}>Frequently Asked Questions</h2>
        </Reveal>
        <Accordion items={FAQS} />
      </div>
    </section>
  );
}
