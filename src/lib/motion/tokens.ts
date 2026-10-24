export const motion = {
  ease: "power3.out",
  easeSoft: "power2.out",
  duration: {
    hero: 1.05,
    enter: 0.7,
    image: 0.9,
    micro: 0.28,
  },
  stagger: {
    tight: 0.06,
    base: 0.08,
    loose: 0.11,
  },
  distance: {
    text: 22,
    image: 28,
    micro: 10,
  },
  scroll: {
    start: "top 88%",
    startTight: "top 92%",
  },
} as const;
