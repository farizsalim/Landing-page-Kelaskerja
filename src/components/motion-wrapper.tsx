"use client";

import {type ReactNode} from "react";
import {motion, type Variants} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Shared viewport config                                             */
/* ------------------------------------------------------------------ */
const viewport = {once: true, margin: "-80px"} as const;

/* ------------------------------------------------------------------ */
/*  Variant presets                                                    */
/* ------------------------------------------------------------------ */
const fadeUpVariants: Variants = {
  hidden: {opacity: 0, y: 40},
  visible: {opacity: 1, y: 0},
};

const fadeDownVariants: Variants = {
  hidden: {opacity: 0, y: -30},
  visible: {opacity: 1, y: 0},
};

const fadeLeftVariants: Variants = {
  hidden: {opacity: 0, x: -50},
  visible: {opacity: 1, x: 0},
};

const fadeRightVariants: Variants = {
  hidden: {opacity: 0, x: 50},
  visible: {opacity: 1, x: 0},
};

const scaleInVariants: Variants = {
  hidden: {opacity: 0, scale: 0.9},
  visible: {opacity: 1, scale: 1},
};

const blurInVariants: Variants = {
  hidden: {opacity: 0, filter: "blur(12px)"},
  visible: {opacity: 1, filter: "blur(0px)"},
};

/* ------------------------------------------------------------------ */
/*  Stagger container                                                  */
/* ------------------------------------------------------------------ */
const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {staggerChildren: 0.12, delayChildren: 0.1},
  },
};

const staggerItemVariants: Variants = {
  hidden: {opacity: 0, y: 30},
  visible: {opacity: 1, y: 0},
};

/* ------------------------------------------------------------------ */
/*  Shared props                                                       */
/* ------------------------------------------------------------------ */
interface MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

export function FadeInUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
}: MotionProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{duration, delay, ease: [0.22, 1, 0.36, 1]}}
      className={className}>
      {children}
    </motion.div>
  );
}

export function FadeInDown({
  children,
  className,
  delay = 0,
  duration = 0.6,
}: MotionProps) {
  return (
    <motion.div
      variants={fadeDownVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{duration, delay, ease: [0.22, 1, 0.36, 1]}}
      className={className}>
      {children}
    </motion.div>
  );
}

export function FadeInLeft({
  children,
  className,
  delay = 0,
  duration = 0.7,
}: MotionProps) {
  return (
    <motion.div
      variants={fadeLeftVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{duration, delay, ease: [0.22, 1, 0.36, 1]}}
      className={className}>
      {children}
    </motion.div>
  );
}

export function FadeInRight({
  children,
  className,
  delay = 0,
  duration = 0.7,
}: MotionProps) {
  return (
    <motion.div
      variants={fadeRightVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{duration, delay, ease: [0.22, 1, 0.36, 1]}}
      className={className}>
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
}: MotionProps) {
  return (
    <motion.div
      variants={scaleInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{duration, delay, ease: [0.22, 1, 0.36, 1]}}
      className={className}>
      {children}
    </motion.div>
  );
}

export function BlurIn({
  children,
  className,
  delay = 0,
  duration = 0.8,
}: MotionProps) {
  return (
    <motion.div
      variants={blurInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{duration, delay, ease: [0.22, 1, 0.36, 1]}}
      className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerItemVariants}
      transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1]}}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating animation (continuous)                                    */
/* ------------------------------------------------------------------ */
export function FloatingElement({
  children,
  className,
  amplitude = 8,
  duration = 4,
}: MotionProps & {amplitude?: number}) {
  return (
    <motion.div
      animate={{y: [-amplitude, amplitude, -amplitude]}}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{willChange: "transform"}}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Re-export motion for direct usage                                  */
/* ------------------------------------------------------------------ */
export {motion, type Variants};
export {AnimatePresence} from "framer-motion";
