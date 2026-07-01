import { useState, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";

export function useScrollBehavior() {
  const [scrolled, setScrolled] = useState(false);
  const [backTop,  setBackTop]  = useState(false);

  const { scrollYProgress } = useScroll();
  const heroY  = useTransform(scrollYProgress, [0, 0.35], [0, -70]);
  const heroOp = useTransform(scrollYProgress, [0, 0.40], [1, 0]);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      setBackTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return { scrolled, backTop, heroY, heroOp, scrollYProgress };
}
