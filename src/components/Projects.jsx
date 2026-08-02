import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Badge from './ui/Badge';
import projectsData from '../data/projects';

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const itemsPerPage = 3;
  const maxIndex = Math.ceil(projectsData.length / itemsPerPage) - 1;

  const next = () => setIndex((prev) => (prev + 1) % (maxIndex + 1));
  const prev = () => setIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1));
  const visible = projectsData.slice(index * itemsPerPage, index * itemsPerPage + itemsPerPage);

  return (
    <section id="projects" className="mb-28 scroll-mt-24">
      <SectionHeader
        prompt="cat projects.log"
        title="Featured"
        highlight="Projects"
        description="End-to-end security environments, automated pipelines, and custom SOC tooling."
      />

      <div className="relative">
        {/* Navigation */}
        <motion.button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-xl glass-card text-accent-green hover:text-soc-inverse transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous projects"
        >
          <ChevronLeft size={22} />
        </motion.button>

        <motion.button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-xl glass-card text-accent-green hover:text-soc-inverse transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next projects"
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
            {visible.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col group"
              >
                {/* Image */}
                <div 
                  onClick={() => setSelectedImage(project.image)}
                  className="h-40 overflow-hidden relative block cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-soc-surface to-transparent opacity-70 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-sm font-bold mb-2 line-clamp-2 text-soc-inverse">
                    {project.title}
                  </h3>
                  <p className="text-xs mb-4 flex-grow leading-relaxed line-clamp-3 text-soc-secondary">
                    {project.desc}
                  </p>



                  {/* Link */}
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 bg-soc-bg/50 hover:bg-accent-green/10 text-slate-300 hover:text-accent-green border border-soc-border/30 hover:border-accent-green/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Code2 size={14} /> View Source
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
                  ? 'bg-accent-green w-6'
                  : 'bg-soc-border w-1.5 hover:bg-slate-500'
              }`}
              aria-label={`Go to project page ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-soc-border/50 bg-soc-bg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors border border-white/20"
              >
                <X size={20} />
              </button>
              <img
                src={selectedImage}
                alt="Project preview"
                className="w-full h-full object-contain max-h-[90vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
