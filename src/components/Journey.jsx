import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Users } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { internshipsData, trainingData, extracurricularData } from '../data/experience';

const tabs = [
  { key: 'internships', icon: <Briefcase size={16} />, label: 'Internships', data: internshipsData },
  { key: 'training', icon: <GraduationCap size={16} />, label: 'Training & Scholarships', data: trainingData },
  { key: 'extracurricular', icon: <Users size={16} />, label: 'Extracurricular', data: extracurricularData },
];

export default function Journey() {
  const [activeTab, setActiveTab] = useState('internships');
  const currentTab = tabs.find((t) => t.key === activeTab);
  const journeyData = currentTab?.data || [];

  return (
    <section id="journey" className="mb-28 scroll-mt-24">
      <SectionHeader
        prompt="history | grep career"
        title="Professional"
        highlight="Journey"
        description="My experience in cybersecurity and IT operations."
      />

      {/* Tab Switcher */}
      <div className="flex gap-2 flex-wrap justify-center p-1.5 rounded-2xl bg-soc-surface/40 border border-soc-border/20 mb-10 max-w-fit mx-auto">
        {tabs.map((tab) => (
          <motion.button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-xl text-sm font-mono font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-accent-green to-accent-cyan text-soc-bg shadow-md'
                : 'text-soc-secondary hover:text-soc-primary hover:bg-soc-surface/60'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.icon} {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-gradient-to-b from-accent-green/40 via-soc-border/30 to-transparent" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 w-full"
          >
            {journeyData.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`flex flex-col md:flex-row gap-6 items-start relative ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass-card rounded-2xl p-6"
                  >
                    {/* Header with logo */}
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                      {/* Company logo */}
                      <motion.div
                        className="relative w-12 h-12 rounded-xl overflow-hidden border border-soc-border/50 shadow-lg shrink-0"
                        whileHover={{ scale: 1.1 }}
                      >
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </motion.div>

                      {/* Title info */}
                      <div className={`flex flex-col ${index % 2 === 0 ? 'md:text-right md:items-end' : 'md:text-left md:items-start'} items-start text-left`}>
                        <span className="text-[10px] font-mono font-bold tracking-wider text-accent-amber uppercase mb-1">
                          {job.date}
                        </span>
                        <h3 className="text-base font-bold text-soc-inverse">{job.role}</h3>
                        <p className="text-accent-green/80 text-sm font-semibold">{job.company}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed mb-4 text-soc-secondary text-left">
                      {job.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 justify-start">
                      {job.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-soc-bg/50 text-accent-cyan/80 border border-soc-border/30"
                          whileHover={{ scale: 1.05 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <motion.div
                  className="hidden md:block relative z-10"
                  whileHover={{ scale: 1.5 }}
                >
                  <div className="w-4 h-4 bg-accent-green rounded-full border-4 border-soc-bg shadow-[0_0_10px_rgba(0,255,136,0.4)]" />
                </motion.div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
