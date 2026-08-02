import { useEffect, useState } from 'react';
import ThreatAlerts from './ui/ThreatAlerts';
import FloatingParticles from './ui/FloatingParticles';
import CurvyLines from './ui/CurvyLines';
import ScrollProgress from './ui/ScrollProgress';
import MatrixRain from './ui/MatrixRain';

export default function Layout({ children }) {
  const [mousePos, setMousePos] = useState({ x: -300, y: -300 });

  useEffect(() => {
    // Only track mouse on non-touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-soc-bg text-soc-primary font-sans overflow-x-hidden">
      <ScrollProgress />
      {/* Dot grid background */}
      <div className="fixed inset-0 bg-grid opacity-40 pointer-events-none z-0" />

      {/* Cool Matrix Rain */}
      <MatrixRain />

      {/* Floating Particles and Curvy Lines */}
      <CurvyLines />
      <FloatingParticles />

      {/* Ambient gradient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-accent-green/[0.03] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-accent-blue/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-accent-cyan/[0.03] rounded-full blur-[100px]" />
      </div>

      {/* Mouse glow (desktop only) */}
      <div
        className="mouse-glow fixed pointer-events-none z-10 transition-transform duration-75"
        style={{
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
      
      {/* Ambient Threat Alerts */}
      <ThreatAlerts />
    </div>
  );
}
