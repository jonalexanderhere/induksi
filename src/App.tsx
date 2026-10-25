import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { DominoSimulator } from './components/DominoSimulator';
import { ProblemViewer } from './components/ProblemViewer';
import { LoopInvariantLab } from './components/LoopInvariantLab';
import { FallacyDetective } from './components/FallacyDetective';
import { TheoryModule } from './components/TheoryModule';
import { Sparkles, Layers, BookCheck, Cpu, ArrowUpRight } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('problems');

  return (
    <div className="relative min-h-[100dvh] flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Radial Glow Mesh Orbs (Fixed behind content) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] animate-glow" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] animate-glow" style={{ animationDelay: '3s' }} />
        <div className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] bg-pink-600/10 rounded-full blur-[150px] animate-glow" style={{ animationDelay: '5s' }} />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10">
        {/* Floating Glass Navbar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Hero Section Banner */}
        <section className="max-w-5xl mx-auto px-4 pt-4 pb-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-[11px] font-semibold tracking-wider uppercase shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Solusi Interaktif Materi PDF • Discrete Mathematics Induction
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-[1.15]">
              Asisten & Pemecah Masalah{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Induksi Matematika
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-normal leading-relaxed">
              Platform studi lengkap untuk membedah, memverifikasi secara interaktif, dan memahami langkah demi langkah
              seluruh contoh serta 8 Soal Latihan dari dokumen <span className="text-slate-200 font-semibold">Mathematics Induction.pdf</span>.
            </p>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 w-full max-w-3xl">
              {[
                { label: '8 Soal Latihan PDF', sub: 'Solusi Langkah Formal', icon: BookCheck },
                { label: '4 Contoh Teorema', sub: 'Gauss, Ganjil, & Deret', icon: Layers },
                { label: 'Simulator Domino', sub: 'Visualisasi Efek Fisik', icon: Sparkles },
                { label: 'Loop Invariant', sub: 'Algoritma Exp(a, m)', icon: Cpu },
              ].map((m, i) => {
                const Icon = m.icon;
                return (
                  <div key={i} className="bezel-shell">
                    <div className="bezel-inner p-3 text-left flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">{m.label}</div>
                        <div className="text-[10px] text-slate-400">{m.sub}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tab View Container */}
        <main className="max-w-5xl mx-auto px-4 pb-24">
          {activeTab === 'problems' && <ProblemViewer />}
          {activeTab === 'domino' && <DominoSimulator />}
          {activeTab === 'algorithm' && <LoopInvariantLab />}
          {activeTab === 'fallacy' && <FallacyDetective />}
          {activeTab === 'theory' && <TheoryModule />}
        </main>
      </div>

      {/* Modern Minimal Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#05070a]/80 backdrop-blur-md py-8 px-4 text-xs text-slate-400">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">Induksimatika Studio</span>
            <span>•</span>
            <span>Materi Kuliah Matematika Diskrit</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Dibuat untuk memecahkan persoalan PDF</span>
            <div className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="flex items-center gap-1 text-slate-300">
              Support Vercel Ready <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
