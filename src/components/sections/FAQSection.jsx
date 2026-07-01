import C from "../../constants/colors";
import { FAQS } from "../../constants/data";
import Accordion from "../common/Accordion";
import Reveal from "../ui/Reveal";
import Label from "../ui/Label";

export default function FAQSection({ SH }) {
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
