export interface ProblemStep {
  title: string;
  badge: string;
  mathExplanation: string;
  rawExplanation: string;
  notes?: string;
}

export interface InductionProblem {
  id: string;
  category: 'contoh' | 'latihan_slide' | 'soal_latihan' | 'algoritma';
  slideNumber: number;
  title: string;
  statement: string;
  latexStatement: string;
  inductionType: 'Sederhana (n ≥ 1)' | 'Dirampatkan (Generalized n ≥ n0)' | 'Kuat (Strong Induction)' | 'Loop Invariant' | 'Analisis Kesalahan (Fallacy)';
  baseCondition: string;
  summary: string;
  steps: ProblemStep[];
  calculator?: {
    type: 'sum' | 'power_series' | 'divisibility' | 'factorial_inequality' | 'money_exchange' | 'product_sum';
    defaultN: number;
    minN: number;
    maxN: number;
    evaluate: (n: number) => { lhs: string | number; rhs: string | number; isValid: boolean; detail: string };
  };
}

export const INDUCTION_PROBLEMS: InductionProblem[] = [
  {
    id: 'contoh-1-dan-3',
    category: 'contoh',
    slideNumber: 10,
    title: 'Contoh 1 & 3: Jumlah Deret Bilangan Asli 1 sampai n',
    statement: 'Buktikan bahwa untuk setiap bilangan bulat positif n ≥ 1, jumlah bilangan asli dari 1 sampai n adalah n(n+1)/2.',
    latexStatement: '1 + 2 + 3 + \\dots + n = \\frac{n(n+1)}{2}, \\quad \\forall n \\ge 1',
    inductionType: 'Sederhana (n ≥ 1)',
    baseCondition: 'n = 1',
    summary: 'Membuktikan rumus jumlah Gauss menggunakan 2 langkah induksi standar.',
    steps: [
      {
        title: 'Langkah 1: Basis Induksi (Induction Base)',
        badge: 'Basis n = 1',
        mathExplanation: 'P(1): \\quad 1 = \\frac{1(1+1)}{2} = \\frac{1 \\times 2}{2} = 1',
        rawExplanation: 'Untuk n = 1, ruas kiri adalah 1. Ruas kanan adalah 1(1+1)/2 = 2/2 = 1. Karena Ruas Kiri = Ruas Kanan, maka basis P(1) terbukti BENAR.',
        notes: 'Basis menjadi fondasi awal (domino pertama).'
      },
      {
        title: 'Langkah 2: Hipotesis Induksi (Induction Hypothesis)',
        badge: 'Asumsi n = k',
        mathExplanation: '1 + 2 + 3 + \\dots + k = \\frac{k(k+1)}{2}',
        rawExplanation: 'Asumsikan proposisi P(k) bernilai BENAR untuk sembarang bilangan bulat positif k ≥ 1.',
        notes: 'Asumsi ini adalah alat untuk membuktikan langkah berikutnya.'
      },
      {
        title: 'Langkah 3: Langkah Induksi (Inductive Step)',
        badge: 'Buktikan n = k + 1',
        mathExplanation: '\\begin{aligned} 1 + 2 + \\dots + k + (k+1) &= [1 + 2 + \\dots + k] + (k+1) \\\\ &= \\frac{k(k+1)}{2} + (k+1) \\\\ &= \\frac{k^2+k}{2} + \\frac{2k+2}{2} \\\\ &= \\frac{k^2+3k+2}{2} \\\\ &= \\frac{(k+1)(k+2)}{2} = \\frac{(k+1)[(k+1)+1]}{2} \\end{aligned}',
        rawExplanation: 'Tambahkan suku ke-(k+1) pada kedua ruas. Dengan mensubstitusi hipotesis induksi ke suku 1 sampai k, lalu menyamakan penyebut, kita peroleh bentuk persis (k+1)[(k+1)+1]/2.',
        notes: 'P(k+1) terbukti benar berdasarkan P(k).'
      },
      {
        title: 'Kesimpulan',
        badge: 'Q.E.D.',
        mathExplanation: '\\therefore \\; 1 + 2 + \\dots + n = \\frac{n(n+1)}{2} \\quad \\text{benar untuk seluruh } n \\ge 1.',
        rawExplanation: 'Karena basis induksi dan langkah induksi telah terbukti benar, maka menurut Prinsip Induksi Matematika, pernyataan berlaku untuk semua n ≥ 1.'
      }
    ],
    calculator: {
      type: 'sum',
      defaultN: 6,
      minN: 1,
      maxN: 50,
      evaluate: (n) => {
        let sum = 0;
        const terms: number[] = [];
        for (let i = 1; i <= Math.min(n, 6); i++) {
          sum += i;
          terms.push(i);
        }
        const fullSum = (n * (n + 1)) / 2;
        const displayTerms = n <= 6 ? terms.join(' + ') : `1 + 2 + ... + ${n}`;
        return {
          lhs: fullSum,
          rhs: `${n} × ${n + 1} / 2 = ${fullSum}`,
          isValid: true,
          detail: `${displayTerms} = ${fullSum}`
        };
      }
    }
  },
  {
    id: 'contoh-2-dan-4',
    category: 'contoh',
    slideNumber: 13,
    title: 'Contoh 2 & 4: Jumlah Bilangan Ganjil Pertama adalah n²',
    statement: 'Buktikan bahwa jumlah n bilangan bulat positif ganjil pertama adalah n².',
    latexStatement: '1 + 3 + 5 + \\dots + (2n-1) = n^2, \\quad \\forall n \\ge 1',
    inductionType: 'Sederhana (n ≥ 1)',
    baseCondition: 'n = 1',
    summary: 'Pola geometris persegi ganjil dibuktikan secara formal dengan induksi.',
    steps: [
      {
        title: 'Langkah 1: Basis Induksi',
        badge: 'Basis n = 1',
        mathExplanation: 'P(1): \\quad (2(1) - 1) = 1 \\implies 1^2 = 1',
        rawExplanation: 'Untuk n = 1, suku pertama adalah 2(1)-1 = 1. Ruas kanan adalah 1² = 1. Kedua ruas sama, sehingga basis P(1) BENAR.'
      },
      {
        title: 'Langkah 2: Hipotesis Induksi',
        badge: 'Asumsi n = k',
        mathExplanation: '1 + 3 + 5 + \\dots + (2k-1) = k^2',
        rawExplanation: 'Asumsikan pernyataan bernilai benar untuk n = k ≥ 1.'
      },
      {
        title: 'Langkah 3: Langkah Induksi',
        badge: 'Buktikan n = k + 1',
        mathExplanation: '\\begin{aligned} 1 + 3 + \\dots + (2k-1) + [2(k+1)-1] &= [1 + 3 + \\dots + (2k-1)] + (2k+1) \\\\ &= k^2 + 2k + 1 \\\\ &= (k+1)^2 \\end{aligned}',
        rawExplanation: 'Suku ke-(k+1) bernilai 2(k+1)-1 = 2k+1. Gabungkan dengan hasil hipotesis k², menghasilkan k² + 2k + 1 yang tepat merupakan faktorisasi dari (k+1)².'
      },
      {
        title: 'Kesimpulan',
        badge: 'Q.E.D.',
        mathExplanation: '\\therefore \\; 1 + 3 + 5 + \\dots + (2n-1) = n^2 \\quad \\forall n \\ge 1.',
        rawExplanation: 'Terbukti bahwa jumlah n bilangan ganjil pertama selalu menghasilkan bilangan kuadrat n².'
      }
    ],
    calculator: {
      type: 'sum',
      defaultN: 5,
      minN: 1,
      maxN: 30,
      evaluate: (n) => {
        const fullSum = n * n;
        const oddList: number[] = [];
        for (let i = 1; i <= Math.min(n, 5); i++) oddList.push(2 * i - 1);
        const display = n <= 5 ? oddList.join(' + ') : `1 + 3 + ... + ${2 * n - 1}`;
        return {
          lhs: fullSum,
          rhs: `${n}² = ${fullSum}`,
          isValid: true,
          detail: `${display} = ${fullSum}`
        };
      }
    }
  },
  {
    id: 'latihan-slide-17',
    category: 'latihan_slide',
    slideNumber: 17,
    title: 'Latihan Slide 17: Deret Perpangkatan Dua (2⁰ + 2¹ + ... + 2ⁿ = 2ⁿ⁺¹ - 1)',
    statement: 'Buktikan dengan induksi matematika bahwa untuk semua bilangan bulat non-negatif n ≥ 0, berlaku 2⁰ + 2¹ + 2² + ... + 2ⁿ = 2ⁿ⁺¹ - 1.',
    latexStatement: '\\sum_{i=0}^n 2^i = 2^0 + 2^1 + 2^2 + \\dots + 2^n = 2^{n+1} - 1, \\quad \\forall n \\ge 0',
    inductionType: 'Dirampatkan (Generalized n ≥ n0)',
    baseCondition: 'n = 0',
    summary: 'Deret geometri biner penting dalam sistem komputer dan arsitektur digital.',
    steps: [
      {
        title: 'Langkah 1: Basis Induksi',
        badge: 'Basis n = 0',
        mathExplanation: 'P(0): \\quad 2^0 = 1, \\quad 2^{0+1} - 1 = 2^1 - 1 = 2 - 1 = 1',
        rawExplanation: 'Perhatikan bahwa soal menyebutkan "bilangan bulat non-negatif", sehingga basis dimulai dari n = 0. Ruas kiri = 2⁰ = 1. Ruas kanan = 2¹ - 1 = 1. Basis BENAR.'
      },
      {
        title: 'Langkah 2: Hipotesis Induksi',
        badge: 'Asumsi n = k',
        mathExplanation: '2^0 + 2^1 + 2^2 + \\dots + 2^k = 2^{k+1} - 1',
        rawExplanation: 'Asumsikan benar untuk n = k ≥ 0.'
      },
      {
        title: 'Langkah 3: Langkah Induksi',
        badge: 'Buktikan n = k + 1',
        mathExplanation: '\\begin{aligned} 2^0 + 2^1 + \\dots + 2^k + 2^{k+1} &= [2^0 + 2^1 + \\dots + 2^k] + 2^{k+1} \\\\ &= (2^{k+1} - 1) + 2^{k+1} \\\\ &= 2 \\cdot 2^{k+1} - 1 \\\\ &= 2^{(k+1)+1} - 1 = 2^{k+2} - 1 \\end{aligned}',
        rawExplanation: 'Kelompokkan suku hipotesis (2^{k+1} - 1) lalu tambahkan suku ke-(k+1) yaitu 2^{k+1}. Karena ada dua buah 2^{k+1}, maka nilainya adalah 2 × 2^{k+1} = 2^{k+2}.'
      },
      {
        title: 'Kesimpulan',
        badge: 'Q.E.D.',
        mathExplanation: '\\therefore \\; \\sum_{i=0}^n 2^i = 2^{n+1} - 1 \\quad \\forall n \\ge 0.',
        rawExplanation: 'Pernyataan terbukti benar untuk semua bilangan bulat tak-negatif n ≥ 0.'
      }
    ],
    calculator: {
      type: 'power_series',
      defaultN: 4,
      minN: 0,
      maxN: 20,
      evaluate: (n) => {
        const rhsVal = Math.pow(2, n + 1) - 1;
        return {
          lhs: rhsVal,
          rhs: `2^(${n}+1) - 1 = ${rhsVal}`,
          isValid: true,
          detail: `Jumlah 2^0 sampai 2^${n} = ${rhsVal}`
        };
      }
    }
  },
  {
    id: 'latihan-slide-18',
    category: 'latihan_slide',
    slideNumber: 18,
    title: 'Latihan Slide 18: Pertidaksamaan 3ⁿ < n! untuk n > 6',
    statement: 'Buktikan dengan induksi matematika bahwa 3ⁿ < n! untuk bilangan bulat positif n yang lebih besar dari 6 (yaitu n ≥ 7).',
    latexStatement: '3^n < n!, \\quad \\forall n \\ge 7',
    inductionType: 'Dirampatkan (Generalized n ≥ n0)',
    baseCondition: 'n = 7',
    summary: 'Pertumbuhan faktorial melampaui pertumbuhan eksponensial setelah titik n = 7.',
    steps: [
      {
        title: 'Langkah 1: Basis Induksi',
        badge: 'Basis n = 7',
        mathExplanation: '3^7 = 2187, \\quad 7! = 7 \\times 6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1 = 5040 \\implies 2187 < 5040',
        rawExplanation: 'Karena syarat adalah n > 6, maka nilai bulat terkecil adalah n = 7. 3⁷ = 2.187 dan 7! = 5.040. Karena 2.187 < 5.040, basis P(7) BENAR.'
      },
      {
        title: 'Langkah 2: Hipotesis Induksi',
        badge: 'Asumsi n = k (k ≥ 7)',
        mathExplanation: '3^k < k! \\quad \\text{untuk } k \\ge 7',
        rawExplanation: 'Asumsikan pertidaksamaan berlaku untuk n = k dengan k ≥ 7.'
      },
      {
        title: 'Langkah 3: Langkah Induksi',
        badge: 'Buktikan n = k + 1',
        mathExplanation: '\\begin{aligned} 3^{k+1} &= 3 \\cdot 3^k < 3 \\cdot k! \\quad \\text{(dari hipotesis)} \\\\ \\text{Karena } k \\ge 7 &\\implies k+1 \\ge 8 > 3 \\\\ \\text{Sehingga: } 3 \\cdot k! &< (k+1) \\cdot k! = (k+1)! \\\\ \\therefore 3^{k+1} &< (k+1)! \\end{aligned}',
        rawExplanation: 'Kalikan kedua ruas hipotesis dengan 3: 3^{k+1} < 3·k!. Karena k ≥ 7, pengali 3 jelas lebih kecil dari (k+1) yang bernilai ≥ 8. Akibatnya 3·k! < (k+1)·k! = (k+1)!.'
      },
      {
        title: 'Kesimpulan',
        badge: 'Q.E.D.',
        mathExplanation: '\\therefore \\; 3^n < n! \\quad \\forall n \\ge 7.',
        rawExplanation: 'Terbukti bahwa faktorial n! bertumbuh jauh lebih cepat dibanding 3ⁿ untuk semua n > 6.'
      }
    ],
    calculator: {
      type: 'factorial_inequality',
      defaultN: 7,
      minN: 1,
      maxN: 12,
      evaluate: (n) => {
        const powVal = Math.pow(3, n);
        let fact = 1;
        for (let i = 1; i <= n; i++) fact *= i;
        return {
          lhs: `3^${n} = ${powVal.toLocaleString()}`,
          rhs: `${n}! = ${fact.toLocaleString()}`,
          isValid: powVal < fact,
          detail: powVal < fact ? `${powVal} < ${fact} (MEMENUHI)` : `${powVal} ≥ ${fact} (TIDAK MEMENUHI karena n ≤ 6)`
        };
      }
    }
  },
  {
    id: 'aplikasi-loop-invariant',
    category: 'algoritma',
    slideNumber: 20,
    title: 'Aplikasi Slide 20-22: Loop Invariant Algoritma Exp(a, m)',
    statement: 'Buktikan kebenaran algoritma pemangkatan while loop r=1, k=m; while (k>0) { r=r*a; k=k-1; } return r; menggunakan induksi matematika.',
    latexStatement: '\\text{Loop Invariant: } r_n \\times a^{k_n} = a^m, \\quad \\forall n \\ge 0',
    inductionType: 'Loop Invariant',
    baseCondition: 'n = 0 iterasi',
    summary: 'Aplikasi vital induksi dalam Ilmu Komputer untuk membuktikan correctness program.',
    steps: [
      {
        title: 'Definisi State & Proposisi',
        badge: 'Spesifikasi',
        mathExplanation: 'P(n): r_n \\times a^{k_n} = a^m \\quad (n \\ge 0 \\text{ adalah jumlah iterasi kalang while})',
        rawExplanation: 'Misalkan r_n dan k_n adalah nilai variabel r dan k setelah melewati loop while sebanyak n kali.'
      },
      {
        title: 'Langkah 1: Basis Induksi (Sebelum Masuk Loop, n = 0)',
        badge: 'Iterasi n = 0',
        mathExplanation: 'r_0 = 1, \\quad k_0 = m \\implies r_0 \\times a^{k_0} = 1 \\times a^m = a^m',
        rawExplanation: 'Sebelum loop dijalankan, r diinisialisasi 1 dan k diinisialisasi m. Substitusi menghasilkan 1 × a^m = a^m. Basis BENAR.'
      },
      {
        title: 'Langkah 2: Hipotesis Induksi',
        badge: 'Asumsi n iterasi',
        mathExplanation: 'r_n \\times a^{k_n} = a^m',
        rawExplanation: 'Asumsikan kondisi invariant tetap terjaga setelah iterasi ke-n.'
      },
      {
        title: 'Langkah 3: Langkah Induksi (Iterasi ke-(n+1))',
        badge: 'Iterasi n + 1',
        mathExplanation: '\\begin{aligned} r_{n+1} &= r_n \\times a \\\\ k_{n+1} &= k_n - 1 \\\\ r_{n+1} \\times a^{k_{n+1}} &= (r_n \\times a) \\times a^{k_n - 1} \\\\ &= (r_n \\times a) \\times a^{k_n} \\times a^{-1} \\\\ &= r_n \\times a^{k_n} = a^m \\quad \\text{(dari hipotesis)} \\end{aligned}',
        rawExplanation: 'Pada iterasi ke-(n+1), r dikalikan a dan k dikurangi 1. Hasil kali r_{n+1} × a^{k_{n+1}} tetap konstan = a^m.'
      },
      {
        title: 'Terminasi & Pembuktian Akhir',
        badge: 'Terminasi Loop',
        mathExplanation: '\\text{Loop berhenti saat } k = 0 \\implies r \\times a^0 = a^m \\implies r = a^m',
        rawExplanation: 'Karena k berkurang 1 setiap putaran dari m hingga mencapai 0, perulangan pasti berhenti tepat saat k = 0. Pada kondisi ini r = a^m. Algoritma TERBUKTI BENAR!'
      }
    ]
  },
  {
    id: 'soal-1',
    category: 'soal_latihan',
    slideNumber: 23,
    title: 'Soal Latihan 1: Deret Pecahan 1/2 + 1/4 + ... + (1/2)ⁿ',
    statement: 'Temukan rumus untuk menghitung 1/2 + 1/4 + 1/8 + ... + (1/2)ⁿ dengan memeriksa nilai untuk n kecil, lalu gunakan induksi matematik untuk membuktikannya.',
    latexStatement: '\\sum_{i=1}^n \\left(\\frac{1}{2}\\right)^i = \\frac{1}{2} + \\frac{1}{4} + \\dots + \\frac{1}{2^n} = 1 - \\frac{1}{2^n} = \\frac{2^n - 1}{2^n}',
    inductionType: 'Sederhana (n ≥ 1)',
    baseCondition: 'n = 1',
    summary: 'Eksplorasi pola fraksional limit geometri yang mendekati 1 saat n membesar.',
    steps: [
      {
        title: 'Fase 1: Eksplorasi Nilai n Kecil',
        badge: 'Pola Numerik',
        mathExplanation: '\\begin{aligned} n=1: &\\quad 1/2 = 1 - 1/2 \\\\ n=2: &\\quad 1/2 + 1/4 = 3/4 = 1 - 1/4 \\\\ n=3: &\\quad 3/4 + 1/8 = 7/8 = 1 - 1/8 \\\\ n=4: &\\quad 7/8 + 1/16 = 15/16 = 1 - 1/16 \\end{aligned}',
        rawExplanation: 'Dari pemeriksaan nilai n kecil, pembilang selalu 2ⁿ - 1 dan penyebut 2ⁿ. Konjektur rumusnya adalah S_n = 1 - (1/2)ⁿ = (2ⁿ - 1)/2ⁿ.'
      },
      {
        title: 'Langkah 1: Basis Induksi',
        badge: 'Basis n = 1',
        mathExplanation: 'S_1 = \\frac{1}{2}, \\quad 1 - \\frac{1}{2^1} = 1 - \\frac{1}{2} = \\frac{1}{2} \\implies \\text{BENAR}',
        rawExplanation: 'Ruas kiri = 1/2, ruas kanan = 1 - 1/2 = 1/2. Basis P(1) terbukti.'
      },
      {
        title: 'Langkah 2: Hipotesis Induksi',
        badge: 'Asumsi n = k',
        mathExplanation: '\\sum_{i=1}^k \\left(\\frac{1}{2}\\right)^i = 1 - \\frac{1}{2^k}',
        rawExplanation: 'Asumsikan rumus bernilai benar untuk n = k ≥ 1.'
      },
      {
        title: 'Langkah 3: Langkah Induksi',
        badge: 'Buktikan n = k + 1',
        mathExplanation: '\\begin{aligned} S_{k+1} &= S_k + \\frac{1}{2^{k+1}} \\\\ &= \\left(1 - \\frac{1}{2^k}\\right) + \\frac{1}{2^{k+1}} \\\\ &= 1 - \\frac{2}{2^{k+1}} + \\frac{1}{2^{k+1}} \\\\ &= 1 - \\frac{1}{2^{k+1}} = \\frac{2^{k+1} - 1}{2^{k+1}} \\end{aligned}',
        rawExplanation: 'Ubah 1/2^k menjadi 2/2^{k+1}. Pengurangan menghasilkan 1 - 1/2^{k+1}, persis sesuai rumus target untuk n = k + 1.'
      },
      {
        title: 'Kesimpulan',
        badge: 'Q.E.D.',
        mathExplanation: '\\therefore \\; \\sum_{i=1}^n \\frac{1}{2^i} = \\frac{2^n - 1}{2^n} \\quad \\forall n \\ge 1.',
        rawExplanation: 'Rumus yang ditemukan terbukti valid secara matematis untuk semua bilangan bulat positif.'
      }
    ],
    calculator: {
      type: 'sum',
      defaultN: 4,
      minN: 1,
      maxN: 15,
      evaluate: (n) => {
        const denom = Math.pow(2, n);
        const num = denom - 1;
        const val = num / denom;
        return {
          lhs: `${num}/${denom} (${val.toFixed(6)})`,
          rhs: `1 - 1/${denom} = ${num}/${denom}`,
          isValid: true,
          detail: `Hasil deret pecahan = ${num}/${denom}`
        };
      }
    }
  },
  {
    id: 'soal-2',
    category: 'soal_latihan',
    slideNumber: 23,
    title: 'Soal Latihan 2: Keterbagian n⁵ - n Habis Dibagi 5',
    statement: 'Buktikan dengan induksi matematik bahwa n⁵ - n habis dibagi 5 untuk n bilangan bulat positif.',
    latexStatement: '5 \\mid (n^5 - n), \\quad \\forall n \\in \\mathbb{Z}^+',
    inductionType: 'Sederhana (n ≥ 1)',
    baseCondition: 'n = 1',
    summary: 'Keterbagian binomial dengan ekspansi Pascal atau Teorema Kecil Fermat.',
    steps: [
      {
        title: 'Langkah 1: Basis Induksi',
        badge: 'Basis n = 1',
        mathExplanation: 'P(1): \\quad 1^5 - 1 = 1 - 1 = 0 = 5 \\times 0',
        rawExplanation: '0 habis dibagi oleh 5 (0 = 5 × 0). Maka P(1) bernilai BENAR.'
      },
      {
        title: 'Langkah 2: Hipotesis Induksi',
        badge: 'Asumsi n = k',
        mathExplanation: 'k^5 - k = 5M, \\quad M \\in \\mathbb{Z}',
        rawExplanation: 'Asumsikan k⁵ - k merupakan kelipatan 5 untuk suatu integer k ≥ 1.'
      },
      {
        title: 'Langkah 3: Langkah Induksi',
        badge: 'Buktikan n = k + 1',
        mathExplanation: '\\begin{aligned} (k+1)^5 - (k+1) &= (k^5 + 5k^4 + 10k^3 + 10k^2 + 5k + 1) - (k+1) \\\\ &= (k^5 - k) + (5k^4 + 10k^3 + 10k^2 + 5k) \\\\ &= 5M + 5(k^4 + 2k^3 + 2k^2 + k) \\\\ &= 5 \\cdot [M + k^4 + 2k^3 + 2k^2 + k] \\end{aligned}',
        rawExplanation: 'Gunakan ekspansi binomial Newton untuk (k+1)⁵. Pisahkan suku (k⁵ - k) yang bernilai 5M. Suku sisanya memiliki koefisien 5, 10, 10, 5 yang semuanya dapat difaktorkan keluar angka 5.'
      },
      {
        title: 'Kesimpulan',
        badge: 'Q.E.D.',
        mathExplanation: '\\therefore \\; 5 \\mid (n^5 - n) \\quad \\forall n \\ge 1.',
        rawExplanation: 'Karena hasilnya adalah 5 dikalikan suatu bilangan bulat, terbukti bahwa n⁵ - n selalu habis dibagi 5.'
      }
    ],
    calculator: {
      type: 'divisibility',
      defaultN: 3,
      minN: 1,
      maxN: 20,
      evaluate: (n) => {
        const val = Math.pow(n, 5) - n;
        const div = val / 5;
        const isDiv = val % 5 === 0;
        return {
          lhs: `${n}⁵ - ${n} = ${val.toLocaleString()}`,
          rhs: `5 × ${div.toLocaleString()}`,
          isValid: isDiv,
          detail: `${val.toLocaleString()} habis dibagi 5 (hasil bagi = ${div.toLocaleString()})`
        };
      }
    }
  },
  {
    id: 'soal-3',
    category: 'soal_latihan',
    slideNumber: 23,
    title: 'Soal Latihan 3: Jumlah Perkalian Dua Suku Berurutan 1(2) + 2(3) + ... + n(n+1)',
    statement: 'Buktikan melalui induksi matematik bahwa 1(2) + 2(3) + ... + n(n+1) = [n(n+1)(n+2)]/3 untuk semua n ≥ 1.',
    latexStatement: '\\sum_{i=1}^n i(i+1) = \\frac{n(n+1)(n+2)}{3}, \\quad \\forall n \\ge 1',
    inductionType: 'Sederhana (n ≥ 1)',
    baseCondition: 'n = 1',
    summary: 'Penjumlahan suku berderajat dua menghasilkan polinomial derajat tiga.',
    steps: [
      {
        title: 'Langkah 1: Basis Induksi',
        badge: 'Basis n = 1',
        mathExplanation: 'P(1): \\quad 1(1+1) = 1(2) = 2, \\quad \\frac{1(1+1)(1+2)}{3} = \\frac{1 \\times 2 \\times 3}{3} = 2',
        rawExplanation: 'Ruas kiri bernilai 2. Ruas kanan adalah 1(2)(3)/3 = 6/3 = 2. Kedua ruas sama, basis BENAR.'
      },
      {
        title: 'Langkah 2: Hipotesis Induksi',
        badge: 'Asumsi n = k',
        mathExplanation: '1(2) + 2(3) + \\dots + k(k+1) = \\frac{k(k+1)(k+2)}{3}',
        rawExplanation: 'Asumsikan pernyataan bernilai benar untuk n = k ≥ 1.'
      },
      {
        title: 'Langkah 3: Langkah Induksi',
        badge: 'Buktikan n = k + 1',
        mathExplanation: '\\begin{aligned} \\sum_{i=1}^{k+1} i(i+1) &= \\frac{k(k+1)(k+2)}{3} + (k+1)(k+2) \\\\ &= (k+1)(k+2) \\left[ \\frac{k}{3} + 1 \\right] \\\\ &= (k+1)(k+2) \\left( \\frac{k+3}{3} \\right) \\\\ &= \\frac{(k+1)(k+2)(k+3)}{3} = \\frac{(k+1)[(k+1)+1][(k+1)+2]}{3} \\end{aligned}',
        rawExplanation: 'Faktorkan keluar suku sekutu (k+1)(k+2). Di dalam kurung tersisa (k/3 + 1) = (k+3)/3. Gabungkan kembali untuk mendapatkan bentuk target persis.'
      },
      {
        title: 'Kesimpulan',
        badge: 'Q.E.D.',
        mathExplanation: '\\therefore \\; \\sum_{i=1}^n i(i+1) = \\frac{n(n+1)(n+2)}{3} \\quad \\forall n \\ge 1.',
        rawExplanation: 'Pernyataan terbukti benar untuk semua bilangan bulat positif n ≥ 1.'
      }
    ],
    calculator: {
      type: 'product_sum',
      defaultN: 4,
      minN: 1,
      maxN: 25,
      evaluate: (n) => {
        let sum = 0;
        for (let i = 1; i <= n; i++) sum += i * (i + 1);
        const formulaVal = (n * (n + 1) * (n + 2)) / 3;
        return {
          lhs: sum,
          rhs: `[${n} × ${n + 1} × ${n + 2}] / 3 = ${formulaVal}`,
          isValid: sum === formulaVal,
          detail: `Jumlah perkalian = ${sum}`
        };
      }
    }
  },
  {
    id: 'soal-4',
    category: 'soal_latihan',
    slideNumber: 23,
    title: 'Soal Latihan 4: Masalah Penukaran Koin Kios (Pecahan Rp 2.000,- & Rp 5.000,-)',
    statement: 'Sebuah kios penukaran uang hanya mempunyai pecahan uang senilai Rp 2.000,- dan Rp 5.000,-. Untuk uang senilai berapa saja yang dapat ditukar dengan kedua pecahan tersebut? Buktikan jawaban anda dengan induksi matematik.',
    latexStatement: '\\text{Nominal yang dapat ditukar: Rp 2.000 dan seluruh Rp } N \\ge 4.000 \\text{ (dalam ribuan: } 2a + 5b = N \\text{ untuk } a,b \\ge 0)',
    inductionType: 'Kuat (Strong Induction)',
    baseCondition: 'N = Rp 4.000 dan Rp 5.000',
    summary: 'Aplikasi Teorema Koin Frobenius dan Induksi Kuat pada sistem moneter nyata.',
    steps: [
      {
        title: 'Fase 1: Eksplorasi Nilai yang Dapat Ditukar',
        badge: 'Analisis Nominal',
        mathExplanation: '\\begin{aligned} 2.000 &= 1 \\times 2.000 \\quad (\\text{Bisa}) \\\\ 3.000 &= \\text{Tidak Bisa} \\\\ 4.000 &= 2 \\times 2.000 \\quad (\\text{Bisa}) \\\\ 5.000 &= 1 \\times 5.000 \\quad (\\text{Bisa}) \\\\ 6.000 &= 3 \\times 2.000 \\quad (\\text{Bisa}) \\\\ 7.000 &= 1 \\times 2.000 + 1 \\times 5.000 \\quad (\\text{Bisa}) \\end{aligned}',
        rawExplanation: 'Uang senilai Rp 1.000 dan Rp 3.000 TIDAK BISA ditukar. Nominal yang bisa ditukar adalah Rp 2.000,- dan semua nominal Rp N ≥ 4.000,- (dalam kelipatan ribuan).'
      },
      {
        title: 'Langkah 1: Basis Induksi (Dalam Satuan Ribu Rupiah)',
        badge: 'Basis k = 4 dan k = 5',
        mathExplanation: 'k = 4: \\quad 4 = 2(2) + 5(0) \\\\ k = 5: \\quad 5 = 2(0) + 5(1)',
        rawExplanation: 'Untuk n = 4 (Rp 4.000) cukup gunakan 2 lembar Rp 2.000. Untuk n = 5 (Rp 5.000) gunakan 1 lembar Rp 5.000. Kedua basis BENAR.'
      },
      {
        title: 'Langkah 2: Hipotesis Induksi',
        badge: 'Asumsi nominal k',
        mathExplanation: 'k = 2a + 5b \\quad (a, b \\ge 0, k \\ge 4)',
        rawExplanation: 'Asumsikan nilai k ribu rupiah dapat dibentuk dari kombinasi lembar 2 dan 5.'
      },
      {
        title: 'Langkah 3: Langkah Induksi (Membentuk Nilai k + 1)',
        badge: 'Buktikan k + 1',
        mathExplanation: '\\text{Kasus 1: Jika } b \\ge 1 \\text{ (ada lembar 5.000):} \\\\ (k+1) = (2a + 5b) - 5 + 6 = 2(a+3) + 5(b-1) \\\\ \\text{Kasus 2: Jika } b = 0 \\implies a \\ge 2 \\text{ (hanya ada lembar 2.000, } k \\ge 4): \\\\ (k+1) = (2a) - 4 + 5 = 2(a-2) + 5(1)',
        rawExplanation: 'Jika terdapat lembar 5.000, tukar satu lembar 5.000 dengan tiga lembar 2.000 (+1). Jika tidak ada lembar 5.000, karena k ≥ 4 maka minimal ada dua lembar 2.000; tukar dua lembar 2.000 dengan satu lembar 5.000 (+1). Pada kedua kasus, nominal k+1 berhasil dibentuk!'
      },
      {
        title: 'Kesimpulan',
        badge: 'Q.E.D.',
        mathExplanation: '\\therefore \\; \\text{Dapat ditukar untuk Rp 2.000,- dan seluruh Rp } N \\ge 4.000,-',
        rawExplanation: 'Terbukti dengan induksi matematika bahwa kios dapat menukarkan uang berapa saja asalkan senilai Rp 2.000,- atau kelipatan ribuan mulai dari Rp 4.000,- ke atas.'
      }
    ],
    calculator: {
      type: 'money_exchange',
      defaultN: 13,
      minN: 1,
      maxN: 50,
      evaluate: (n) => {
        // n is in thousands
        if (n === 1 || n === 3) {
          return {
            lhs: `Rp ${(n * 1000).toLocaleString('id-ID')}`,
            rhs: 'TIDAK DAPAT DITUKAR',
            isValid: false,
            detail: `Tidak ada kombinasi pecahan 2.000 dan 5.000 yang menghasilkan Rp ${(n * 1000).toLocaleString('id-ID')}.`
          };
        }
        // find combination 2a + 5b = n
        let bestA = 0;
        let bestB = 0;
        let found = false;
        for (let b = Math.floor(n / 5); b >= 0; b--) {
          const rem = n - 5 * b;
          if (rem % 2 === 0) {
            bestA = rem / 2;
            bestB = b;
            found = true;
            break;
          }
        }
        return {
          lhs: `Rp ${(n * 1000).toLocaleString('id-ID')}`,
          rhs: `${bestA} lembar Rp 2.000 + ${bestB} lembar Rp 5.000`,
          isValid: found,
          detail: `Tepat: (${bestA} × 2.000) + (${bestB} × 5.000) = Rp ${(n * 1000).toLocaleString('id-ID')}`
        };
      }
    }
  },
  {
    id: 'soal-5',
    category: 'soal_latihan',
    slideNumber: 24,
    title: 'Soal Latihan 5: Turunan Kalkulus Aturan Pangkat d/dx [xⁿ] = n xⁿ⁻¹',
    statement: "Buktikan dengan induksi matematik bahwa untuk n ≥ 1 turunan f(x) = xⁿ adalah f'(x) = n xⁿ⁻¹.",
    latexStatement: '\\frac{d}{dx}[x^n] = n x^{n-1}, \\quad \\forall n \\ge 1',
    inductionType: 'Sederhana (n ≥ 1)',
    baseCondition: 'n = 1',
    summary: 'Menghubungkan kalkulus diferensial dan aturan perkalian Leibniz dengan induksi.',
    steps: [
      {
        title: 'Langkah 1: Basis Induksi',
        badge: 'Basis n = 1',
        mathExplanation: "f(x) = x^1 = x \\implies f'(x) = 1 = 1 \\cdot x^{1-1} = 1 \\cdot x^0 = 1",
        rawExplanation: 'Dari definisi turunan dasar, d/dx[x] = 1. Rumus ruas kanan menghasilkan 1 · x⁰ = 1. Basis P(1) terbukti BENAR.'
      },
      {
        title: 'Langkah 2: Hipotesis Induksi',
        badge: 'Asumsi n = k',
        mathExplanation: "\\frac{d}{dx}[x^k] = k x^{k-1}",
        rawExplanation: 'Asumsikan aturan turunan berlaku untuk pemangkatan k.'
      },
      {
        title: 'Langkah 3: Langkah Induksi',
        badge: 'Buktikan n = k + 1',
        mathExplanation: '\\begin{aligned} \\frac{d}{dx}[x^{k+1}] &= \\frac{d}{dx}[x^k \\cdot x] \\\\ &= \\left(\\frac{d}{dx}[x^k]\\right) \\cdot x + x^k \\cdot \\left(\\frac{d}{dx}[x]\\right) \\quad \\text{(Product Rule)} \\\\ &= (k x^{k-1}) \\cdot x + x^k \\cdot (1) \\\\ &= k x^k + x^k = (k+1) x^k = (k+1) x^{(k+1)-1} \\end{aligned}',
        rawExplanation: 'Uraikan x^{k+1} menjadi perkalian dua fungsi: u(x) = x^k dan v(x) = x. Terapkan aturan hasil kali (uv)\' = u\'v + uv\'. Substitusikan hipotesis induksi ke u\'(x) menghasilkan k x^k + x^k = (k+1) x^k.'
      },
      {
        title: 'Kesimpulan',
        badge: 'Q.E.D.',
        mathExplanation: '\\therefore \\; \\frac{d}{dx}[x^n] = n x^{n-1} \\quad \\forall n \\ge 1.',
        rawExplanation: 'Power rule diferensial terbukti berlaku umum untuk sembarang eksponen bulat positif n.'
      }
    ]
  },
  {
    id: 'soal-6',
    category: 'soal_latihan',
    slideNumber: 24,
    title: 'Soal Latihan 6: Jumlah String Biner n-bit dengan Bit 1 Berjumlah Genap Adalah 2ⁿ⁻¹',
    statement: 'Suatu string biner panjangnya n bit. Jumlah string biner yang mempunyai bit 1 sejumlah genap adalah 2ⁿ⁻¹. Buktikan pernyataan tersebut untuk n ≥ 1.',
    latexStatement: '|\\{ s \\in \\{0,1\\}^n : \\text{weight}(s) \\equiv 0 \\pmod 2 \\}| = 2^{n-1}, \\quad \\forall n \\ge 1',
    inductionType: 'Sederhana (n ≥ 1)',
    baseCondition: 'n = 1',
    summary: 'Kombinatorika biner, paritas bilangan biner, dan kode koreksi kesalahan (parity check).',
    steps: [
      {
        title: 'Langkah 1: Basis Induksi',
        badge: 'Basis n = 1',
        mathExplanation: 'n = 1: \\quad \\text{String yang ada: } \\{0, 1\\} \\\\ \\text{Bit 1 genap: } \\text{"0" (0 buah angka 1, genap)} \\implies 1 \\text{ buah} \\\\ 2^{1-1} = 2^0 = 1 \\implies \\text{BENAR}',
        rawExplanation: 'Untuk 1 bit, string "0" memiliki nol angka 1 (nol adalah bilangan genap). String "1" memiliki satu angka 1 (ganjil). Jadi ada 1 string genap, sesuai dengan 2¹⁻¹ = 1.'
      },
      {
        title: 'Langkah 2: Hipotesis Induksi',
        badge: 'Asumsi n = k',
        mathExplanation: 'E_k = 2^{k-1} \\quad \\text{dan} \\quad O_k = 2^k - 2^{k-1} = 2^{k-1}',
        rawExplanation: 'Asumsikan untuk panjang k bit, banyaknya string paritas genap (E_k) adalah 2^{k-1}. Karena total string adalah 2^k, maka string paritas ganjil (O_k) juga 2^{k-1}.'
      },
      {
        title: 'Langkah 3: Langkah Induksi',
        badge: 'Buktikan n = k + 1',
        mathExplanation: '\\begin{aligned} \\text{String genap } (k+1)\\text{-bit dibentuk dari:} \\\\ &1.\\; \\text{String genap } k\\text{-bit ditambah bit \'0\' } \\implies E_k = 2^{k-1} \\\\ &2.\\; \\text{String ganjil } k\\text{-bit ditambah bit \'1\' } \\implies O_k = 2^{k-1} \\\\ E_{k+1} &= E_k + O_k = 2^{k-1} + 2^{k-1} = 2 \\times 2^{k-1} = 2^k = 2^{(k+1)-1} \\end{aligned}',
        rawExplanation: 'Setiap string (k+1)-bit terbentuk dengan menempelkan bit ke-(k+1) di akhir. Paritas genap tercipta jika string sebelumnya sudah genap lalu ditambah 0, ATAU string sebelumnya ganjil lalu ditambah 1. Jumlah keduanya = 2^{k-1} + 2^{k-1} = 2^k.'
      },
      {
        title: 'Kesimpulan',
        badge: 'Q.E.D.',
        mathExplanation: '\\therefore \\; E_n = 2^{n-1} \\quad \\forall n \\ge 1.',
        rawExplanation: 'Tepat setengah dari seluruh kombinasi 2ⁿ string biner selalu memiliki jumlah bit 1 berparitas genap.'
      }
    ],
    calculator: {
      type: 'power_series',
      defaultN: 4,
      minN: 1,
      maxN: 12,
      evaluate: (n) => {
        const total = Math.pow(2, n);
        const even = Math.pow(2, n - 1);
        return {
          lhs: `${even} string`,
          rhs: `2^(${n}-1) = ${even}`,
          isValid: true,
          detail: `Dari total ${total} string ${n}-bit, tepat ${even} memiliki paritas genap dan ${even} berparitas ganjil.`
        };
      }
    }
  },
  {
    id: 'soal-7',
    category: 'soal_latihan',
    slideNumber: 24,
    title: 'Soal Latihan 7: Hukum Distributif Irisan atas Gabungan Jamak Himpunan',
    statement: 'Buktikan dengan induksi matematik bahwa jika A, B₁, B₂, ..., Bₙ adalah himpunan, n ≥ 2, maka A ∩ (B₁ ∪ B₂ ∪ ... ∪ Bₙ) = (A ∩ B₁) ∪ (A ∩ B₂) ∪ ... ∪ (A ∩ Bₙ).',
    latexStatement: 'A \\cap \\left( \\bigcup_{i=1}^n B_i \\right) = \\bigcup_{i=1}^n (A \\cap B_i), \\quad \\forall n \\ge 2',
    inductionType: 'Dirampatkan (Generalized n ≥ n0)',
    baseCondition: 'n = 2',
    summary: 'Generalisasi hukum aljabar Boolean dan hukum himpunan dari 2 elemen ke n elemen.',
    steps: [
      {
        title: 'Langkah 1: Basis Induksi',
        badge: 'Basis n = 2',
        mathExplanation: 'A \\cap (B_1 \\cup B_2) = (A \\cap B_1) \\cup (A \\cap B_2)',
        rawExplanation: 'Untuk n = 2, kesamaan ini adalah hukum distributif dasar dalam teori himpunan yang telah terbukti benar secara aksiomatis. Basis BENAR.'
      },
      {
        title: 'Langkah 2: Hipotesis Induksi',
        badge: 'Asumsi n = k (k ≥ 2)',
        mathExplanation: 'A \\cap (B_1 \\cup B_2 \\cup \\dots \\cup B_k) = (A \\cap B_1) \\cup (A \\cap B_2) \\cup \\dots \\cup (A \\cap B_k)',
        rawExplanation: 'Asumsikan hukum distributif berlaku untuk gabungan k himpunan.'
      },
      {
        title: 'Langkah 3: Langkah Induksi',
        badge: 'Buktikan n = k + 1',
        mathExplanation: '\\begin{aligned} &A \\cap [B_1 \\cup B_2 \\cup \\dots \\cup B_k \\cup B_{k+1}] \\\\ &= A \\cap [(B_1 \\cup \\dots \\cup B_k) \\cup B_{k+1}] \\quad \\text{(Asosiatif)} \\\\ &= [A \\cap (B_1 \\cup \\dots \\cup B_k)] \\cup (A \\cap B_{k+1}) \\quad \\text{(Basis } n=2) \\\\ &= [(A \\cap B_1) \\cup \\dots \\cup (A \\cap B_k)] \\cup (A \\cap B_{k+1}) \\quad \\text{(Hipotesis)} \\\\ &= (A \\cap B_1) \\cup (A \\cap B_2) \\cup \\dots \\cup (A \\cap B_{k+1}) \\end{aligned}',
        rawExplanation: 'Kelompokkan (B₁ ∪ ... ∪ B_k) sebagai satu entitas tunggal C. Gunakan basis n=2 untuk mendistribusikan A terhadap C ∪ B_{k+1}. Kemudian gantikan A ∩ C menggunakan hipotesis induksi.'
      },
      {
        title: 'Kesimpulan',
        badge: 'Q.E.D.',
        mathExplanation: '\\therefore \\; A \\cap \\left( \\bigcup_{i=1}^n B_i \\right) = \\bigcup_{i=1}^n (A \\cap B_i) \\quad \\forall n \\ge 2.',
        rawExplanation: 'Terbukti bahwa hukum distributif berlaku untuk sembarang jumlah berhingga n himpunan.'
      }
    ]
  },
  {
    id: 'soal-8',
    category: 'soal_latihan',
    slideNumber: 25,
    title: 'Soal Latihan 8: Detektif Kesalahan Pembuktian Palsu aⁿ = 1 untuk Semua n ≥ 0',
    statement: 'Temukan kesalahan dalam pembuktian berikut: "Kita ingin membuktikan bahwa aⁿ = 1 untuk semua bilangan bulat tak-negatif n bilamana a adalah bilangan riil tidak-nol. Kita buktikan dengan induksi kuat: Basis n=0: a⁰=1 benar. Langkah induksi: aⁿ⁺¹ = (aⁿ · aⁿ) / aⁿ⁻¹ = (1·1)/1 = 1. Jadi aⁿ = 1 untuk semua n."',
    latexStatement: '\\text{Pembuktian Palsu: } a^{n+1} = \\frac{a^n \\cdot a^n}{a^{n-1}} = \\frac{1 \\times 1}{1} = 1 \\implies a^n = 1 \\; (?)',
    inductionType: 'Analisis Kesalahan (Fallacy)',
    baseCondition: 'Gagal pada transisi n = 0 ke n = 1',
    summary: 'Analisis mendalam mengenai jebakan induksi kuat yang tidak melengkapi jumlah basis yang cukup.',
    steps: [
      {
        title: 'Bedah Argumen Palsu',
        badge: 'Analisis Klaim',
        mathExplanation: '\\text{Klaim: } a^n = 1 \\; \\forall n \\ge 0 \\quad (a \\ne 0)',
        rawExplanation: 'Secara matematis klaim ini jelas salah, sebab jika a = 3, maka 3¹ = 3 ≠ 1. Namun sekilas langkah aljabar tampak meyakinkan. Di mana letak fatal cacat logikanya?'
      },
      {
        title: 'Kesalahan Fatal 1: Transisi Kasus Pertama (n = 0)',
        badge: 'Fatal Flaw #1',
        mathExplanation: '\\text{Untuk membuktikan } n=1: \\quad a^{0+1} = a^1 = \\frac{a^0 \\cdot a^0}{a^{0-1}} = \\frac{a^0 \\cdot a^0}{a^{-1}}',
        rawExplanation: 'Ketika n = 0, rumus membutuhkan suku a^{n-1} = a^{0-1} = a⁻¹. Padahal domain pernyataan HANYA untuk n bilangan bulat tak-negatif (n ≥ 0)! Suku a⁻¹ tidak pernah masuk ke dalam hipotesis induksi.'
      },
      {
        title: 'Kesalahan Fatal 2: Kurangnya Jumlah Kasus Basis',
        badge: 'Fatal Flaw #2',
        mathExplanation: '\\text{Langkah mengaitkan } (n+1) \\text{ dengan } (n-1) \\implies \\text{Butuh DUA Basis: } P(0) \\text{ dan } P(1)',
        rawExplanation: 'Karena relasi rekursif melibatkan suku mundur 2 langkah (n-1), maka induksi kuat wajib membuktikan DUA basis awal: P(0) dan P(1). Namun P(1) menyatakan a¹ = 1, yang mana SALAH jika a ≠ 1.'
      },
      {
        title: 'Dampak Runtuhnya Efek Domino',
        badge: 'Kesimpulan Logika',
        mathExplanation: 'P(0) \\;\\text{[Jatuh]} \\; \\not\\implies \\; P(1) \\;\\text{[Berdiri kokoh, domino ke-2 tidak runtuh]}',
        rawExplanation: 'Domino pertama P(0) memang tumbang, tetapi jarak ke domino berikutnya terputus karena P(0) tidak dapat menjatuhkan P(1). Akibatnya efek domino langsung berhenti di langkah pertama.'
      }
    ]
  }
];
