import { motion } from 'framer-motion';
import ScrambleText from './ui/ScrambleText';

export default function SectionHeader({ prompt, title, highlight, description }) {
  return (
    <motion.div
      className="flex flex-col items-center mb-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal prompt label */}
      {prompt && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-soc-surface/80 border border-soc-border/30 font-mono text-xs text-accent-green/80 mb-4">
          <span className="text-accent-green">$</span> <ScrambleText text={prompt} duration={600} />
        </div>
      )}

      <h2 className="text-3xl md:text-4xl font-mono font-bold mb-3 tracking-tight text-center">
        {title}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-accent-cyan glow-text">
          <ScrambleText text={highlight} duration={800} delay={200} />
        </span>
      </h2>

      {description && (
        <p className="text-center max-w-2xl text-sm text-soc-secondary leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
