import React, { useState } from 'react';
import { Play, RotateCcw, StepForward, CheckCircle2, Code2, Terminal, Info } from 'lucide-react';
import { KatexMath } from './KatexMath';

interface LoopState {
  iteration: number;
  r: number;
  k: number;
  invariantValue: number;
  explanation: string;
}

export const LoopInvariantLab: React.FC = () => {
  const [baseA, setBaseA] = useState<number>(3);
  const [exponentM, setExponentM] = useState<number>(4);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [history, setHistory] = useState<LoopState[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const targetResult = Math.pow(baseA, exponentM);

  // Initialize or reset loop trace
  const resetLab = () => {
    setCurrentStep(0);
    setIsFinished(false);
    const initial: LoopState = {
      iteration: 0,
      r: 1,
      k: exponentM,
      invariantValue: 1 * Math.pow(baseA, exponentM),
      explanation: `Sebelum loop (Basis n=0): r=1, k=${exponentM}. Invariant r × a^k = 1 × ${baseA}^${exponentM} = ${targetResult}.`
    };
    setHistory([initial]);
  };

  const handleStepForward = () => {
    if (history.length === 0) {
      resetLab();
      return;
    }
    const last = history[history.length - 1];
    if (last.k <= 0) {
      setIsFinished(true);
      return;
    }

    const nextR = last.r * baseA;
    const nextK = last.k - 1;
    const nextInv = nextR * Math.pow(baseA, nextK);
    const nextIter = last.iteration + 1;

    const nextState: LoopState = {
      iteration: nextIter,
      r: nextR,
      k: nextK,
      invariantValue: nextInv,
      explanation: `Iterasi #${nextIter}: r baru = ${last.r} × ${baseA} = ${nextR}, k baru = ${last.k} - 1 = ${nextK}. Invariant ${nextR} × ${baseA}^${nextK} = ${nextInv}.`
    };

    setHistory((prev) => [...prev, nextState]);
    setCurrentStep(nextIter);

    if (nextK === 0) {
      setIsFinished(true);
    }
  };

  const handleRunAll = () => {
    let r = 1;
    let k = exponentM;
    let iter = 0;
    const allStates: LoopState[] = [
      {
        iteration: 0,
        r: 1,
        k: exponentM,
        invariantValue: 1 * Math.pow(baseA, exponentM),
        explanation: `Basis n=0: r=1, k=${exponentM}. Invariant = ${targetResult}.`
      }
    ];

    while (k > 0) {
      r = r * baseA;
      k = k - 1;
      iter++;
      allStates.push({
        iteration: iter,
        r,
        k,
        invariantValue: r * Math.pow(baseA, k),
        explanation: `Iterasi #${iter}: r=${r}, k=${k}. Invariant r × a^k = ${r * Math.pow(baseA, k)}.`
      });
    }

    setHistory(allStates);
    setCurrentStep(iter);
    setIsFinished(true);
  };

  // Run initial state once on load
  React.useEffect(() => {
    resetLab();
  }, [baseA, exponentM]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bezel-shell">
        <div className="bezel-inner p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wider uppercase">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                Slide 20 - 22 • Algoritma & Loop Invariant
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Laboratorium Loop Invariant Exp(a, m)
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                Di ilmu komputer, induksi matematika dipakai membuktikan kebenaran algoritma perulangan melalui properti{' '}
                <strong className="text-indigo-300">Loop Invariant</strong>: kondisi yang selalu bernilai benar sebelum dan sesudah setiap putaran loop.
              </p>
            </div>

            <div className="math-card p-4 rounded-xl min-w-[240px]">
              <div className="text-[11px] font-mono text-slate-400 mb-1">Target Invariant:</div>
              <div className="text-xs text-indigo-300">
                <KatexMath math="r_n \\times a^{k_n} = a^m \\quad (\\text{Konstan untuk setiap } n)" block />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Code + Interactive Live State */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Algorithm Code & Parameters */}
        <div className="lg:col-span-5 space-y-6">
          {/* Parameter Inputs */}
          <div className="bezel-shell">
            <div className="bezel-inner p-5 space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                Parameter Algoritma Exp(a, m)
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Basis a:</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={baseA}
                    onChange={(e) => setBaseA(Math.max(1, Math.min(10, Number(e.target.value))))}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Eksponen m:</label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={exponentM}
                    onChange={(e) => setExponentM(Math.max(1, Math.min(8, Number(e.target.value))))}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300 flex items-center justify-between">
                <span>Target Nilai aᵐ:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {baseA}^{exponentM} = {targetResult.toLocaleString()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleStepForward}
                  disabled={isFinished}
                  className="flex-1 btn-nested bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40"
                >
                  <span>Step Iterasi</span>
                  <span className="icon-bubble bg-white/20">
                    <StepForward className="w-4 h-4" />
                  </span>
                </button>

                <button
                  onClick={handleRunAll}
                  disabled={isFinished}
                  className="btn-nested bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40"
                >
                  <span>Run</span>
                  <span className="icon-bubble bg-white/20">
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </span>
                </button>

                <button
                  onClick={resetLab}
                  className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Pseudocode View from Slide 20 */}
          <div className="bezel-shell">
            <div className="bezel-inner p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  Pseudocode dari Slide 20
                </div>
                <span className="text-[10px] font-mono text-slate-500">Algorithm Exp</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 leading-relaxed border border-white/5 space-y-1">
                <div><span className="text-purple-400">function</span> <span className="text-yellow-300">Exp</span>(a: integer, m: integer)</div>
                <div className="text-slate-500 pl-4">{'{ Menghitung aᵐ }'}</div>
                <div className="pl-4"><span className="text-indigo-400">r</span> ← 1</div>
                <div className="pl-4"><span className="text-indigo-400">k</span> ← m</div>
                <div className="pl-4 text-purple-400">while (k &gt; 0) {'{'}</div>
                <div className="pl-8 text-slate-200">r ← r * a</div>
                <div className="pl-8 text-slate-200">k ← k - 1</div>
                <div className="pl-4 text-purple-400">{'}'}</div>
                <div className="pl-4"><span className="text-emerald-400">return</span> r</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Step Execution Trace Table & Invariant Proof */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bezel-shell">
            <div className="bezel-inner p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-400" />
                  Tabel Jejak Eksekusi & Evaluasi Invariant
                </h2>
                <span className="text-xs font-mono text-slate-400">
                  Iterasi: <span className="text-indigo-400 font-bold">{currentStep}</span> / {exponentM}
                </span>
              </div>

              {/* Execution Trace Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="py-2.5 px-3">Iterasi (n)</th>
                      <th className="py-2.5 px-3">Variabel r</th>
                      <th className="py-2.5 px-3">Variabel k</th>
                      <th className="py-2.5 px-3 text-indigo-300">Invariant: r × aᵏ</th>
                      <th className="py-2.5 px-3 text-right">Status Invariant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {history.map((row) => {
                      const isCorrect = row.invariantValue === targetResult;
                      return (
                        <tr
                          key={row.iteration}
                          className={`transition-colors ${
                            row.iteration === currentStep ? 'bg-indigo-950/40' : 'hover:bg-slate-900/40'
                          }`}
                        >
                          <td className="py-2.5 px-3 text-slate-300">
                            {row.iteration === 0 ? '0 (Basis)' : `#${row.iteration}`}
                          </td>
                          <td className="py-2.5 px-3 text-white font-bold">{row.r.toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-slate-300">{row.k}</td>
                          <td className="py-2.5 px-3 text-indigo-300 font-bold">
                            {row.r} × {baseA}^{row.k} = {row.invariantValue.toLocaleString()}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            {isCorrect ? (
                              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                <CheckCircle2 className="w-3 h-3" /> Konstan (=aᵐ)
                              </span>
                            ) : (
                              <span className="text-red-400 text-[10px]">Cacat</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Termination Message */}
              {isFinished && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                  <div className="font-bold text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Loop Berhenti (Terminasi) pada k = 0
                  </div>
                  <p>
                    Saat kondisi while <span className="font-mono">k &gt; 0</span> bernilai false, kita mendapatkan{' '}
                    <span className="font-mono font-bold">k = 0</span>. Karena invariant{' '}
                    <span className="font-mono">r × a⁰ = aᵐ</span> tetap berlaku, maka{' '}
                    <span className="font-mono font-bold text-white">r × 1 = aᵐ ⟹ r = aᵐ</span>. Fungsi mengembalikan nilai r yang tepat bernilai aᵐ. Algoritma 100% terbukti benar!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
