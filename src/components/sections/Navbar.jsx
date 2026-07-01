import { motion, AnimatePresence } from "framer-motion";
import LOGO from "../../assets/logo.jpg";
import C from "../../constants/colors";
import { NAV, NAV_TARGET } from "../../constants/data";
import GoldBtn from "../ui/GoldBtn";

export default function Navbar({ scrolled, menuOpen, setMenuOpen, go }) {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: scrolled ? "rgba(255,255,255,0.96)" : "white", backdropFilter: "blur(16px)", boxShadow: scrolled ? "0 2px 28px rgba(0,0,0,0.09)" : "0 1px 0 #E2E8F0", transition: "all .3s", padding: "0 24px" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <motion.div whileHover={{ scale: 1.03 }} style={{ cursor: "default", flexShrink: 0 }}>
          <img src={LOGO} alt="Visa Buddies" style={{ height: 52, width: "auto", objectFit: "contain" }} />
        </motion.div>

        <div className="hide-mob" style={{ display: "flex", gap: 14, alignItems: "center", overflowX: "auto", overflowY: "hidden", scrollbarWidth: "none", maxWidth: "56vw" }}>
          {NAV.map((l) => (
            <span key={l} className="nav-a" onClick={() => go(NAV_TARGET[l] || l.toLowerCase().replace(/ /g, "-"))}>
              {l}
            </span>
          ))}
        </div>

        <div className="hide-mob" style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
          <GoldBtn onClick={() => go("assessment")} style={{ padding: "10px 18px", fontSize: 13 }}>
            Book Free Consultation
          </GoldBtn>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexDirection: "column", gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0, y: menuOpen && i === 0 ? 7 : menuOpen && i === 2 ? -7 : 0, opacity: menuOpen && i === 1 ? 0 : 1 }}
              style={{ display: "block", width: 24, height: 2, background: C.navy, borderRadius: 2 }}
            />
          ))}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}
            style={{ overflow: "hidden", background: "white", borderTop: `1px solid ${C.border}`, padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}
          >
            {NAV.map((l) => (
              <span key={l} className="nav-a" onClick={() => go(NAV_TARGET[l] || l.toLowerCase().replace(/ /g, "-"))}>
                {l}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
