import { useState, useEffect } from "react";
import { TESTIMONIALS } from "@/constants";

export function useTestimonialCycle(interval = 4000) {
  const [storyIdx, setStoryIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setStoryIdx((i) => (i + 1) % TESTIMONIALS.length),
      interval
    );
    return () => clearInterval(t);
  }, [interval]);

  return storyIdx;
}
