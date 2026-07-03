import { motion } from 'framer-motion';
import { Code2, BookOpen, Target, Trophy } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { Target as Crosshair } from 'lucide-react';

const stats = [
  {
    icon: <Code2 size={22} />,
    value: 8,
    suffix: '+',
    label: 'Security Projects',
    color: 'accent-green',
    gradient: 'from-accent-green/20 to-accent-green/5',
    border: 'hover:border-accent-green/50',
    shadow: 'hover:shadow-accent-green/10',
  },
  {
    icon: <BookOpen size={22} />,
    value: 10,
    suffix: '+',
    label: 'Write-ups',
    color: 'accent-cyan',
    gradient: 'from-accent-cyan/20 to-accent-cyan/5',
    border: 'hover:border-accent-cyan/50',
    shadow: 'hover:shadow-accent-cyan/10',
  },
  {
    icon: <Crosshair size={22} />,
    value: 250,
    suffix: '+',
    label: 'Labs',
    color: 'accent-blue',
    gradient: 'from-accent-blue/20 to-accent-blue/5',
    border: 'hover:border-accent-blue/50',
    shadow: 'hover:shadow-accent-blue/10',
  },
  {
    icon: <Trophy size={22} />,
    staticValue: 'Top 1%',
    label: 'THM Rank',
    color: 'accent-amber',
    gradient: 'from-accent-amber/20 to-accent-amber/5',
    border: 'hover:border-accent-amber/50',
    shadow: 'hover:shadow-accent-amber/10',
  },
  {
    icon: <Target size={22} />,
    staticValue: '#15 🇪🇬',
    label: 'CyberDefenders',
    color: 'accent-blue',
    gradient: 'from-accent-blue/20 to-accent-blue/5',
    border: 'hover:border-accent-blue/50',
    shadow: 'hover:shadow-accent-blue/10',
  },
];

export default function Stats() {
  return (
    <motion.section
      className="mb-28"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.04, y: -4 }}
            className={`glass-card rounded-2xl p-5 flex flex-col items-center justify-center text-center ${stat.border} ${stat.shadow} hover:shadow-lg transition-all`}
          >
            {/* Icon */}
            <div className={`p-3 rounded-xl bg-gradient-to-b ${stat.gradient} mb-3`}>
              <span className={`text-${stat.color}`}>{stat.icon}</span>
            </div>

            {/* Value */}
            {stat.staticValue ? (
              <h3 className={`text-3xl md:text-4xl font-mono font-black text-${stat.color} mb-1`}>
                {stat.staticValue}
              </h3>
            ) : (
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
                duration={2000}
                className={`text-3xl md:text-4xl font-mono font-black text-${stat.color} mb-1`}
              />
            )}

            {/* Label */}
            <p className="font-semibold text-xs uppercase tracking-wider text-soc-secondary">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
