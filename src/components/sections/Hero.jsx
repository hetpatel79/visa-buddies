import { motion, AnimatePresence } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import C from "@/constants/colors";
import { SH, SUB } from "@/constants/typography";
import { HERO_WORDS, TESTIMONIALS, PHONE_NUMBER, WA_LINK } from "@/constants";
import { Stars, Typewriter, WhatsAppIcon } from "@/components/common";
import { GoldBtn } from "@/components/ui";

export default function Hero({ go, storyIdx, heroY, heroOp }) {
  return (
    <section id="home" style={{ position: "relative", minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center", background: `linear-gradient(160deg,${C.navy} 0%,#0D1F45 60%,#1A0A3C 100%)`, overflow: "hidden", paddingTop: 72 }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.85 }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg,${C.navy}99 0%,#0D1F4580 60%,#1A0A3C99 100%)` }} />
      <Stars count={40} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.gold}06 1px,transparent 1px),linear-gradient(90deg,${C.gold}06 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <motion.div className="hero-glow" animate={{ x: [0, 70, 0], y: [0, -45, 0], opacity: [0.45, 0.75, 0.45] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} style={{ left: "8%", bottom: "10%", zIndex: 1 }} />
      <motion.div className="hero-glow" animate={{ x: [0, -55, 0], y: [0, 50, 0], opacity: [0.35, 0.65, 0.35] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} style={{ right: "8%", top: "14%", zIndex: 1 }} />
      <motion.div className="hero-flight" animate={{ x: [-28, 18, -28], opacity: [0.35, 0.9, 0.35] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

      <motion.div className="hero-shell" style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 60px", position: "relative", zIndex: 2, y: heroY, opacity: heroOp, width: "100%" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", alignItems: "center", gap: 80 }}>
          {/* Copy */}
          <div className="hero-copy" style={{ maxWidth: 650 }}>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 99, border: `1px solid ${C.gold}55`, background: "rgba(255,255,255,0.08)", color: C.goldL, fontSize: 12, fontWeight: 800, letterSpacing: "1px", marginBottom: 30 }}>
                <span>⭐⭐⭐⭐⭐</span> Trusted by Thousands Across India
              </div>
            </motion.div>
            <motion.h1 className="hero-h" initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ ...SH, fontSize: 70, fontWeight: 900, lineHeight: 1.1, color: C.white, marginBottom: 22 }}>
              Your Gateway to
              <div style={{ height: "1.15em", display: "block", overflow: "hidden" }}>
                <span style={{ background: `linear-gradient(135deg,${C.gold},${C.goldL})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block", whiteSpace: "nowrap" }}>
                  <Typewriter words={HERO_WORDS} speed={85} pause={2200} />
                </span>
              </div>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}
              className="hero-sub" style={{ ...SUB, fontSize: 20, color: "#D5DFEC", lineHeight: 1.75, marginBottom: 38, maxWidth: 650, fontStyle: "italic" }}>
              Study, Work, Travel & Settle Abroad with confidence through expert visa guidance and personalized support.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.38 }}
              className="hero-actions" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }}>
              <GoldBtn onClick={() => go("assessment")} style={{ fontSize: 16, padding: "0 30px", height: 64, borderRadius: 16, fontWeight: 800 }}>Book Free Consultation</GoldBtn>
              <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", gap: 8, height: 64, padding: "0 26px", borderRadius: 16, background: "#25D366", color: "white", fontWeight: 800, fontSize: 15, textDecoration: "none", fontFamily: "Poppins,sans-serif" }}>
                <WhatsAppIcon /> Chat on WhatsApp
              </motion.a>
              <motion.a href={`tel:${PHONE_NUMBER}`} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", gap: 8, height: 64, padding: "0 26px", borderRadius: 16, border: `1.5px solid ${C.gold}66`, background: "rgba(255,255,255,0.06)", color: C.goldL, fontWeight: 800, fontSize: 15, textDecoration: "none", fontFamily: "Poppins,sans-serif", backdropFilter: "blur(14px)" }}>
                Call Expert
              </motion.a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="hero-trust" style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              {["Licensed Consultants", "Transparent Process", "End-to-End Support"].map((b) => (
                <span key={b} style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.goldL, fontSize: 14, fontWeight: 700 }}>
                  <span style={{ width: 18, height: 18, borderRadius: "50%", background: `${C.gold}22`, border: `1px solid ${C.gold}55`, display: "inline-flex", alignItems: "center", justifyContent: "center", color: C.gold, fontSize: 11 }}>✓</span>
                  {b}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Story card */}
          <motion.div className="hero-story" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} style={{ width: "100%", maxWidth: 480, justifySelf: "end" }}>
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="hero-card"
              style={{ background: "linear-gradient(145deg,rgba(255,255,255,0.16),rgba(255,255,255,0.055))", backdropFilter: "blur(24px)", border: `1px solid ${C.gold}33`, borderRadius: 28, padding: 40, boxShadow: "0 38px 95px rgba(0,0,0,.52)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 1, borderRadius: 27, background: `linear-gradient(135deg,${C.gold}18,transparent 34%,rgba(255,255,255,.08) 68%,transparent)`, pointerEvents: "none" }} />
              <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between", marginBottom: 22 }}>
                <span style={{ ...SH, color: C.goldL, fontSize: 13, fontWeight: 900, letterSpacing: "2px", flex: 1 }}>LATEST SUCCESS STORY</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 999, background: "rgba(62,213,152,.13)", border: "1px solid rgba(62,213,152,.32)", color: "#8DF0C6", fontSize: 12, fontWeight: 800 }}>Approved</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={storyIdx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.5 }}
                  style={{ background: "rgba(11,45,92,.36)", border: `1px solid ${C.gold}36`, borderRadius: 20, padding: "28px 26px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <div style={{ width: 58, height: 58, borderRadius: "50%", background: `linear-gradient(135deg,${C.gold},${C.goldL})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: C.navy, flexShrink: 0 }}>
                      {TESTIMONIALS[storyIdx].av}
                    </div>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "white", lineHeight: 1.2 }}>{TESTIMONIALS[storyIdx].name}</div>
                      <div style={{ fontSize: 13, color: C.goldL, fontWeight: 800, marginTop: 4 }}>{TESTIMONIALS[storyIdx].visa}</div>
                    </div>
                  </div>
                  <div style={{ color: C.goldL, letterSpacing: 1, fontSize: 15, marginBottom: 14 }}>★★★★★</div>
                  <div style={{ fontSize: 15.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.75 }}>"{TESTIMONIALS[storyIdx].text}"</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 22 }}>
                    <div style={{ padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,.08)", color: C.goldL, fontSize: 12, fontWeight: 800 }}>Visa Approved</div>
                    <div style={{ padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,.08)", color: C.goldL, fontSize: 12, fontWeight: 800 }}>June 2026</div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 12 }}>
                {TESTIMONIALS.map((_, i) => (
                  <span key={i} style={{ width: i === storyIdx ? 16 : 6, height: 6, borderRadius: 99, background: i === storyIdx ? C.gold : `${C.gold}40`, transition: "all .3s" }} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 70" fill="none" style={{ display: "block" }}>
          <path d="M0 70L1440 70L1440 25C1200 70 900 5 720 25C540 45 240 5 0 25Z" fill={C.white} />
        </svg>
      </div>
    </section>
  );
}
