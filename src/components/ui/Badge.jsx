export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-soc-elevated/60 text-accent-cyan border-soc-border/50',
    easy: 'badge-easy',
    medium: 'badge-medium',
    hard: 'badge-hard',
    info: 'badge-info',
  };

  return (
    <span
      className={`inline-block text-[10px] font-semibold font-mono px-2 py-0.5 rounded ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
}

// Helper to map difficulty string to variant
export function getDifficultyVariant(difficulty) {
  const map = {
    Easy: 'easy',
    Medium: 'medium',
    Hard: 'hard',
    Info: 'info',
  };
  return map[difficulty] || 'default';
}
