import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import C from "@/constants/colors";
import { WA_LINK, MARQUEE_ITEMS, TRUST } from "@/constants";
import { useScrollBehavior, useTestimonialCycle, useFormState } from "@/hooks";
import { WhatsAppIcon, Marquee } from "@/components/common";
import {
  Navbar, Hero, TestimonialsSection, ConsultationForm,
  WhyVisaBuddies, VisaCategories, FoundersSection,
  StatsSection, DestinationsSection, ProcessTimeline,
  WhyTrust, FAQSection, Footer,
} from "@/components/sections";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Playfair+Display:wght@400;600;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  section[id], footer[id] { scroll-margin-top: 84px; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${C.navy}; }
  ::-webkit-scrollbar-thumb { background: ${C.gold}; border-radius: 99px; }
  .nav-a { font-size: 13px; font-weight: 600; color: ${C.navy}; cursor: pointer; padding: 4px 0; position: relative; transition: color .2s; white-space: nowrap; }
  .nav-a::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px; background: ${C.gold}; transition: width .25s; }
  .nav-a:hover { color: ${C.gold}; }
  .nav-a:hover::after { width: 100%; }
  .hero-glow { position: absolute; width: 360px; height: 360px; border-radius: 999px; background: radial-gradient(circle, rgba(232,196,106,.24), rgba(200,155,60,.08) 45%, transparent 70%); filter: blur(10px); pointer-events: none; }
  .hero-flight { position: absolute; right: 8%; top: 22%; width: 190px; height: 2px; background: linear-gradient(90deg, transparent, rgba(232,196,106,.75), transparent); transform: rotate(-18deg); opacity: .7; pointer-events: none; }
  .hero-flight::after { content: ''; position: absolute; right: 0; top: -5px; width: 12px; height: 12px; border-top: 2px solid ${C.goldL}; border-right: 2px solid ${C.goldL}; transform: rotate(45deg); }
  @media(max-width: 1100px) {
    .hero-shell { padding: 72px 32px !important; }
    .hero-grid { grid-template-columns: minmax(0,1fr) !important; gap: 52px !important; text-align: center; }
    .hero-copy { max-width: 760px !important; margin: 0 auto; }
    .hero-h { font-size: 56px !important; }
    .hero-sub, .hero-actions, .hero-trust { margin-left: auto !important; margin-right: auto !important; }
    .hero-actions, .hero-trust { justify-content: center !important; }
    .hero-story { max-width: 520px !important; margin: 0 auto !important; }
  }
  @media(max-width: 900px) {
    .hide-mob { display: none !important; }
    .g2, .g3 { grid-template-columns: minmax(0,1fr) !important; }
    .g4 { grid-template-columns: minmax(0,1fr) minmax(0,1fr) !important; }
    .hero-shell { padding: 56px 20px 64px !important; }
    .hero-h { font-size: 40px !important; line-height: 1.08 !important; }
    .hero-sub { font-size: 17px !important; line-height: 1.7 !important; }
    .hero-actions { display: grid !important; grid-template-columns: minmax(0,1fr) !important; width: 100%; }
    .hero-actions > * { width: 100% !important; justify-content: center !important; }
    .hero-story { width: 100% !important; }
    .hero-card { padding: 28px !important; border-radius: 22px !important; }
    .hero-flight { display: none !important; }
  }
`;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled, backTop, heroY, heroOp, scrollYProgress } = useScrollBehavior();
  const storyIdx = useTestimonialCycle(4000);
  const { form, setForm, sent, setSent, errors, setErrors, submitting, submitError, resetForm, handleSubmit } = useFormState();

  const go    = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const goTop = ()   => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: C.white, color: C.text, overflowX: "hidden" }}>
      <style>{GLOBAL_STYLES}</style>

      {/* Scroll progress bar */}
      <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right,${C.gold},${C.goldL},${C.gold})`, transformOrigin: "0%", scaleX: scrollYProgress, zIndex: 300 }} />

      <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} go={go} />

      <Hero go={go} storyIdx={storyIdx} heroY={heroY} heroOp={heroOp} />

      <div style={{ background: C.navy, padding: "3px 0", overflow: "hidden" }}>
        <Marquee items={MARQUEE_ITEMS} speed={7} />
      </div>

      <TestimonialsSection />

      <ConsultationForm
        form={form} setForm={setForm}
        sent={sent} setSent={setSent}
        errors={errors} setErrors={setErrors}
        submitting={submitting}
        submitError={submitError}
        resetForm={resetForm}
        handleSubmit={handleSubmit}
      />

      <WhyVisaBuddies go={go} />
      <VisaCategories go={go} setForm={setForm} />
      <FoundersSection />
      <StatsSection />
      <DestinationsSection go={go} setForm={setForm} />
      <ProcessTimeline />
      <WhyTrust />
      <FAQSection />

      <div style={{ background: C.navy, padding: "24px", overflow: "hidden" }}>
        <Marquee items={TRUST.map((t) => `✦ ${t}`)} speed={5} reverse />
      </div>

      <Footer go={go} />

      {/* WhatsApp float */}
      <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 4px 20px rgba(37,211,102,0.5)", textDecoration: "none" }}>
        <WhatsAppIcon size={28} />
      </motion.a>

      {/* Back to top */}
      <AnimatePresence>
        {backTop && (
          <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={goTop}
            style={{ position: "fixed", bottom: 90, right: 24, zIndex: 999, width: 44, height: 44, borderRadius: "50%", background: C.navy, border: `2px solid ${C.gold}`, color: C.gold, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
