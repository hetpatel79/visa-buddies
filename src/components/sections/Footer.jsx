import { motion } from "framer-motion";
import LOGO from "@/assets/logo.jpg";
import C from "@/constants/colors";
import { SH } from "@/constants/typography";
import { PHONE_NUMBER, WA_LINK, CONTACT_EMAIL, CONTACT_WEBSITE, OFFICE_ADDRESS } from "@/constants";
import { Stars, WhatsAppIcon } from "@/components/common";

const QUICK_LINKS = [
  { t: "Quick Links", ls: [{ l: "About", id: "about-us" }, { l: "Services", id: "services" }, { l: "Countries", id: "tourist-visa" }] },
  { t: "Services",    ls: [{ l: "Study Visa", id: "services" }, { l: "Work Visa", id: "services" }, { l: "Tourist Visa", id: "tourist-visa" }, { l: "Business Visa", id: "services" }, { l: "PR", id: "services" }] },
];

export default function Footer({ go }) {
  const contactItems = [
    { i: "📍", v: OFFICE_ADDRESS,   href: null },
    { i: "📞", v: PHONE_NUMBER,     href: `tel:${PHONE_NUMBER}` },
    { i: <WhatsAppIcon size={14} />, v: "Chat on WhatsApp", href: WA_LINK, ext: true },
    { i: "📧", v: CONTACT_EMAIL,    href: `mailto:${CONTACT_EMAIL}` },
    { i: "🌐", v: CONTACT_WEBSITE,  href: CONTACT_WEBSITE, ext: true },
  ];

  return (
    <footer id="contact" style={{ background: "#060E20", color: C.white, padding: "64px 24px 28px", position: "relative", overflow: "hidden" }}>
      <Stars count={15} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 48, marginBottom: 48 }} className="g4">
          <div>
            <div style={{ background: "white", borderRadius: 12, padding: 10, display: "inline-block", marginBottom: 16 }}>
              <img src={LOGO} alt="Visa Buddies" style={{ height: 56, display: "block" }} />
            </div>
            <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.75, maxWidth: 240 }}>Your Dream. Our Plan. Better Future. India's trusted partner for international visa guidance.</p>
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              {[{ s: "📘" }, { s: "📸" }, { s: "▶️" }, { s: "💬", href: WA_LINK }].map((it, i) =>
                it.href ? (
                  <motion.a key={i} href={it.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }}
                    style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `1px solid ${C.gold}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, textDecoration: "none" }}>
                    {it.s}
                  </motion.a>
                ) : (
                  <motion.div key={i} whileHover={{ scale: 1.2 }}
                    style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `1px solid ${C.gold}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, opacity: 0.5 }}>
                    {it.s}
                  </motion.div>
                )
              )}
            </div>
          </div>
          {QUICK_LINKS.map((col) => (
            <div key={col.t}>
              <div style={{ ...SH, fontWeight: 700, marginBottom: 18, fontSize: 14, color: C.gold, letterSpacing: "1px" }}>{col.t}</div>
              {col.ls.map((item) => (
                <motion.div key={item.l} onClick={() => go(item.id)} whileHover={{ x: 4, color: C.gold }}
                  style={{ color: "#64748B", fontSize: 14, marginBottom: 10, cursor: "pointer", transition: "color .2s" }}>
                  {item.l}
                </motion.div>
              ))}
            </div>
          ))}
          <div>
            <div style={{ ...SH, fontWeight: 700, marginBottom: 18, fontSize: 14, color: C.gold, letterSpacing: "1px" }}>Contact</div>
            {contactItems.map((it) =>
              it.href ? (
                <motion.a key={it.v} href={it.href} target={it.ext ? "_blank" : undefined} rel={it.ext ? "noopener noreferrer" : undefined}
                  whileHover={{ x: 4, color: C.gold }}
                  style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start", textDecoration: "none" }}>
                  <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1, color: "#64748B" }}>{it.i}</span>
                  <span style={{ color: "#64748B", fontSize: 13, lineHeight: 1.6 }}>{it.v}</span>
                </motion.a>
              ) : (
                <div key={it.v} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{it.i}</span>
                  <span style={{ color: "#64748B", fontSize: 13, lineHeight: 1.6 }}>{it.v}</span>
                </div>
              )
            )}
          </div>
        </div>
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          style={{ height: 1, background: `linear-gradient(to right,transparent,${C.gold}44,transparent)`, transformOrigin: "left", marginBottom: 24 }} />
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "#334155", fontSize: 13 }}>Copyright © 2026 VISA BUDDIES. All Rights Reserved.</span>
          <span style={{ color: "#334155", fontSize: 13 }}>Global Mobility Experts ✦ Made in India</span>
        </div>
      </div>
    </footer>
  );
}
