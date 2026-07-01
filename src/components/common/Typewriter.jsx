import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import C from "@/constants/colors";

export default function Typewriter({ words, speed = 80, pause = 2000 }) {
  const [wi,  setWi]  = useState(0);
  const [ci,  setCi]  = useState(0);
  const [del, setDel] = useState(false);
  const [txt, setTxt] = useState("");

  useEffect(() => {
    let pauseTimer;
    const t = setTimeout(() => {
      const w = words[wi];
      if (!del) {
        setTxt(w.slice(0, ci + 1));
        if (ci + 1 === w.length) { pauseTimer = setTimeout(() => setDel(true), pause); return; }
        setCi((p) => p + 1);
      } else {
        setTxt(w.slice(0, ci - 1));
        if (ci - 1 === 0) { setDel(false); setWi((p) => (p + 1) % words.length); setCi(0); return; }
        setCi((p) => p - 1);
      }
    }, del ? speed / 2 : speed);
    return () => { clearTimeout(t); clearTimeout(pauseTimer); };
  }, [ci, del, wi, words, speed, pause]);

  return (
    <span>
      {txt}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }} style={{ color: C.gold }}>|</motion.span>
    </span>
  );
}
