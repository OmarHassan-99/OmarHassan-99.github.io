import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Shield, Mail, Phone, Globe, FileText } from 'lucide-react';

export default function Hero() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-24 pt-8 md:pt-16 scroll-mt-24"
    >
      {/* Profile Image Column */}
      <div className="flex flex-col items-center shrink-0 gap-8 mt-4 md:mt-0">
        <motion.div
          className="relative w-64 h-64 md:w-80 md:h-80 shrink-0"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-green/30 to-accent-blue/20 rounded-full blur-3xl opacity-50" />

          {/* Cool Animated Borders */}
          <div className="absolute -inset-2 rounded-full border-2 border-transparent border-t-accent-green border-r-accent-green/30 animate-[spin_6s_linear_infinite]" />
          <div className="absolute -inset-4 rounded-full border border-transparent border-b-accent-cyan border-l-accent-cyan/30 animate-[spin_10s_linear_infinite_reverse]" />
          <div className="absolute -inset-6 rounded-full border border-soc-border/40 border-dashed animate-[spin_20s_linear_infinite]" />

          {/* Image container */}
          <motion.div
            className="relative w-full h-full rounded-full overflow-hidden z-10 bg-soc-bg border-4 border-soc-bg shadow-2xl shadow-accent-green/20"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img
              src="./images/profile.webp"
              alt="Omar Hassan — SOC Analyst & Security Engineer"
              className="w-full h-full object-cover rounded-full"
              width="320"
              height="320"
            />
          </motion.div>
        </motion.div>

        {/* Status badge in flow */}
        <motion.div
          className="bg-soc-surface border border-soc-border/50 px-5 py-2 rounded-full flex items-center gap-3 z-10 shadow-xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent-green shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse" />
          <span className="text-sm font-mono font-semibold text-accent-green tracking-wide">Open for Opportunities</span>
        </motion.div>
      </div>

      {/* Text content */}
      <motion.div
        className="flex flex-col items-center md:items-start text-center md:text-left flex-1"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Terminal badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-soc-surface/80 border border-soc-border/30 font-mono text-sm mb-5"
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,255,136,0.1)' }}
        >
          <TerminalIcon size={14} className="text-accent-green" />
          <span className="text-accent-green">$</span>
          <span className="text-slate-300">whoami</span>
          <span className="w-2 h-4 bg-accent-green/80 animate-pulse ml-1" />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-6xl font-sans font-bold mb-3 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Omar{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-accent-cyan glow-text">
            Hassan
          </span>
        </motion.h1>

        {/* Title */}
        <motion.div
          className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2 justify-center md:justify-start text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="text-accent-blue"><Shield size={22} /></span>
          <span>SOC Analyst & Security Engineer</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-sm mb-4 font-mono text-accent-green/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Computer Science Graduate 2026 | Ain Shams University | BSc. in Information Systems
        </motion.p>

        {/* Bio */}
        <motion.p
          className="text-sm md:text-base leading-relaxed mb-6 text-soc-secondary max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Passionate SOC Analyst focused on Threat Hunting, Digital Forensics, and Security Automation. Building cybersecurity projects, SIEM solutions, and n8n-powered workflows while continuously learning and sharing knowledge through technical research and hands-on labs.
        </motion.p>

        {/* Contact info */}
        <motion.div
          className="flex flex-wrap gap-x-4 gap-y-2 justify-center md:justify-start mb-6 text-sm text-soc-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="flex items-center gap-1.5"><Mail size={14} className="text-accent-green/60" /> omar.m.h.shehatta@gmail.com</span>
          <span className="flex items-center gap-1.5"><Phone size={14} className="text-accent-green/60" /> +20-115-888-5496</span>
          <span className="flex items-center gap-1.5"><Globe size={14} className="text-accent-green/60" /> Cairo, Egypt</span>
          <span className="flex items-center gap-1.5"><Shield size={14} className="text-accent-green/60" /> Military Exempted</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center md:justify-start gap-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <motion.a
            href="./Omar_Hassan_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-accent-green/90 to-accent-cyan/80 text-soc-bg px-7 py-3 rounded-xl text-sm font-mono font-bold hover:shadow-lg hover:shadow-accent-green/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText size={16} /> View / Download CV
          </motion.a>
          <motion.a
            href="mailto:omar.m.h.shehatta@gmail.com"
            className="w-full md:w-auto flex items-center justify-center gap-2 border border-soc-border hover:border-accent-blue/50 px-7 py-3 rounded-xl text-sm font-bold text-slate-300 hover:text-soc-inverse hover:bg-soc-surface/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={16} /> Get In Touch
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
