import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import C from "@/constants/colors";

export default function Accordion({ items }) {
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
