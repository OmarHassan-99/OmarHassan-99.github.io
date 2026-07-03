import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { MediumIcon, TryHackMeIcon, CyberDefendersIcon } from './ui/Icons';
import { useTheme } from '../context/ThemeContext';

const navLinks = ['About', 'Projects', 'Writeups', 'Platforms', 'Journey'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className={`sticky top-0 z-50 backdrop-blur-xl border-b px-4 md:px-6 py-3 transition-all duration-300 ${
        scrolled
          ? 'bg-soc-bg/90 border-soc-border/40 shadow-lg shadow-black/20'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center w-full">
        {/* Left side: Theme Toggle */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggleTheme}
            className="text-soc-muted hover:text-soc-inverse transition-colors relative w-6 h-6 flex items-center justify-center overflow-hidden"
            title="Toggle Theme"
            aria-label="Toggle Theme"
            whileHover={{ scale: 1.15, y: -1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-3 py-2 text-sm font-mono text-soc-secondary hover:text-accent-green transition-colors relative group rounded-lg hover:bg-soc-surface/40"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-accent-green/50 mr-1 text-xs group-hover:text-accent-green">/</span>
              {item.toLowerCase()}
              <span className="absolute bottom-0 left-3 right-3 h-px bg-accent-green/0 group-hover:bg-accent-green/40 transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Right side: Social Links & Mobile Menu */}
        <div className="flex items-center justify-end gap-4 ml-auto md:ml-0">
          <div className="flex items-center gap-3">
            <motion.a
              href="https://github.com/OmarHassan-99"
              target="_blank"
              rel="noreferrer"
              className="text-soc-inverse transition-colors"
              title="GitHub"
              aria-label="GitHub profile"
              whileHover={{ scale: 1.15, y: -1 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>

            <motion.a
              href="http://www.linkedin.com/in/omar-hassan9999"
              target="_blank"
              rel="noreferrer"
              className="text-[#0A66C2] transition-colors"
              title="LinkedIn"
              aria-label="LinkedIn profile"
              whileHover={{ scale: 1.15, y: -1 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>

            <motion.a
              href="https://medium.com/%40omar.m.h.shehatta"
              target="_blank"
              rel="noreferrer"
              className="text-soc-inverse transition-colors"
              title="Medium Blog"
              aria-label="Medium blog"
              whileHover={{ scale: 1.15, y: -1 }}
            >
              <MediumIcon size={20} />
            </motion.a>

            <motion.a
              href="https://tryhackme.com/p/OmarHassan007"
              target="_blank"
              rel="noreferrer"
              className="transition-transform"
              title="TryHackMe"
              aria-label="TryHackMe profile"
              whileHover={{ scale: 1.15, y: -1 }}
            >
              <TryHackMeIcon size={20} />
            </motion.a>

            <motion.a
              href="https://cyberdefenders.org/p/OmarHassan/"
              target="_blank"
              rel="noreferrer"
              className="text-[#335EEA] transition-colors"
              title="CyberDefenders"
              aria-label="CyberDefenders profile"
              whileHover={{ scale: 1.15, y: -1 }}
            >
              <CyberDefendersIcon size={20} />
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-soc-secondary hover:text-soc-inverse"
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden mt-3 pt-3 border-t border-soc-border/30"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-mono text-soc-secondary hover:text-accent-green hover:bg-soc-surface/40 rounded-lg transition-colors"
              >
                <span className="text-accent-green/50 mr-2">/</span>
                {item.toLowerCase()}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
