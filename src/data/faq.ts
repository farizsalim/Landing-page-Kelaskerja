export type FaqCategory = "umum" | "pelaksanaan";

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: FaqCategory;
}

export const faqs: FaqItem[] = [
  // ── Pertanyaan Umum & Pendaftaran ──
  {
    id: 1,
    question: "Apa yang dimaksud dengan program bootcamp kepelatihan kerja?",
    answer:
      "Program intensif jangka pendek yang dirancang untuk membekali peserta dengan hard skill dan soft skill yang relevan dengan kebutuhan industri, sehingga siap kerja di bidang tertentu seperti Digital Marketing, HRGA, Social Media, dan lainnya.",
    category: "umum",
  },
  {
    id: 2,
    question: "Siapa yang dapat mengikuti program ini?",
    answer:
      "Program ini terbuka bagi fresh graduate, mahasiswa tingkat akhir, career switcher, dan profesional yang ingin upgrade skill. Tidak ada batasan latar belakang pendidikan.",
    category: "umum",
  },
  {
    id: 3,
    question: "Apakah program ini dapat diikuti oleh pemula?",
    answer:
      "Sangat bisa. Materi dirancang sistematis dari dasar hingga tingkat lanjut, sehingga peserta tanpa pengalaman sebelumnya tetap dapat mengikuti dengan baik.",
    category: "umum",
  },
  {
    id: 4,
    question: "Bagaimana prosedur pendaftaran program?",
    answer:
      "Pilih bootcamp yang diminati, lalu klik \"Daftar Sekarang\" atau \"Konsultasi Gratis\" untuk terhubung via WhatsApp. Isi formulir pendaftaran yang diberikan admin, lakukan pembayaran, dan dapatkan konfirmasi serta akses LMS.",
    category: "umum",
  },
  {
    id: 5,
    question: "Dokumen apa saja yang perlu disiapkan?",
    answer:
      "Anda perlu menyiapkan KTP/SIM/KTM sebagai identitas diri, CV terbaru, dan pasfoto terbaru. Siapkan juga perangkat untuk belajar (laptop/komputer) dan koneksi internet yang stabil.",
    category: "umum",
  },
  {
    id: 6,
    question: "Apakah program ini dikenakan biaya?",
    answer:
      "Ya, ini adalah program investasi diri dengan biaya mulai dari Rp3.200.000 untuk kelas reguler. Biaya mencakup seluruh materi, akses mentor, akses kelas seumur hidup, dan sertifikat penyelesaian. Tersedia juga opsi sertifikasi BNSP sebagai add-on senilai Rp3.500.000.",
    category: "umum",
  },
  {
    id: 7,
    question: "Apakah tersedia beasiswa atau dukungan pembiayaan?",
    answer:
      "Ya, kami menyediakan promo early bird, beasiswa parsial pada periode tertentu, dan opsi cicilan untuk meringankan biaya pelatihan. Untuk informasi lebih lanjut, silakan konsultasi langsung melalui WhatsApp kami.",
    category: "umum",
  },
  {
    id: 8,
    question: "Apakah terdapat tahapan seleksi?",
    answer:
      "Pendaftaran reguler langsung diproses setelah pembayaran diverifikasi — tidak ada tes seleksi formal. Seleksi administrasi hanya berlaku untuk program atau beasiswa khusus tertentu.",
    category: "umum",
  },

  // ── Pelaksanaan & Fasilitas ──
  {
    id: 9,
    question: "Berapa lama durasi program bootcamp?",
    answer:
      "Durasi program bervariasi, umumnya 1-3 bulan. Program intensif kami berlangsung sekitar 2 bulan dengan 9 pertemuan dan 30+ sesi pembelajaran. Jadwal kelas fleksibel dan dapat diikuti sambil bekerja atau kuliah.",
    category: "pelaksanaan",
  },
  {
    id: 10,
    question: "Apakah pelatihan dilaksanakan secara daring atau luring?",
    answer:
      "Pelatihan 100% daring (online) melalui live session via Zoom/Google Meet dan LMS. Materi juga tersedia di Notion dan Google Drive yang dapat diakses kapan saja.",
    category: "pelaksanaan",
  },
  {
    id: 11,
    question: "Apakah kehadiran peserta wajib?",
    answer:
      "Wajib hadir minimal 75%–80% dari total sesi untuk pemahaman optimal dan penerbitan sertifikat. Seluruh sesi direkam sehingga peserta yang berhalangan tetap dapat mengakses materi kembali.",
    category: "pelaksanaan",
  },
  {
    id: 12,
    question: "Apakah peserta akan mendapatkan tugas atau proyek?",
    answer:
      "Ya, program ini berbasis project-based learning. Peserta mengerjakan tugas mingguan dan di minggu ke-8 mengerjakan Final Project individual berdasarkan brief eksklusif dari mitra perusahaan. Hasilnya menjadi portofolio profesional.",
    category: "pelaksanaan",
  },
  {
    id: 13,
    question: "Apakah peserta akan memperoleh sertifikat?",
    answer:
      "Ya, setiap peserta yang menyelesaikan program mendapatkan sertifikat resmi penyelesaian (Certificate of Completion) beserta rapor nilai. Tersedia juga opsi sertifikasi BNSP untuk meningkatkan kredibilitas profesional.",
    category: "pelaksanaan",
  },
  {
    id: 14,
    question: "Apakah program ini menyediakan dukungan karier?",
    answer:
      "Ya. Setelah lulus, peserta mendapatkan Career Preparation berupa bimbingan CV/LinkedIn, mock interview, dan penyaluran ke jaringan hiring partner kami untuk menjemput peluang kerja yang relevan.",
    category: "pelaksanaan",
  },

  // ── FAQ Tambahan (dipertahankan dari versi sebelumnya) ──
  {
    id: 15,
    question: "Apakah program ini menjamin penempatan kerja?",
    answer:
      "Kami tidak menjamin penempatan kerja secara langsung, namun kami menyediakan dukungan karier melalui jaringan hiring partner, portofolio review, dan akses komunitas alumni yang aktif membantu membuka peluang kerja.",
    category: "pelaksanaan",
  },
  {
    id: 16,
    question:
      "Apakah peserta dapat mengikuti program sambil bekerja atau kuliah?",
    answer:
      "Bisa! Jadwal kelas dirancang fleksibel dan seluruh materi dapat diakses kembali. Program ini sangat cocok bagi Anda yang ingin upgrade skill tanpa harus meninggalkan aktivitas utama.",
    category: "pelaksanaan",
  },
];
