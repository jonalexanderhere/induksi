import React, { useState } from 'react';
import { Bug, ShieldAlert, Sparkles } from 'lucide-react';
import { KatexMath } from './KatexMath';

export const FallacyDetective: React.FC = () => {
  const [testA, setTestA] = useState<number>(3);
  const [selectedInspectStep, setSelectedInspectStep] = useState<number>(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bezel-shell">
        <div className="bezel-inner p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold tracking-wider uppercase">
                <Bug className="w-3.5 h-3.5 text-red-400" />
                Slide 25 - 26 • Soal Latihan 8: Fallacy Pembuktian Induksi
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Detektif Fallacy: Membongkar Pembuktian Palsu aⁿ = 1
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                Di Slide 25 diberikan klaim mengejutkan bahwa "aⁿ = 1 untuk semua n ≥ 0". Secara logika kita tahu bahwa 3¹ = 3 ≠ 1.
                Namun langkah aljabarnya sekilas terlihat benar. Di mana tepatnya cacat fatal yang disembunyikan?
              </p>
            </div>

            <div className="math-card p-4 rounded-xl min-w-[240px] border-red-500/30">
              <div className="text-[11px] font-mono text-red-400 mb-1">Klaim Palsu:</div>
              <div className="text-xs text-red-300">
                <KatexMath math="a^{n+1} = \\frac{a^n \\cdot a^n}{a^{n-1}} = \\frac{1 \\times 1}{1} = 1 \\quad (\\text{SALAH})" block />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Demonstration Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Original Fake Proof Script */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bezel-shell">
            <div className="bezel-inner p-6 space-y-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Teks Asli Pembuktian Palsu (Slide 25)
              </h2>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-3 text-xs leading-relaxed text-slate-300">
                <div className="font-semibold text-white">
                  Klaim: Buktikan aⁿ = 1 untuk semua n ≥ 0 bilamana a adalah bilangan riil tidak-nol.
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                  <span className="font-bold">Basis Induksi:</span> Untuk n = 0, jelas a⁰ = 1 adalah benar sesuai definisi a⁰.
                </div>

                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 space-y-2">
                  <span className="font-bold">Langkah Induksi (Induksi Kuat):</span>
                  <p>
                    Misalkan pernyataan tersebut benar untuk 0, 1, 2, ..., n, yaitu a⁰ = 1, a¹ = 1, a² = 1, ..., aⁿ = 1.
                    Kita ingin memperlihatkan bahwa aⁿ⁺¹ = 1.
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded border border-white/10">
                    <KatexMath math="a^{n+1} = \\frac{a^n \\cdot a^n}{a^{n-1}} = \\frac{1 \\times 1}{1} = 1" block />
                  </div>
                  <p className="text-[11px] text-amber-300/80">
                    "Karena basis dan langkah terbukti, maka aⁿ = 1 untuk setiap n."
                  </p>
                </div>
              </div>

              {/* Live Variable Substituted Tester */}
              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">Uji dengan Contoh Konkret a:</span>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-400">Pilih a =</label>
                    <input
                      type="number"
                      min={2}
                      max={9}
                      value={testA}
                      onChange={(e) => setTestA(Math.max(2, Math.min(9, Number(e.target.value))))}
                      className="w-16 bg-slate-950 border border-white/20 rounded px-2 py-1 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg font-mono space-y-1">
                  <div>Untuk a = {testA}, coba uji transisi pertama saat <span className="text-amber-400 font-bold">n = 0</span>:</div>
                  <div className="text-red-400 pt-1">
                    a^(0+1) = a¹ = ({testA}⁰ · {testA}⁰) / {testA}^(0-1) = (1 · 1) / {testA}⁻¹
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    = 1 / (1/{testA}) = <span className="text-emerald-400 font-bold">{testA}</span> (bukan 1!)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Forensic Autopsy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bezel-shell">
            <div className="bezel-inner p-6 space-y-5">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                3 Kesalahan Fatal yang Ditemukan
              </h2>

              <div className="space-y-3">
                {[
                  {
                    step: 1,
                    title: '1. Suku a⁻¹ Berada di Luar Domain n ≥ 0',
                    severity: 'FATAL BREAK',
                    desc: 'Saat kita ingin membuktikan n = 1 dari n = 0, rumus memerlukan a^{n-1} = a^{0-1} = a⁻¹. Domain soal adalah bilangan bulat NON-NEGATIF (n ≥ 0). Nilai a⁻¹ tidak pernah terdefinisi dalam hipotesis induksi!'
                  },
                  {
                    step: 2,
                    title: '2. Induksi Kuat Membutuhkan DUA Basis Awal',
                    severity: 'LOGICAL FLAW',
                    desc: 'Rumus langkah induksi mengaitkan aⁿ⁺¹ dengan aⁿ⁻¹ (mundur 2 langkah ke belakang). Teorema induksi kuat mensyaratkan tersedianya DUA basis awal: P(0) DAN P(1). Namun P(1) menyatakan a¹ = 1, yang mana SALAH jika a ≠ 1.'
                  },
                  {
                    step: 3,
                    title: '3. Runtuhnya Domino Kedua (P(0) ⇏ P(1))',
                    severity: 'CHAIN COLLAPSE',
                    desc: 'Basis P(0): a⁰ = 1 memang benar. Namun domino pertama P(0) gagal menjatuhkan domino kedua P(1) karena jembatan mekanisnya terputus saat n = 0. Seluruh reaksi induksi berhenti seketika!'
                  }
                ].map((item) => (
                  <div
                    key={item.step}
                    onClick={() => setSelectedInspectStep(item.step)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedInspectStep === item.step
                        ? 'bg-indigo-950/40 border-indigo-500/50'
                        : 'bg-slate-900/40 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-white">{item.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Bottom Summary Callout */}
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200">
                <span className="font-bold">Pelajaran Berharga untuk Ujian:</span> Selalu periksa apakah langkah induksi Anda dapat diterapkan pada transisi paling pertama (dari basis pertama ke kasus berikutnya), dan pastikan jumlah basis mencukupi jika rumus langkah Anda melompat lebih dari 1 tingkat ke belakang!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
