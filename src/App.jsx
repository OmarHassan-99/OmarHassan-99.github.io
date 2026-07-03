import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Terminal from './components/Terminal';
import Stats from './components/Stats';

// Lazy load below-fold sections
const Projects = lazy(() => import('./components/Projects'));
const Writeups = lazy(() => import('./components/Writeups'));
const Platforms = lazy(() => import('./components/Platforms'));
const Journey = lazy(() => import('./components/Journey'));
const Footer = lazy(() => import('./components/Footer'));

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex items-center gap-3 font-mono text-sm text-slate-500">
        <div className="w-4 h-4 border-2 border-accent-green/50 border-t-accent-green rounded-full animate-spin" />
        Loading module...
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-16 relative z-10">
        <Hero />
        <Terminal />
        <div className="mb-28" />
        <Stats />

        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Writeups />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Platforms />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Journey />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </main>
    </Layout>
  );
}