import React, { useState } from 'react';
import { 
  INDUCTION_PROBLEMS, 
  InductionProblem 
} from '../data/inductionProblems';
import { KatexMath } from './KatexMath';
import { 
  Layers, 
  Calculator, 
  Check, 
  FileText
} from 'lucide-react';

export const ProblemViewer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProblemId, setActiveProblemId] = useState<string>(INDUCTION_PROBLEMS[0].id);
  const [testN, setTestN] = useState<number>(6);

  const filteredProblems = INDUCTION_PROBLEMS.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const currentProblem: InductionProblem =
    INDUCTION_PROBLEMS.find((p) => p.id === activeProblemId) || INDUCTION_PROBLEMS[0];

  const calc = currentProblem.calculator;
  const calcResult = calc ? calc.evaluate(testN) : null;

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-slate-900/80 border border-white/10 text-xs">
          {[
            { id: 'all', label: 'Semua Soal & Contoh' },
            { id: 'soal_latihan', label: '8 Soal Latihan PDF' },
            { id: 'contoh', label: 'Contoh 1 - 4' },
            { id: 'latihan_slide', label: 'Latihan Slide 17 & 18' },
            { id: 'algoritma', label: 'Algoritma Exp(a, m)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Menampilkan <span className="text-indigo-400 font-bold">{filteredProblems.length}</span> persoalan
        </div>
      </div>

      {/* Main Grid: Left List + Right Detail (Asymmetric Bento) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Problem Navigation List */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[780px] overflow-y-auto pr-1">
          {filteredProblems.map((prob) => {
            const isSelected = prob.id === currentProblem.id;
            return (
              <div
                key={prob.id}
                onClick={() => {
                  setActiveProblemId(prob.id);
                  if (prob.calculator) {
                    setTestN(prob.calculator.defaultN);
                  }
                }}
                className={`bezel-shell cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-indigo-500/50 scale-[1.01]' : 'hover:border-white/20 opacity-85 hover:opacity-100'
                }`}
              >
                <div className={`bezel-inner p-3.5 ${isSelected ? 'bg-indigo-950/30' : ''}`}>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">
                      Slide {prob.slideNumber}
                    </span>
                    <span className="text-[10px] font-semibold text-indigo-400">
                      {prob.inductionType}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-200 line-clamp-1 mb-1">
                    {prob.title}
                  </h3>

                  <div className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                    {prob.statement}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Deep Mathematical Proof Breakdown */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Problem Header Card */}
          <div className="bezel-shell">
            <div className="bezel-inner p-6 sm:p-8 space-y-6">
              {/* Meta Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Slide {currentProblem.slideNumber} di PDF
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {currentProblem.inductionType}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  Materi: Matematika Diskrit
                </div>
              </div>

              {/* Title & Statement */}
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {currentProblem.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentProblem.statement}
                </p>

                {/* Formula Highlight Box */}
                <div className="math-card p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 my-4 shadow-inner">
                  <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider mb-1">
                    Bentuk Teorema Formal P(n):
                  </div>
                  <div className="text-sm sm:text-base text-white">
                    <KatexMath math={currentProblem.latexStatement} block />
                  </div>
                </div>
              </div>

              {/* Interactive Live Testing Calculator (If Available) */}
              {calc && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900/90 to-indigo-950/40 border border-indigo-500/20 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                      <Calculator className="w-4 h-4 text-indigo-400" />
                      Uji Numerik Real-Time Nilai n
                    </div>
                    <span className="text-[11px] text-slate-400">Verifikasi formula secara langsung</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-300 font-mono">Pilih n:</label>
                      <input
                        type="range"
                        min={calc.minN}
                        max={calc.maxN}
                        value={testN}
                        onChange={(e) => setTestN(Number(e.target.value))}
                        className="w-32 accent-indigo-500 cursor-pointer"
                      />
                      <span className="font-mono text-sm font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-white/10">
                        {testN}
                      </span>
                    </div>

                    {calcResult && (
                      <div className="flex-1 flex flex-wrap items-center gap-3 bg-slate-950/60 px-3.5 py-2 rounded-xl border border-white/5 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400 font-mono">Hasil:</span>
                          <span className="font-bold text-emerald-400 font-mono">{calcResult.rhs}</span>
                        </div>
                        {calcResult.isValid && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-semibold border border-emerald-500/20 flex items-center gap-1 ml-auto">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {calcResult?.detail && (
                    <div className="text-[11px] font-mono text-slate-400 pt-1">
                      💡 {calcResult.detail}
                    </div>
                  )}
                </div>
              )}

              {/* Step by Step Proof Sequence */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  Langkah Pembuktian Formal (Induksi Matematika)
                </div>

                <div className="space-y-4">
                  {currentProblem.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold flex items-center justify-center border border-indigo-500/30">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-200">
                            {step.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          {step.badge}
                        </span>
                      </div>

                      {/* Math LaTeX Step */}
                      <div className="bg-slate-950/70 p-3 rounded-xl border border-white/5 my-2 text-xs sm:text-sm text-slate-100">
                        <KatexMath math={step.mathExplanation} block />
                      </div>

                      {/* Explanation */}
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {step.rawExplanation}
                      </p>

                      {step.notes && (
                        <div className="text-[11px] text-indigo-300/80 bg-indigo-500/5 px-2.5 py-1 rounded-lg border border-indigo-500/10">
                          📌 {step.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
