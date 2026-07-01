import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "../../utils/animations";

export default function Reveal({ children, delay = 0, style = {} }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp(delay)}
      style={style}
    >
      {children}
    </motion.div>
  );
}
