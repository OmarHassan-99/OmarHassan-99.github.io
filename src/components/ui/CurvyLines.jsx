import { motion } from 'framer-motion';

export default function CurvyLines() {
  // SVG paths that repeat every 500 units horizontally
  const path1 = "M0 50 Q 125 10, 250 50 T 500 50 T 750 50 T 1000 50 T 1250 50 T 1500 50 T 1750 50 T 2000 50";
  const path2 = "M0 60 Q 125 80, 250 60 T 500 60 T 750 60 T 1000 60 T 1250 60 T 1500 60 T 1750 60 T 2000 60";
  const path3 = "M0 40 Q 125 0, 250 40 T 500 40 T 750 40 T 1000 40 T 1250 40 T 1500 40 T 1750 40 T 2000 40";
  const path4 = "M0 70 Q 125 40, 250 70 T 500 70 T 750 70 T 1000 70 T 1250 70 T 1500 70 T 1750 70 T 2000 70";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      <svg
        className="absolute w-[200vw] min-w-[2000px] h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={path1}
          fill="none"
          stroke="rgba(0, 255, 136, 0.2)"
          strokeWidth="0.8"
          animate={{ x: [0, -500] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        />
        <motion.path
          d={path2}
          fill="none"
          stroke="rgba(0, 255, 136, 0.15)"
          strokeWidth="1.2"
          animate={{ x: [0, -500] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
        <motion.path
          d={path3}
          fill="none"
          stroke="rgba(0, 255, 136, 0.1)"
          strokeWidth="1.5"
          animate={{ x: [0, -500] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        />
        <motion.path
          d={path4}
          fill="none"
          stroke="rgba(0, 255, 136, 0.05)"
          strokeWidth="2.5"
          animate={{ x: [0, -500] }}
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
