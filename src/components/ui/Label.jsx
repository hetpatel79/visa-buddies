import C from "../../constants/colors";

export default function Label({ children }) {
  return (
    <div style={{
      display:       "inline-flex",
      alignItems:    "center",
      gap:           8,
      padding:       "6px 16px",
      borderRadius:  99,
      border:        `1px solid ${C.gold}44`,
      background:    `${C.gold}10`,
      color:         C.gold,
      fontSize:      12,
      fontWeight:    700,
      letterSpacing: "1px",
      textTransform: "uppercase",
      marginBottom:  16,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, display: "inline-block" }} />
      {children}
    </div>
  );
}
