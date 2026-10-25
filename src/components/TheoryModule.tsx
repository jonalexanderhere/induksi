import React from 'react';
import { BookOpen, CheckCircle, Lightbulb, Compass, Award } from 'lucide-react';
import { KatexMath } from './KatexMath';

export const TheoryModule: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bezel-shell">
        <div className="bezel-inner p-6 sm:p-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wider uppercase">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              Slide 1 - 16 • Teori Matematika Diskrit
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Prinsip & Landasan Induksi Matematika
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Induksi matematika adalah metode pembuktian deduktif baku untuk membuktikan pernyataan perihal bilangan bulat (integers).
              Metode ini mampu membuktikan kebenaran proposisi untuk tak hingga banyaknya bilangan hanya dalam 2 langkah.
            </p>
          </div>
        </div>
      </div>

      {/* Bento Grid Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Definisi & Hakikat */}
        <div className="bezel-shell">
          <div className="bezel-inner p-6 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Lightbulb className="w-4 h-4" />
              1. Definisi Induksi (Slide 3)
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span><strong>Metode Pembuktian Proposisi:</strong> Khusus digunakan untuk proposisi yang berkaitan dengan bilangan bulat (integers).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span><strong>Standar Mekanistis:</strong> Menjadi tolok ukur pembuktian mekanis (mechanical evidentiary standard) dalam matematika.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span><strong>Mereduksi Langkah:</strong> Mampu memangkas tak terhingga pengujian menjadi hanya 2 langkah pembuktian formal.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: Simple Induction Principle */}
        <div className="bezel-shell">
          <div className="bezel-inner p-6 space-y-4">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Compass className="w-4 h-4" />
              2. Prinsip Induksi Sederhana (Slide 6 - 7)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Misalkan P(n) adalah pernyataan tentang bilangan bulat positif. Untuk membuktikan P(n) benar untuk seluruh n ≥ 1, kita hanya perlu menunjukkan:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                <div className="font-bold text-indigo-300 mb-1">1. Basis Induksi (Induction Base):</div>
                <p className="text-slate-400">Tunjukkan bahwa P(1) bernilai BENAR.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                <div className="font-bold text-purple-300 mb-1">2. Langkah Induksi (Induction Step):</div>
                <p className="text-slate-400">
                  Tunjukkan bahwa jika P(n) diasumsikan benar (hipotesis induksi), maka P(n + 1) juga bernilai BENAR untuk setiap n ≥ 1.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Generalized Induction */}
        <div className="bezel-shell">
          <div className="bezel-inner p-6 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Award className="w-4 h-4" />
              3. Prinsip Induksi yang Dirampatkan (Slide 16)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kadang pernyataan tidak berlaku mulai n = 1, melainkan mulai bilangan bulat tertentu n₀ (misal n ≥ 0 atau n ≥ 7 seperti di Slide 18):
            </p>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 text-xs">
              <KatexMath math="P(n_0) \\text{ Benar} \\quad \\land \\quad [\\forall n \\ge n_0, P(n) \\implies P(n+1)] \\implies \\forall n \\ge n_0, P(n)" block />
            </div>
            <p className="text-[11px] text-slate-400">
              Contoh: Pertidaksamaan 3ⁿ &lt; n! dimulai dari n₀ = 7 karena untuk n ≤ 6, 3ⁿ masih lebih besar atau sama dengan n!.
            </p>
          </div>
        </div>

        {/* Card 4: Induksi Kuat (Strong Induction) */}
        <div className="bezel-shell">
          <div className="bezel-inner p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle className="w-4 h-4" />
              4. Prinsip Induksi Kuat (Strong Induction)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pada induksi kuat, langkah induksi tidak hanya mengasumsikan P(k) benar, melainkan mengasumsikan SELURUH kasus dari basis hingga k bernilai benar:
            </p>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 text-xs">
              <KatexMath math="[P(n_0) \\land P(n_0+1) \\land \\dots \\land P(k)] \\implies P(k+1)" block />
            </div>
            <p className="text-[11px] text-slate-400">
              Contoh: Masalah penukaran uang pecahan Rp 2.000 dan Rp 5.000 (Soal 4) serta faktorisasi bilangan prima.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
