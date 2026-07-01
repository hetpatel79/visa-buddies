import { motion } from "framer-motion";
import C from "@/constants/colors";

export default function GoldBtn({ children, onClick, style = {}, outline = false, disabled = false }) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05, boxShadow: `0 8px 30px ${C.gold}66` }}
      whileTap={disabled ? {} : { scale: 0.96 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        background:     outline ? "transparent" : `linear-gradient(135deg,${C.gold},${C.goldL},${C.gold})`,
        backgroundSize: "200% 200%",
        color:          outline ? C.gold : C.navy,
        border:         `2px solid ${C.gold}`,
        padding:        "13px 28px",
        borderRadius:   8,
        fontSize:       15,
        fontWeight:     700,
        cursor:         disabled ? "not-allowed" : "pointer",
        fontFamily:     "Poppins, sans-serif",
        opacity:        disabled ? 0.6 : 1,
        ...style,
      }}
    >
      <motion.span
        animate={disabled ? {} : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ display: "block" }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
