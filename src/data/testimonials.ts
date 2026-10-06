export interface Testimonial {
  id: number;
  name: string;
  bootcamp: string;
  rating: number;
  quote: string;
  avatar?: string;
  initials: string;
  color: string;
}

export const testimonials: Testimonial[] = [
  // ── Digital Marketing ────────────────────────────────
  {
    id: 1,
    name: "Sherly Widyatma M.",
    bootcamp: "Digital Marketing · Trial Batch",
    rating: 5,
    quote:
      "Secara keseluruhan aku bersyukur banget ikut bootcamp Digital Marketing KelasKerja karena ada banyak ilmu yang didapat. Mentornya luar biasa keren, profesional, dan sangat membantu saat ada kesulitan. Pokoknya kalian keren dan selalu pengertian!",
    initials: "SW",
    color: "#2563EB",
  },
  {
    id: 2,
    name: "Elnor Raka",
    bootcamp: "Digital Marketing · Trial Batch",
    rating: 5,
    quote:
      "Secara basic dan keseluruhan saya sangat puas dan sangat masuki kedalaman nilai dan pemikiran saya. Sukses selalu untuk KelasKerja! Ilmu yang dibagikan dan diajarkan semoga menjadi amal yang baik.",
    initials: "ER",
    color: "#7C3AED",
  },
  {
    id: 3,
    name: "Nadia Anggraeni",
    bootcamp: "Digital Marketing · Batch 1",
    rating: 5,
    quote:
      "Mentor selalu responsif dan sabar banget jawab pertanyaan meski basic dari nol. Komunitas yang dibangun juga sangat suportif, jadi ngerasa nggak belajar sendirian.",
    initials: "NA",
    color: "#D97706",
  },
  {
    id: 4,
    name: "Adrian Rahmani",
    bootcamp: "Digital Marketing · Batch 1",
    rating: 5,
    quote:
      "Ikut Batch 1 itu keputusan terbaik! Aku aktif banget nanya di setiap sesi dan mentor selalu telaten jawab satu-satu. Dari yang awalnya ragu, sekarang malah jadi paling semangat lanjutin sampai lulus. Recommended banget buat yang masih mikir-mikir!",
    initials: "AR",
    color: "#2563EB",
  },

  // ── Smart Creator ─────────────────────────────────────
  {
    id: 5,
    name: "Putri Salsabila",
    bootcamp: "Smart Creator · Trial Batch",
    rating: 5,
    quote:
      "Bootcamp Smart Creator benar-benar mengubah cara saya membuat konten. Dari nggak tahu cara storytelling yang benar, sekarang konten saya bisa reach ribuan orang organik!",
    initials: "PS",
    color: "#DB2777",
  },
  {
    id: 6,
    name: "Rizki Maulana",
    bootcamp: "Smart Creator · Batch 1",
    rating: 5,
    quote:
      "Portfolio yang dihasilkan dari bootcamp ini langsung dipakai buat melamar kerja dan alhamdulillah dapat job! Mentor dan materi sangat praktis dan applicable.",
    initials: "RM",
    color: "#0891B2",
  },

  // ── HR & GA ───────────────────────────────────────────
  {
    id: 7,
    name: "Fajar Hidayat",
    bootcamp: "HR & GA · Trial Batch",
    rating: 5,
    quote:
      "Materi HR & GA-nya sangat komprehensif dan langsung bisa dipraktikkan di dunia kerja. Mentor berpengalaman banget dan penjelasannya mudah dipahami meski saya baru mulai di bidang HR.",
    initials: "FH",
    color: "#0891B2",
  },

  // ── Social Media Specialist ───────────────────────────
  {
    id: 8,
    name: "Maya Kaltara",
    bootcamp: "Social Media Specialist · Trial Batch",
    rating: 5,
    quote:
      "Worth it banget, investasi terbaik buat upgrade skill dan portofolio. Dalam 2 bulan aku udah punya real project yang bisa langsung dipamerin ke recruiter.",
    initials: "MK",
    color: "#16A34A",
  },

  // ── Marketplace Optimization ──────────────────────────
  {
    id: 9,
    name: "Hendra Kusuma",
    bootcamp: "Marketplace Optimization · Trial Batch",
    rating: 5,
    quote:
      "Setelah ikut bootcamp ini, omzet toko online saya naik drastis! Strategi optimasi yang diajarkan langsung applicable dan hasilnya terasa dalam hitungan minggu.",
    initials: "HK",
    color: "#EA580C",
  },

  // ── Public Speaking ───────────────────────────────────
  {
    id: 10,
    name: "Dinda Rahmadhani",
    bootcamp: "Public Speaking · Trial Batch",
    rating: 5,
    quote:
      "Dulu nervous banget tiap presentasi di depan orang banyak. Setelah bootcamp Public Speaking ini, sekarang aku lebih percaya diri dan tahu teknik yang benar buat engage audience.",
    initials: "DR",
    color: "#7C3AED",
  },

  // ── Retail & Franchise ────────────────────────────────
  {
    id: 11,
    name: "Rina Amelia",
    bootcamp: "Retail & Franchise · Trial Batch",
    rating: 5,
    quote:
      "Ilmu yang didapat di bootcamp Retail & Franchise langsung saya terapkan di bisnis saya. Sekarang operasional toko lebih terstruktur dan profit meningkat signifikan!",
    initials: "RA",
    color: "#059669",
  },

  // ── Extra Digital Marketing ───────────────────────────
  {
    id: 12,
    name: "Sherly Widyatma N.",
    bootcamp: "Digital Marketing · Batch 1",
    rating: 5,
    quote:
      "Kurikulum terupdate banget, langsung relevan sama kebutuhan industri sekarang. Saya langsung bisa apply ilmu digital marketing-nya dan hasilnya terlihat nyata dalam waktu singkat!",
    initials: "SN",
    color: "#DB2777",
  },
];
