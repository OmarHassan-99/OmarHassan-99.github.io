import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const NUM_PARTICLES = 25;

export default function FloatingParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles on mount (to avoid hydration mismatch if SSR)
    const newParticles = Array.from({ length: NUM_PARTICLES }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 15 + 5, // px
      duration: Math.random() * 20 + 20, // seconds
      delay: Math.random() * -20, // seconds
      opacity: Math.random() * 0.15 + 0.05,
      isCircle: Math.random() > 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute bg-soc-border/40 ${p.isCircle ? 'rounded-full' : 'rounded-sm'}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -1000],
            opacity: [0, p.opacity, p.opacity, 0],
            rotate: p.isCircle ? 0 : [0, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
