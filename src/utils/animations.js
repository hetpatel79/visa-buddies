export const fadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: d } },
});

export const containerV = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};
