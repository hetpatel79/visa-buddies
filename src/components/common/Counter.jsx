import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function Counter({ target, suffix = "" }) {
  const [v, setV] = useState(0);
  const ref       = useRef(null);
  const inView    = useInView(ref, { once: true });
  const num       = parseInt(target.replace(/\D/g, ""));

  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const step = Math.ceil(num / 60);
    const t = setInterval(() => {
      s += step;
      if (s >= num) { setV(num); clearInterval(t); } else setV(s);
    }, 20);
    return () => clearInterval(t);
  }, [inView, num]);

  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}
