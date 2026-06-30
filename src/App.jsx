import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useAnimationFrame, wrap } from "framer-motion";
import LOGO from "./assets/logo.jpg";
import heroBg from "./assets/hero-bg.jpg";

// ── Brand Colors (from brief) ──────────────────────────────────
const C = {
  navy:   "#0B2D5C",
  gold:   "#C89B3C",
  goldL:  "#E8C46A",
  goldD:  "#9A7420",
  white:  "#FFFFFF",
  silver: "#F5F7FA",
  text:   "#2B2B2B",
  slate:  "#64748B",
  border: "#E2E8F0",
};

// ── Variants ───────────────────────────────────────────────────
const fadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: d } },
});
const containerV = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

// ── Scroll Reveal ──────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp(delay)} style={style}>
      {children}
    </motion.div>
  );
}

// ── Typewriter ─────────────────────────────────────────────────
function Typewriter({ words, speed = 80, pause = 2000 }) {
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [txt, setTxt] = useState("");
  useEffect(() => {
    const t = setTimeout(() => {
      const w = words[wi];
      if (!del) {
        setTxt(w.slice(0, ci + 1));
        if (ci + 1 === w.length) { setTimeout(() => setDel(true), pause); return; }
        setCi((p) => p + 1);
      } else {
        setTxt(w.slice(0, ci - 1));
        if (ci - 1 === 0) { setDel(false); setWi((p) => (p + 1) % words.length); setCi(0); return; }
        setCi((p) => p - 1);
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);
  return (
    <span>
      {txt}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }} style={{ color: C.gold }}>|</motion.span>
    </span>
  );
}

// ── Animated Counter ───────────────────────────────────────────
function Counter({ target, suffix = "" }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(target.replace(/\D/g, ""));
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const step = Math.ceil(num / 60);
    const t = setInterval(() => { s += step; if (s >= num) { setV(num); clearInterval(t); } else setV(s); }, 20);
    return () => clearInterval(t);
  }, [inView, num]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

// ── Marquee ────────────────────────────────────────────────────
function Marquee({ items, speed = 30, reverse = false }) {
  const x = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    const dir = reverse ? 1 : -1;
    x.set(wrap(-50, 0, (x.get() + dir * (delta / 1000) * speed) / 100 * 100));
  });
  const xPct = useTransform(x, (v) => `${v}%`);
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", display: "flex", width: "100%" }}>
      <motion.div style={{ display: "flex", gap: 0, x: xPct }}>
        {doubled.map((item, i) => (
          <div key={i} style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 20px", borderRight: `1px solid ${C.gold}22`, whiteSpace: "nowrap", fontSize: 13, fontWeight: 600, color: C.gold, letterSpacing: ".3px" }}>
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Stars ──────────────────────────────────────────────────────
function Stars({ count = 30 }) {
  const stars = useRef(Array.from({ length: count }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, s: Math.random() * 2 + 0.5, d: Math.random() * 4 + 3, delay: Math.random() * 4 })));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {stars.current.map((s) => (
        <motion.div key={s.id} animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }} transition={{ duration: s.d, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, borderRadius: "50%", background: C.gold }} />
      ))}
    </div>
  );
}

// ── Gold Shimmer Button ────────────────────────────────────────
const PHONE_NUMBER = "+918160050554";
const WA_NUMBER = "918160050554";
const WA_MSG = "Hi Visa Buddies! I'm interested in visa consultation services. Could you please share more details?";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`;

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor"><path d="M16.001 3C9.097 3 3.5 8.597 3.5 15.5c0 2.42.687 4.682 1.878 6.604L3 29l7.073-2.34A12.43 12.43 0 0 0 16 28.5c6.904 0 12.5-5.597 12.5-12.5S22.905 3 16.001 3zm0 22.7c-2.05 0-3.974-.575-5.609-1.572l-.402-.24-4.198 1.39 1.41-4.092-.262-.42A10.18 10.18 0 0 1 5.3 15.5c0-5.91 4.79-10.7 10.7-10.7s10.7 4.79 10.7 10.7-4.79 10.7-10.7 10.7zm5.86-7.99c-.32-.16-1.9-.94-2.196-1.045-.295-.108-.51-.16-.724.16-.214.32-.83 1.045-1.018 1.26-.187.213-.374.24-.694.08-.32-.16-1.352-.498-2.575-1.587-.952-.85-1.595-1.9-1.782-2.22-.187-.32-.02-.493.14-.652.144-.144.32-.374.48-.56.16-.187.213-.32.32-.534.107-.214.053-.4-.027-.56-.08-.16-.724-1.745-.992-2.39-.262-.628-.528-.543-.724-.553l-.617-.011c-.214 0-.56.08-.853.4-.293.32-1.118 1.092-1.118 2.664s1.145 3.09 1.305 3.303c.16.213 2.254 3.44 5.46 4.825.763.33 1.358.527 1.822.674.766.244 1.463.21 2.014.127.614-.092 1.9-.776 2.168-1.526.267-.75.267-1.39.187-1.526-.08-.135-.293-.213-.613-.373z"/></svg>
  );
}

function GoldBtn({ children, onClick, style = {}, outline = false }) {
  return (
    <motion.button whileHover={{ scale: 1.05, boxShadow: `0 8px 30px ${C.gold}66` }} whileTap={{ scale: 0.96 }}
      onClick={onClick}
      style={{
        background: outline ? "transparent" : `linear-gradient(135deg,${C.gold},${C.goldL},${C.gold})`,
        backgroundSize: "200% 200%",
        color: outline ? C.gold : C.navy,
        border: `2px solid ${C.gold}`,
        padding: "13px 28px", borderRadius: 8, fontSize: 15, fontWeight: 700,
        cursor: "pointer", fontFamily: "Poppins,sans-serif",
        ...style,
      }}>
      <motion.span animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} transition={{ duration: 3, repeat: Infinity }} style={{ display: "block" }}>
        {children}
      </motion.span>
    </motion.button>
  );
}

// ── Section Label ──────────────────────────────────────────────
function Label({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 99, border: `1px solid ${C.gold}44`, background: `${C.gold}10`, color: C.gold, fontSize: 12, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, display: "inline-block" }} />
      {children}
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────
const NAV = ["Home", "About Us", "Study Abroad", "Work Visa", "Tourist Visa", "Business Visa", "PR", "Success Stories", "Contact"];
const NAV_TARGET = { "Study Abroad": "services", "Work Visa": "services", "Business Visa": "services", "PR": "services" };
const SERVICES = [
  { icon: "🎓", title: "Student Visa", desc: "Expert guidance from university selection to visa approval." },
  { icon: "💼", title: "Work Visa", desc: "Work permit pathways for NZ, Australia, UK, Europe & more." },
  { icon: "🌍", title: "Tourist Visa", desc: "Hassle-free travel visa processing for 50+ countries." },
  { icon: "🏢", title: "Business Visa", desc: "Investor, entrepreneur, and business visitor visas." },
  { icon: "🛂", title: "Permanent Residency", desc: "PR pathways for Canada, Australia, NZ, and UK." },
  { icon: "📄", title: "Documentation", desc: "Complete document preparation and review support." },
];
const STATS = [
  { n: "10", s: "+", l: "Destination Countries" },
  { n: "5000", s: "+", l: "Applications Processed" },
  { n: "98", s: "%", l: "Visa Success Rate" },
  { n: "24", s: "/7", l: "Support Available" },
];
const DESTINATIONS = [
  { f: "🇨🇦", n: "Canada", sub: "Study • Work • PR" },
  { f: "🇦🇺", n: "Australia", sub: "Study • Work • Migrate" },
  { f: "🇳🇿", n: "New Zealand", sub: "Work • PR • Lifestyle" },
  { f: "🇬🇧", n: "United Kingdom", sub: "Study • Work • Settle", formName: "UK" },
  { f: "🇺🇸", n: "USA", sub: "Study • Business • Travel" },
  { f: "🇩🇪", n: "Germany", sub: "Work • Engineering • Tech" },
  { f: "🇮🇪", n: "Ireland", sub: "Tech • Study • Work" },
  { f: "🇸🇬", n: "Singapore", sub: "Business • Finance • Tech" },
];
const TIMELINE = ["Free Consultation", "Profile Evaluation", "Document Preparation", "Application Submission", "Visa Filing", "Interview Guidance", "Visa Approval", "Fly Abroad 🎉"];
const POPULAR_COUNTRIES = ["USA", "Canada", "UK", "Australia", "New Zealand"];
const EUROPE_COUNTRIES = ["Germany", "Hungary", "Poland", "France", "Netherlands", "Ireland"];
const VISA_TYPES = [{ v: "pr", l: "PR Visa" }, { v: "student", l: "Student Visa" }, { v: "work", l: "Work Permit" }, { v: "tourist", l: "Tourist Visa" }, { v: "business", l: "Business Visa" }, { v: "other", l: "Other Visa" }];

const TESTIMONIALS = [
  { name: "Rahul Sharma", visa: "Canada Student Visa", av: "RS", text: "The entire process was smooth. VISA BUDDIES handled everything professionally." },
  { name: "Priya Patel", visa: "New Zealand Work Visa", av: "PP", text: "They explained every step clearly and were always available to answer questions." },
  { name: "Aman Singh", visa: "Australia Tourist Visa", av: "AS", text: "I received my visa on time with complete guidance from the team." },
];
const FAQS = [
  { q: "How long does a Student Visa take?", a: "Processing times vary by country and institution. We provide a detailed timeline during your free consultation based on your specific destination and intake." },
  { q: "Do you help with SOP writing?", a: "Yes! Our team provides professional SOP (Statement of Purpose) and LOR guidance to strengthen your application." },
  { q: "Can I apply for PR after study?", a: "Absolutely. Many countries like Canada, Australia, and New Zealand offer post-study PR pathways. We guide you from day one with this long-term goal in mind." },
  { q: "What documents are required?", a: "Requirements vary by visa type and destination. We provide a personalised document checklist after reviewing your profile." },
  { q: "Do you provide interview preparation?", a: "Yes. For visa categories that require interviews, our consultants provide mock sessions and comprehensive preparation support." },
];
const MARQUEE_ITEMS = ["🇨🇦 Canada PR", "🇦🇺 Australia Visa", "🇳🇿 New Zealand Work", "🇬🇧 UK Skilled Worker", "🇺🇸 USA Student", "🇩🇪 Germany Work", "🇸🇬 Singapore Business", "🇮🇪 Ireland Tech Visa", "Tourist Visa", "Business Visa", "Student Visa", "Work Permit"];
const TRUST = ["Expert Guidance", "Licensed Consultants", "Transparent Process", "End-to-End Support", "Dedicated Case Manager", "High Success Rate"];
// ── Accordion ──────────────────────────────────────────────────
function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((item, i) => (
        <div key={i} style={{ border: `1px solid ${open === i ? C.gold : C.border}`, borderRadius: 12, overflow: "hidden", transition: "border .25s" }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", background: open === i ? `${C.gold}08` : "white", border: "none", cursor: "pointer", fontFamily: "Poppins,sans-serif", fontSize: 15, fontWeight: 600, color: C.navy, textAlign: "left", gap: 12 }}>
            {item.q}
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0, fontSize: 20, color: C.gold, fontWeight: 300, lineHeight: 1 }}>+</motion.span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}>
                <div style={{ padding: "0 22px 18px", fontSize: 14.5, color: C.slate, lineHeight: 1.75, borderTop: `1px solid ${C.border}` }}>{item.a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────
export default function App(){
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [backTop, setBackTop] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", country: "", visa: "", msg: "", consultType: "call", date: "", time: "", countries: [], otherCountry: "" });
  const [sent, setSent] = useState(false);
  const [storyIdx, setStoryIdx] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -70]);
  const heroOp = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 60); setBackTop(window.scrollY > 400); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setStoryIdx((i) => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const SH = { fontFamily: "'Cinzel',serif" };
  const SUB = { fontFamily: "'Playfair Display',serif" };
  const BODY = { fontFamily: "'Poppins',sans-serif" };

  return (
    <div style={{ ...BODY, background: C.white, color: C.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Playfair+Display:wght@400;600;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        section[id],footer[id]{scroll-margin-top:84px;}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:${C.navy}}
        ::-webkit-scrollbar-thumb{background:${C.gold};border-radius:99px}
        .nav-a{font-size:13px;font-weight:600;color:${C.navy};cursor:pointer;padding:4px 0;position:relative;transition:color .2s;white-space:nowrap;}
        .nav-a::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:2px;background:${C.gold};transition:width .25s;}
        .nav-a:hover{color:${C.gold};}.nav-a:hover::after{width:100%;}
        @media(max-width:900px){
          .hide-mob{display:none!important;}
          .g2{grid-template-columns:1fr!important;}
          .g3{grid-template-columns:1fr!important;}
          .g4{grid-template-columns:1fr 1fr!important;}
          .hero-h{font-size:34px!important;}
          .hf{flex-direction:column!important;gap:36px!important;}
          .hero-story{order:-1;margin-bottom:8px;}
        }
      `}</style>

      {/* Scroll Progress */}
      <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right,${C.gold},${C.goldL},${C.gold})`, transformOrigin: "0%", scaleX: scrollYProgress, zIndex: 300 }} />

      {/* ── NAV ── */}
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: scrolled ? "rgba(255,255,255,0.96)" : "white", backdropFilter: "blur(16px)", boxShadow: scrolled ? "0 2px 28px rgba(0,0,0,0.09)" : "0 1px 0 #E2E8F0", transition: "all .3s", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <motion.div whileHover={{ scale: 1.03 }} style={{ cursor: "default", flexShrink: 0 }}>
            <img src={LOGO} alt="Visa Buddies" style={{ height: 52, width: "auto", objectFit: "contain" }} />
          </motion.div>
          <div className="hide-mob" style={{ display: "flex", gap: 20, alignItems: "center", overflow: "hidden" }}>
            {["Home", "About Us", "Study Abroad", "Work Visa", "Tourist Visa", "Success Stories", "Contact"].map((l) => (
              <span key={l} className="nav-a" onClick={() => go(NAV_TARGET[l] || l.toLowerCase().replace(/ /g, "-"))}>{l}</span>
            ))}
          </div>
          <div className="hide-mob" style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
            <GoldBtn onClick={() => go("assessment")} style={{ padding: "10px 18px", fontSize: 13 }}>Book Free Consultation</GoldBtn>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => go("assessment")}
              style={{ background: C.navy, color: "white", border: "none", padding: "11px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", ...BODY }}>
              Book Consultation
            </motion.button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexDirection: "column", gap: 5 }}>
            {[0, 1, 2].map((i) => (
              <motion.span key={i} animate={{ rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0, y: menuOpen && i === 0 ? 7 : menuOpen && i === 2 ? -7 : 0, opacity: menuOpen && i === 1 ? 0 : 1 }}
                style={{ display: "block", width: 24, height: 2, background: C.navy, borderRadius: 2 }} />
            ))}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}
              style={{ overflow: "hidden", background: "white", borderTop: `1px solid ${C.border}`, padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              {NAV.map((l) => <span key={l} className="nav-a" onClick={() => go(NAV_TARGET[l] || l.toLowerCase().replace(/ /g, "-"))}>{l}</span>)}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ── */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", background: `linear-gradient(160deg,${C.navy} 0%,#0D1F45 60%,#1A0A3C 100%)`, overflow: "hidden", paddingTop: 72 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.85 }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg,${C.navy}99 0%,#0D1F4580 60%,#1A0A3C99 100%)` }} />
        <Stars count={40} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.gold}06 1px,transparent 1px),linear-gradient(90deg,${C.gold}06 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%,rgba(200,155,60,0.08) 0%,transparent 60%)", pointerEvents: "none" }} />
        <motion.div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1, y: heroY, opacity: heroOp, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 60 }} className="hf">
            <div style={{ flex: 1 }}>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 99, border: `1px solid ${C.gold}44`, background: `${C.gold}12`, color: C.gold, fontSize: 12, fontWeight: 700, letterSpacing: "1px", marginBottom: 28 }}>
                  <span>⭐⭐⭐⭐⭐</span> Trusted by Thousands Across India
                </div>
              </motion.div>
              <motion.h1 className="hero-h" initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ ...SH, fontSize: 52, fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1px", color: C.white, marginBottom: 16 }}>
                Your Gateway to<br />
                <span style={{ background: `linear-gradient(135deg,${C.gold},${C.goldL})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <Typewriter words={["Global Opportunities", "a Better Future", "Your Dream Life", "New Horizons"]} speed={85} pause={2200} />
                </span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}
                style={{ ...SUB, fontSize: 17, color: "#94A3B8", lineHeight: 1.8, marginBottom: 36, maxWidth: 480, fontStyle: "italic" }}>
                Study, Work, Travel & Settle Abroad with confidence through expert visa guidance and personalized support.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.38 }}
                style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }}>
                <GoldBtn onClick={() => go("assessment")} style={{ fontSize: 15, padding: "14px 28px" }}>✦ Book Free Consultation</GoldBtn>
                <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 12, background: "#25D366", color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "Poppins,sans-serif" }}>
                  <WhatsAppIcon /> Chat on WhatsApp
                </motion.a>
                <motion.a href={`tel:${PHONE_NUMBER}`} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 12, border: `1.5px solid ${C.gold}55`, color: C.goldL, fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "Poppins,sans-serif" }}>
                  📞 Call Expert
                </motion.a>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                {["✔ Licensed Consultants", "✔ Transparent Process", "✔ End-to-End Support"].map((b) => (
                  <span key={b} style={{ color: C.goldL, fontSize: 13, fontWeight: 600 }}>{b}</span>
                ))}
              </motion.div>
            </div>
            <motion.div className="hero-story" initial={{ opacity: 0, x: 0, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} style={{ width: "100%" }}>
              <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: `1px solid ${C.gold}22`, borderRadius: 24, padding: 32, boxShadow: "0 32px 80px rgba(0,0,0,.5)", width: "100%", maxWidth: 300, marginLeft: "auto", marginRight: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 18 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3ED598", display: "inline-block", boxShadow: "0 0 10px #3ED598" }} />
                  <span style={{ ...SH, color: C.goldL, fontSize: 13, fontWeight: 800, letterSpacing: "2px" }}>RECENT SUCCESS STORY</span>
                </div>
                <div style={{ paddingTop: 0 }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={storyIdx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{ background: `${C.gold}10`, border: `1px solid ${C.gold}30`, borderRadius: 16, padding: "20px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                        <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${C.gold},${C.goldL})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: C.navy, flexShrink: 0 }}>
                          {TESTIMONIALS[storyIdx].av}
                        </div>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>{TESTIMONIALS[storyIdx].name}</div>
                          <div style={{ fontSize: 12, color: C.goldL, fontWeight: 600 }}>✓ {TESTIMONIALS[storyIdx].visa}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                        "{TESTIMONIALS[storyIdx].text}"
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 12 }}>
                    {TESTIMONIALS.map((_, i) => (
                      <span key={i} style={{ width: i === storyIdx ? 16 : 6, height: 6, borderRadius: 99, background: i === storyIdx ? C.gold : `${C.gold}40`, transition: "all .3s" }} />
                    ))}
                  </div>
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

      {/* ── MARQUEE ── */}
      <div style={{ background: C.navy, padding: "3px 0", overflow: "hidden" }}>
        <Marquee items={MARQUEE_ITEMS} speed={7} />
      </div>

      {/* ── TESTIMONIALS ── */}
      <section id="success-stories" style={{ padding: "100px 24px", background: C.silver }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <Label>Success Stories</Label>
            <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 12 }}>What Our Clients Say</h2>
          </Reveal>
          <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="g3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp(i * 0.09)}
                whileHover={{ y: -6, boxShadow: `0 16px 40px ${C.gold}18`, borderColor: C.gold }}
                style={{ background: C.white, borderRadius: 20, padding: 30, border: `1px solid ${C.border}`, transition: "all .25s" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
                  {[...Array(5)].map((_, j) => (
                    <motion.span key={j} animate={{ textShadow: ["0 0 0px transparent", `0 0 10px ${C.gold}88`, "0 0 0px transparent"] }} transition={{ duration: 2, repeat: Infinity, delay: j * 0.15 + i * 0.3 }}
                      style={{ color: C.gold, fontSize: 16 }}>★</motion.span>
                  ))}
                </div>
                <motion.div animate={{ rotate: [0, 3, -3, 0] }} transition={{ duration: 5, repeat: Infinity, delay: i }} style={{ fontSize: 36, color: C.gold, lineHeight: 1, marginBottom: 10, display: "inline-block", fontFamily: "Georgia,serif" }}>"</motion.div>
                <p style={{ ...SUB, fontSize: 14.5, color: C.text, lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>{t.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ width: 44, height: 44, background: `linear-gradient(135deg,${C.navy},${C.gold})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{t.av}</div>
                  <div>
                    <div style={{ ...SH, fontWeight: 700, fontSize: 14, color: C.navy }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: C.slate }}>{t.visa}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ASSESSMENT FORM ── */}
      <section id="assessment" style={{ padding: "100px 24px", background: `linear-gradient(135deg,${C.gold}18,${C.goldL}08,${C.gold}18)`, position: "relative", overflow: "hidden" }}>
        <Stars count={20} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
            <Label>Get Started</Label>
            <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 12 }}>Book Free Consultation</h2>
            <p style={{ ...SUB, color: C.slate, fontSize: 15, fontStyle: "italic" }}>Fill in your details and our experts will contact you within 24 hours.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ background: C.white, borderRadius: 24, padding: 40, boxShadow: `0 20px 60px ${C.gold}22`, border: `1px solid ${C.gold}22` }}>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ textAlign: "center", padding: "32px 0" }}>
                    <motion.div animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 0.8 }} style={{ fontSize: 60, marginBottom: 16 }}>🎉</motion.div>
                    <h3 style={{ ...SH, fontSize: 24, fontWeight: 900, color: C.navy, marginBottom: 10 }}>Consultation Booked!</h3>
                    <p style={{ color: C.slate, fontSize: 15, marginBottom: 24 }}>Our visa expert will contact you within 24 hours.</p>
                    <GoldBtn onClick={() => setSent(false)}>Book Another</GoldBtn>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="g2">
                      {[{ ph: "Full Name *", k: "name", t: "text" }, { ph: "Phone Number *", k: "phone", t: "tel" }].map((f) => (
                        <input key={f.k} placeholder={f.ph} type={f.t} value={form[f.k]} onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                          style={{ padding: "13px 16px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 15, outline: "none", fontFamily: "Poppins,sans-serif", width: "100%" }}
                          onFocus={(e) => (e.target.style.borderColor = C.gold)} onBlur={(e) => (e.target.style.borderColor = C.border)} />
                      ))}
                    </div>
                    <input placeholder="Email Address *" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{ padding: "13px 16px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 15, outline: "none", fontFamily: "Poppins,sans-serif", width: "100%", marginBottom: 16 }}
                      onFocus={(e) => (e.target.style.borderColor = C.gold)} onBlur={(e) => (e.target.style.borderColor = C.border)} />

                    <div style={{ marginBottom: 18 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 10 }}>Consultation Type</div>
                      <div style={{ display: "flex", gap: 20 }}>
                        {[{ v: "call", l: "📞 Schedule a Call" }, { v: "visit", l: "📍 Schedule a Visit" }].map((o) => (
                          <label key={o.v} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: C.text }}>
                            <input type="radio" name="consultType" checked={form.consultType === o.v} onChange={() => setForm({ ...form, consultType: o.v })} style={{ accentColor: C.gold, width: 16, height: 16 }} />
                            {o.l}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }} className="g2">
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 8 }}>Consultation Date</div>
                        <input type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                          style={{ padding: "13px 16px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: "none", fontFamily: "Poppins,sans-serif", width: "100%", color: C.text }}
                          onFocus={(e) => (e.target.style.borderColor = C.gold)} onBlur={(e) => (e.target.style.borderColor = C.border)} />
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 8 }}>Consultation Time</div>
                        <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                          style={{ padding: "13px 16px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: "none", fontFamily: "Poppins,sans-serif", width: "100%", color: form.time ? C.text : "#94A3B8", background: "white" }}>
                          <option value="">Select time slot</option>
                          {["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM"].map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: 18 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 10 }}>Visa Type</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="g2">
                        {VISA_TYPES.map((o) => (
                          <label key={o.v} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: C.text }}>
                            <input type="radio" name="visaType" checked={form.visa === o.v} onChange={() => setForm({ ...form, visa: o.v })} style={{ accentColor: C.gold, width: 16, height: 16 }} />
                            {o.l}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 10 }}>Interested Countries — Popular</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }} className="g2">
                        {POPULAR_COUNTRIES.map((c) => (
                          <label key={c} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: C.text }}>
                            <input type="checkbox" checked={form.countries.includes(c)} onChange={() => setForm({ ...form, countries: form.countries.includes(c) ? form.countries.filter((x) => x !== c) : [...form.countries, c] })} style={{ accentColor: C.gold, width: 16, height: 16 }} />
                            {c}
                          </label>
                        ))}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 10 }}>Europe</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }} className="g2">
                        {EUROPE_COUNTRIES.map((c) => (
                          <label key={c} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: C.text }}>
                            <input type="checkbox" checked={form.countries.includes(c)} onChange={() => setForm({ ...form, countries: form.countries.includes(c) ? form.countries.filter((x) => x !== c) : [...form.countries, c] })} style={{ accentColor: C.gold, width: 16, height: 16 }} />
                            {c}
                          </label>
                        ))}
                      </div>
                      <input placeholder="Other country (optional)" value={form.otherCountry} onChange={(e) => setForm({ ...form, otherCountry: e.target.value })}
                        style={{ padding: "13px 16px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: "none", fontFamily: "Poppins,sans-serif", width: "100%" }}
                        onFocus={(e) => (e.target.style.borderColor = C.gold)} onBlur={(e) => (e.target.style.borderColor = C.border)} />
                    </div>

                    <GoldBtn style={{ width: "100%", padding: 16, fontSize: 16, borderRadius: 12, marginTop: 4 }} onClick={() => { if (form.name && form.email && form.phone) setSent(true); }}>
                      ✦ Book Free Consultation
                    </GoldBtn>
                    <p style={{ fontSize: 12, color: "#94A3B8", textAlign: "center", marginTop: 14 }}>No spam. No hidden charges. 100% free assessment.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY VISA BUDDIES ── */}
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
              <div style={{ display: "flex", gap: 12 }}>
                <GoldBtn onClick={() => go("assessment")}>Start Your Journey</GoldBtn>
              </div>
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

      {/* ── VISA CATEGORIES ── */}
      <section id="services" style={{ padding: "100px 24px", background: C.white }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
            <Label>Our Specializations</Label>
            <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 12 }}>Visa Categories We Handle</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }} className="g4">
            {[
              { key: "study-abroad", visa: "student", icon: "🎓", title: "Study Abroad", desc: "From shortlisting universities to securing your student visa, we guide you through every step — SOPs, LORs, financial documentation, and interview prep — for top study destinations including Canada, UK, Australia, and Europe." },
              { key: "work-visa", visa: "work", icon: "💼", title: "Work Visa", desc: "Work permit pathways for skilled professionals heading to New Zealand, Australia, UK, Europe, and beyond — we handle job offer documentation, sponsorships, and application filing end-to-end." },
              { key: "business-visa", visa: "business", icon: "🏢", title: "Business Visa", desc: "Whether you're attending a conference, exploring investment opportunities, or visiting business partners abroad, our team handles documentation and applications for business and investor visas across major economies." },
              { key: "pr", visa: "pr", icon: "🛂", title: "Permanent Residency (PR)", desc: "Settle abroad for good. We help you navigate points-based and employer-sponsored PR pathways for Canada, Australia, New Zealand, and the UK — from eligibility assessment to final approval." },
            ].map((c, i) => (
              <Reveal key={c.key} delay={i * 0.08}>
                <div style={{ background: C.silver, borderRadius: 18, padding: 30, border: `1px solid ${C.border}`, height: "100%" }}>
                  <div style={{ fontSize: 38, marginBottom: 14 }}>{c.icon}</div>
                  <h3 style={{ ...SH, fontSize: 18, fontWeight: 800, color: C.navy, marginBottom: 10 }}>{c.title}</h3>
                  <p style={{ fontSize: 13.5, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>{c.desc}</p>
                  <GoldBtn outline onClick={() => { setForm((f) => ({ ...f, visa: c.visa })); go("assessment"); }} style={{ fontSize: 13, padding: "9px 18px" }}>Get Started</GoldBtn>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDERS ── */}
      <section style={{ padding: "100px 24px", background: C.silver }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
            <Label>Leadership</Label>
            <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 12 }}>Meet Our Founders</h2>
            <p style={{ fontSize: 15, color: C.slate, maxWidth: 560, margin: "0 auto" }}>The vision and leadership driving Visa Buddies forward.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="g2">
            {[
              { name: "Harshit Patel", role: "Founder & CEO", av: "HP" },
              { name: "Aakansha Mahida", role: "Co-Founder & Managing Director (MD)", av: "AM" },
            ].map((f, i) => (
              <Reveal key={f.name} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6, boxShadow: `0 16px 40px ${C.gold}22`, borderColor: C.gold }}
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

      {/* ── STATS ── */}
      <section style={{ padding: "80px 24px", background: C.navy, position: "relative", overflow: "hidden" }}>
        <Stars count={20} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.gold}08 1px,transparent 1px),linear-gradient(90deg,${C.gold}08 1px,transparent 1px)`, backgroundSize: "56px 56px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
            <Label>Our Numbers</Label>
            <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.white }}>Our Numbers Speak</h2>
          </Reveal>
          <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }} className="g4">
            {STATS.map((s, i) => (
              <motion.div key={s.l} variants={fadeUp(i * 0.08)} whileHover={{ scale: 1.06 }}
                style={{ textAlign: "center", padding: "28px 16px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: `1px solid ${C.gold}22`, cursor: "default" }}>
                <div style={{ ...SH, fontSize: 46, fontWeight: 900, color: C.gold, textShadow: `0 0 30px ${C.gold}55`, marginBottom: 8 }}>
                  <Counter target={s.n} suffix={s.s} />
                </div>
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 600, letterSpacing: ".5px" }}>{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section id="tourist-visa" style={{ padding: "100px 24px", background: C.silver }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <Label>Popular Destinations</Label>
            <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 12 }}>Where Do You Want to Go?</h2>
            <p style={{ ...SUB, color: C.slate, fontSize: 16, fontStyle: "italic" }}>Premium visa pathways to the world's most sought-after destinations</p>
          </Reveal>
          <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="g4">
            {DESTINATIONS.map((d, i) => (
              <motion.div key={d.n} variants={fadeUp(i * 0.06)}
                whileHover={{ y: -6, boxShadow: `0 16px 40px ${C.gold}22`, borderColor: C.gold }}
                onClick={() => { const cn = d.formName || d.n; setForm((f) => ({ ...f, countries: f.countries.includes(cn) ? f.countries : [...f.countries, cn] })); go("assessment"); }}
                style={{ background: C.white, borderRadius: 18, padding: "28px 20px", border: `1px solid ${C.border}`, textAlign: "center", cursor: "pointer", transition: "all .25s" }}>
                <motion.div whileHover={{ scale: 1.2 }} style={{ fontSize: 42, marginBottom: 14, display: "inline-block" }}>{d.f}</motion.div>
                <div style={{ ...SH, fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 6 }}>{d.n}</div>
                <div style={{ fontSize: 12, color: C.slate, marginBottom: 16 }}>{d.sub}</div>
                <motion.div whileHover={{ background: C.gold, color: C.navy }}
                  style={{ display: "inline-block", padding: "8px 14px", borderRadius: 6, border: `1px solid ${C.gold}`, color: C.gold, fontSize: 11, fontWeight: 700, transition: "all .2s", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Book Free Consultation →
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ── */}
      <section style={{ padding: "100px 24px", background: C.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <Label>Our Services</Label>
            <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 12 }}>Step-by-Step Visa Journey</h2>
            <p style={{ ...SUB, color: C.slate, fontSize: 15, fontStyle: "italic" }}>From first conversation to boarding the flight — we're with you every step.</p>
          </Reveal>
          <div style={{ position: "relative", paddingLeft: 40 }}>
            <div style={{ position: "absolute", left: 16, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom,${C.gold},${C.goldD})` }} />
            {TIMELINE.map((step, i) => (
              <motion.div key={step} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 28, position: "relative" }}>
                <motion.div whileHover={{ scale: 1.15, boxShadow: `0 0 20px ${C.gold}66` }}
                  style={{ position: "absolute", left: -32, width: 32, height: 32, borderRadius: "50%", background: C.navy, border: `3px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.gold, fontSize: 12, fontWeight: 900, flexShrink: 0, zIndex: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </motion.div>
                <motion.div whileHover={{ x: 4, borderColor: C.gold, boxShadow: `0 4px 20px ${C.gold}18` }}
                  style={{ flex: 1, background: C.silver, borderRadius: 14, padding: "18px 22px", border: `1px solid ${C.border}`, marginLeft: 16, transition: "all .25s" }}>
                  <span style={{ ...SH, fontSize: 15, fontWeight: 700, color: C.navy }}>{step}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TRUST ── */}
      <section style={{ padding: "100px 24px", background: C.navy, position: "relative", overflow: "hidden" }}>
        <Stars count={25} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="g2">
            <Reveal>
              <Label>Why Choose Us</Label>
              <h2 style={{ ...SH, fontSize: 36, fontWeight: 900, color: C.white, marginBottom: 24, lineHeight: 1.2 }}>Why Clients Trust VISA BUDDIES</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {["Honest Advice", "Personalized Consultation", "SOP Assistance", "University Admissions", "Interview Preparation", "Visa Documentation", "Fast Response Time", "Dedicated Case Manager"].map((item, i) => (
                  <motion.div key={item} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}
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

      {/* ── FAQ ── */}
      <section style={{ padding: "100px 24px", background: C.white }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
            <Label>FAQ</Label>
            <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 12 }}>Frequently Asked Questions</h2>
          </Reveal>
          <Accordion items={FAQS} />
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div style={{ background: C.navy, padding: "24px", overflow: "hidden" }}>
        <Marquee items={TRUST.map((t) => `✦ ${t}`)} speed={5} reverse />
      </div>

      {/* ── FOOTER ── */}
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
                {[{ s: "📘", href: null }, { s: "📸", href: null }, { s: "▶️", href: null }, { s: "💬", href: WA_LINK }].map((it, i) => (
                  it.href ? (
                    <motion.a key={i} href={it.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `1px solid ${C.gold}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer", textDecoration: "none" }}>{it.s}</motion.a>
                  ) : (
                    <motion.div key={i} whileHover={{ scale: 1.2, color: C.gold }} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `1px solid ${C.gold}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, opacity: 0.5 }}>{it.s}</motion.div>
                  )
                ))}
              </div>
            </div>
            {[
              { t: "Quick Links", ls: [{ l: "About", id: "about-us" }, { l: "Services", id: "services" }, { l: "Countries", id: "tourist-visa" }] },
              { t: "Services", ls: [{ l: "Study Visa", id: "services" }, { l: "Work Visa", id: "services" }, { l: "Tourist Visa", id: "tourist-visa" }, { l: "Business Visa", id: "services" }, { l: "PR", id: "services" }] },
            ].map((col) => (
              <div key={col.t}>
                <div style={{ ...SH, fontWeight: 700, marginBottom: 18, fontSize: 14, color: C.gold, letterSpacing: "1px" }}>{col.t}</div>
                {col.ls.map((item) => (
                  <motion.div key={item.l} onClick={() => go(item.id)} whileHover={{ x: 4, color: C.gold }} style={{ color: "#64748B", fontSize: 14, marginBottom: 10, cursor: "pointer", transition: "color .2s" }}>{item.l}</motion.div>
                ))}
              </div>
            ))}
            <div>
              <div style={{ ...SH, fontWeight: 700, marginBottom: 18, fontSize: 14, color: C.gold, letterSpacing: "1px" }}>Contact</div>
              {[
                { i: "📍", v: "Office Address, Gujarat, India", href: null },
                { i: "📞", v: "+91 81600 50554", href: `tel:${PHONE_NUMBER}` },
                { i: <WhatsAppIcon size={14} />, v: "Chat on WhatsApp", href: WA_LINK, ext: true },
                { i: "📧", v: "info@visabuddies.in", href: "mailto:info@visabuddies.in" },
                { i: "🌐", v: "www.visa-buddies.com", href: "https://www.visa-buddies.com", ext: true },
              ].map((it) => (
                it.href ? (
                  <motion.a key={it.v} href={it.href} target={it.ext ? "_blank" : undefined} rel={it.ext ? "noopener noreferrer" : undefined} whileHover={{ x: 4, color: C.gold }}
                    style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start", textDecoration: "none", cursor: "pointer" }}>
                    <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1, color: "#64748B" }}>{it.i}</span>
                    <span style={{ color: "#64748B", fontSize: 13, lineHeight: 1.6 }}>{it.v}</span>
                  </motion.a>
                ) : (
                  <div key={it.v} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{it.i}</span>
                    <span style={{ color: "#64748B", fontSize: 13, lineHeight: 1.6 }}>{it.v}</span>
                  </div>
                )
              ))}
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

      {/* ── WhatsApp Float ── */}
      <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 4px 20px rgba(37,211,102,0.5)", textDecoration: "none" }}>
        <WhatsAppIcon size={28} />
      </motion.a>

      {/* ── Back to Top ── */}
      <AnimatePresence>
        {backTop && (
          <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={goTop}
            style={{ position: "fixed", bottom: 90, right: 24, zIndex: 999, width: 44, height: 44, borderRadius: "50%", background: C.navy, border: `2px solid ${C.gold}`, color: C.gold, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
