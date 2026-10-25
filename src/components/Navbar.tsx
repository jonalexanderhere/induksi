import React from 'react';
import { Layers, PlayCircle, BookOpen, Cpu, Sparkles } from 'lucide-react';

export type ActiveTab = 'domino' | 'problems' | 'algorithm' | 'fallacy' | 'theory';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'problems' as ActiveTab, label: 'Solusi Lengkap PDF', icon: BookOpen, badge: '8 Soal + Contoh' },
    { id: 'domino' as ActiveTab, label: 'Simulator Domino', icon: PlayCircle, badge: 'Interaktif' },
    { id: 'algorithm' as ActiveTab, label: 'Loop Invariant', icon: Cpu, badge: 'Exp(a, m)' },
    { id: 'fallacy' as ActiveTab, label: 'Detektif Fallacy', icon: Sparkles, badge: 'Soal 8' },
    { id: 'theory' as ActiveTab, label: 'Prinsip Teori', icon: Layers, badge: 'Slide PDF' },
  ];

  return (
    <header className="sticky top-4 z-40 px-4 mb-8">
      <nav className="glass-island max-w-5xl mx-auto rounded-full px-3 py-2.5 flex items-center justify-between shadow-2xl">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5 pl-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-[#0c1017] rounded-full flex items-center justify-center">
              <span className="text-base font-bold bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">Pₙ</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              Induksimatika
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Studio
              </span>
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Discrete Mathematics Induction Helper
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25 ring-1 ring-white/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`hidden lg:inline text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
