import { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ end, suffix = '', duration = 2000, className = '' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
