import { clsx, type ClassValue } from "clsx";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Spring transition preset — snappy, physical feel */
export const spring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
};

/** Soft spring for larger elements */
export const softSpring = {
  type: "spring" as const,
  stiffness: 220,
  damping: 28,
};

/** Fade-up stagger variants */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/** Clip-path wipe — left-to-right like a shutter */
export const shutterVariants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    clipPath: "inset(0 0% 0 100%)",
    transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] },
  },
};
