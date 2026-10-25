import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';
import { KatexMath } from './KatexMath';

export const DominoSimulator: React.FC = () => {
  const [dominoCount, setDominoCount] = useState<number>(8);
  const [fallenIndices, setFallenIndices] = useState<Set<number>>(new Set());
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [breakAt, setBreakAt] = useState<number | null>(null); // jika rantai induksi diputus
  const [basisFailed, setBasisFailed] = useState<boolean>(false); // jika basis P(1) gagal
  const [statusMessage, setStatusMessage] = useState<string>('Siap untuk melakukan uji efek domino.');
  const timerRef = useRef<number | null>(null);

  const resetSimulation = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setFallenIndices(new Set());
    setStatusMessage('Simulasi direset. Klik "Jatuhkan Domino Pertama" untuk memulai.');
  };

  const startSimulation = () => {
    resetSimulation();
    setIsRunning(true);

    if (basisFailed) {
      setStatusMessage('❌ BASIS GAGAL: Domino pertama P(1) tidak didorong! Tidak ada efek domino yang terjadi.');
      setIsRunning(false);
      return;
    }

    setStatusMessage('🚀 BASIS BERHASIL: Domino P(1) mulai jatuh...');
    let current = 1;

    timerRef.current = window.setInterval(() => {
      if (breakAt !== null && current === breakAt) {
        setStatusMessage(
          `⚠️ LANGKAH INDUKSI PUTUS di k = ${breakAt - 1}! Domino P(${breakAt - 1}) tidak dapat menjatuhkan P(${breakAt}). Efek domino terhenti!`
        );
        if (timerRef.current) clearInterval(timerRef.current);
        setIsRunning(false);
        return;
      }

      setFallenIndices((prev) => {
        const next = new Set(prev);
        next.add(current);
        return next;
      });

      if (current >= dominoCount) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsRunning(false);
        setStatusMessage(`🎉 SELURUH ${dominoCount} DOMINO RUNTUH! Terbukti benar untuk semua n ≥ 1 (Q.E.D.)`);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
        return;
      }

      current++;
    }, 450);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Header section with Double-Bezel */}
      <div className="bezel-shell">
        <div className="bezel-inner p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Slide 7 - 9 • Konsep Fisik Induksi Matematika
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Simulator Interaktif Efek Domino
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                Induksi matematika bekerja persis seperti efek domino runtuh. Domino pertama yang didorong mewakili{' '}
                <strong className="text-indigo-300">Basis Induksi P(1)</strong>, dan setiap domino yang menjatuhkan domino sesudahnya mewakili{' '}
                <strong className="text-purple-300">Langkah Induksi P(k) ⇒ P(k+1)</strong>.
              </p>
            </div>

            {/* Quick Math Preview */}
            <div className="math-card p-4 rounded-xl border border-white/10 min-w-[240px]">
              <div className="text-[11px] font-mono text-slate-400 mb-1">Prinsip Induksi Sederhana:</div>
              <div className="text-xs text-indigo-300">
                <KatexMath math="P(1) \\land [P(k) \\implies P(k+1)] \\implies \\forall n \\ge 1, P(n)" block />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Domino Arena */}
      <div className="bezel-shell">
        <div className="bezel-inner p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-glow" />

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <button
                onClick={startSimulation}
                disabled={isRunning}
                className="btn-nested bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white hover:brightness-110 shadow-lg shadow-indigo-500/25 disabled:opacity-50"
              >
                <span>{isRunning ? 'Sedang Berjalan...' : 'Jatuhkan Domino Pertama'}</span>
                <span className="icon-bubble bg-white/20">
                  <Play className="w-4 h-4 fill-white" />
                </span>
              </button>

              <button
                onClick={resetSimulation}
                className="btn-nested bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-white/10"
              >
                <span>Reset</span>
                <span className="icon-bubble bg-slate-700">
                  <RotateCcw className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>

            {/* Domino count slider */}
            <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-full border border-white/10 text-xs">
              <span className="text-slate-400">Jumlah Domino (n):</span>
              <input
                type="range"
                min={4}
                max={12}
                value={dominoCount}
                onChange={(e) => {
                  setDominoCount(Number(e.target.value));
                  resetSimulation();
                }}
                disabled={isRunning}
                className="w-24 accent-indigo-500 cursor-pointer"
              />
              <span className="font-mono font-bold text-indigo-400 text-sm w-4">{dominoCount}</span>
            </div>
          </div>

          {/* Fault Injection / Experiment toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
            <button
              onClick={() => {
                setBasisFailed(!basisFailed);
                resetSimulation();
              }}
              className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                basisFailed
                  ? 'bg-red-500/10 border-red-500/40 text-red-200'
                  : 'bg-slate-900/40 border-white/5 hover:border-white/10 text-slate-400'
              }`}
            >
              <ShieldAlert className={`w-5 h-5 shrink-0 mt-0.5 ${basisFailed ? 'text-red-400' : 'text-slate-500'}`} />
              <div className="text-xs">
                <div className="font-semibold text-white">Eksperimen: Matikan Basis P(1)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Jika basis salah, domino pertama tidak pernah didorong sehingga pembuktian gagal total.
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setBreakAt(breakAt === null ? Math.floor(dominoCount / 2) + 1 : null);
                resetSimulation();
              }}
              className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                breakAt !== null
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                  : 'bg-slate-900/40 border-white/5 hover:border-white/10 text-slate-400'
              }`}
            >
              <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${breakAt !== null ? 'text-amber-400' : 'text-slate-500'}`} />
              <div className="text-xs">
                <div className="font-semibold text-white">Eksperimen: Putus Langkah Induksi P(k) ⇏ P(k+1)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Membuat celah di domino ke-{Math.floor(dominoCount / 2) + 1} agar Anda melihat bagaimana jika langkah induksi tidak terbukti.
                </div>
              </div>
            </button>
          </div>

          {/* Visual Domino Runway */}
          <div className="relative py-12 px-4 bg-slate-950/70 rounded-2xl border border-white/5 overflow-x-auto min-h-[220px] flex items-center justify-start sm:justify-center">
            {/* Floor line */}
            <div className="absolute bottom-10 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

            <div className="flex items-end gap-5 sm:gap-7 pt-4 pb-2">
              {Array.from({ length: dominoCount }, (_, i) => i + 1).map((idx) => {
                const isFallen = fallenIndices.has(idx);
                const isBrokenGap = breakAt === idx;

                return (
                  <div key={idx} className="relative flex flex-col items-center">
                    {/* Broken indicator tag */}
                    {isBrokenGap && (
                      <div className="absolute -top-7 text-[10px] font-mono text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30 whitespace-nowrap">
                        Celah Terputus!
                      </div>
                    )}

                    {/* Domino Body */}
                    <div
                      className={`domino-tile w-10 sm:w-12 h-28 sm:h-32 rounded-lg border flex flex-col justify-between p-2 shadow-xl cursor-pointer select-none transition-transform duration-500 ${
                        isFallen
                          ? 'fallen bg-gradient-to-br from-indigo-900/90 to-purple-950/90 border-indigo-400/50 shadow-indigo-500/20'
                          : idx === 1
                          ? 'bg-gradient-to-b from-indigo-800 to-slate-900 border-indigo-400 shadow-indigo-500/30 ring-2 ring-indigo-500/20'
                          : 'bg-gradient-to-b from-slate-800 to-slate-900 border-slate-700/80 hover:border-slate-500'
                      }`}
                      style={{
                        marginRight: isBrokenGap ? '1.5rem' : '0'
                      }}
                    >
                      {/* Top Face */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-slate-300">
                          P({idx})
                        </span>
                        <div className={`w-2 h-2 rounded-full ${isFallen ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                      </div>

                      {/* Middle divider */}
                      <div className="w-full h-[1px] bg-white/10" />

                      {/* Bottom Face */}
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-xs font-mono font-extrabold text-white">
                          n = {idx}
                        </span>
                        <span className="text-[9px] text-slate-400">
                          {idx === 1 ? 'Basis' : 'Langkah'}
                        </span>
                      </div>
                    </div>

                    {/* Domino Index Floor Label */}
                    <span className="text-[11px] font-mono text-slate-400 mt-2 font-semibold">
                      #{idx}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Alert Bar */}
          <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {isRunning ? (
                <div className="w-3 h-3 rounded-full bg-indigo-500 animate-ping" />
              ) : fallenIndices.size === dominoCount ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <HelpCircle className="w-5 h-5 text-slate-400 shrink-0" />
              )}
              <span className="text-sm font-medium text-slate-200">{statusMessage}</span>
            </div>

            <div className="text-xs font-mono text-slate-400 shrink-0">
              Runtuh: <span className="text-indigo-400 font-bold">{fallenIndices.size}</span> / {dominoCount}
            </div>
          </div>

          {/* Educational Callout */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
            <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 space-y-1.5">
              <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                1. Basis Induksi P(1)
              </div>
              <p>
                Menjatuhkan domino pertama secara manual membuktikan bahwa teorema berlaku untuk nilai mula-mula
                (misal n = 1 atau n = n₀). Tanpa dorongan ini, tidak akan ada gerakan apapun.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 space-y-1.5">
              <div className="font-semibold text-purple-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                2. Langkah Induksi P(k) ⇒ P(k+1)
              </div>
              <p>
                Memastikan setiap domino berjarak cukup dekat sehingga ketika domino ke-k jatuh, ia PASTI
                menjatuhkan domino ke-(k+1). Dengan dua syarat ini, seluruh domino hingga tak hingga pasti runtuh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
