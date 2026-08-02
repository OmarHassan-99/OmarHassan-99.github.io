import { motion } from 'framer-motion';

export default function GlitchText({ text, className = '' }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        className="relative z-10 inline-block"
        animate={{
          x: [0, -2, 2, -1, 0],
          y: [0, 1, -1, 2, 0],
          opacity: [1, 0.8, 1, 0.9, 1]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: Math.random() * 5 + 3,
          ease: "linear"
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-accent-red opacity-70 mix-blend-screen"
        animate={{
          x: [0, 3, -2, 4, 0],
          y: [0, -1, 1, -2, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: Math.random() * 5 + 3,
          ease: "linear"
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-accent-cyan opacity-70 mix-blend-screen"
        animate={{
          x: [0, -3, 2, -4, 0],
          y: [0, 2, -1, 1, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: Math.random() * 5 + 3,
          ease: "linear"
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}
