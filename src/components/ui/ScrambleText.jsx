import { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

export default function ScrambleText({ text, delay = 0, duration = 1000 }) {
  const [displayed, setDisplayed] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let startTime = null;
    let animationFrame = null;
    let timeout = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      let scrambled = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' ';
          continue;
        }
        
        // As progress increases, more characters settle to their final state
        const charProgress = i / text.length;
        if (progress > charProgress + 0.1 || progress === 1) {
          scrambled += text[i];
        } else {
          scrambled += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      
      setDisplayed(scrambled);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setIsScrambling(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isScrambling) {
          setIsScrambling(true);
          
          // scramble it entirely first
          const fullScramble = text.split('').map(c => c === ' ' ? ' ' : CHARS[0]).join('');
          setDisplayed(fullScramble);
          
          timeout = setTimeout(() => {
            animationFrame = requestAnimationFrame(animate);
          }, delay);
          
          // only run once
          observer.unobserve(node);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (timeout) clearTimeout(timeout);
    };
  }, [text, delay, duration]);

  return <span ref={ref}>{displayed}</span>;
}
