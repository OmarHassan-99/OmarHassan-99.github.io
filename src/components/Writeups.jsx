import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import writeupsData from '../data/writeups';

export default function Writeups() {
  const [index, setIndex] = useState(0);
  const itemsPerPage = 3;

  // Sort writeups by most recent date
  const sortedWriteups = useMemo(() => {
    return [...writeupsData].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  const maxIndex = Math.ceil(sortedWriteups.length / itemsPerPage) - 1;

  const next = () => setIndex((prev) => (prev + 1) % (maxIndex + 1));
  const prev = () => setIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1));
  const visible = sortedWriteups.slice(index * itemsPerPage, index * itemsPerPage + itemsPerPage);

  return (
    <section id="writeups" className="mb-28 scroll-mt-24">
      <SectionHeader
        prompt="tail -f writeups.log"
        title="Featured"
        highlight="Write-ups"
        description="Practical investigations, malware analysis, and DFIR scenarios documented step-by-step."
      />

      <div className="relative">
        {/* Navigation */}
        <motion.button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-xl glass-card text-accent-cyan hover:text-soc-inverse transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous writeups"
        >
          <ChevronLeft size={22} />
        </motion.button>

        <motion.button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-xl glass-card text-accent-cyan hover:text-soc-inverse transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next writeups"
        >
          <ChevronRight size={22} />
        </motion.button>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-12"
          >
            {visible.map((lab) => (
              <motion.div
                key={lab.id}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col group"
              >
                <div className="p-6 flex flex-col flex-grow">
                  {/* Date badge */}
                  <div className="mb-3">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-accent-amber uppercase">
                      {lab.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold mb-3 text-soc-inverse group-hover:text-accent-cyan transition-colors">
                    {lab.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm mb-4 flex-grow leading-relaxed text-soc-secondary">
                    {lab.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {lab.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-soc-bg/60 text-accent-cyan/80 border border-soc-border/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read link */}
                  <motion.a
                    href={lab.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-gradient-to-r from-accent-green/80 to-accent-cyan/70 hover:from-accent-green hover:to-accent-cyan text-soc-bg px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BookOpen size={14} /> Read Write-up
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? 'bg-accent-cyan w-6'
                  : 'bg-soc-border w-1.5 hover:bg-slate-500'
              }`}
              aria-label={`Go to writeup page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
