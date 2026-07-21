import React from 'react';
import { HeroSection } from './components/HeroSection';

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      <HeroSection />
    </main>
  );
}
