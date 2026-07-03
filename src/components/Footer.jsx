import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="text-center py-10 border-t border-soc-border/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Divider */}
      <div className="section-divider mx-auto w-48 mb-6" />

      {/* Copyright */}
      <p className="text-sm font-mono text-soc-muted">
        <span className="text-accent-green/50">$</span> echo &quot;© 2026 Omar Mohamed Hassan&quot;
      </p>
    </motion.footer>
  );
}
