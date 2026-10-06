export type QuizCategory =
  | "content-creator"
  | "digital-marketing"
  | "public-speaking"
  | "content-strategy"
  | "communication-sales";

export interface QuizOption {
  label: string;
  text: string;
  category: QuizCategory;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizResult {
  category: QuizCategory;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  bootcamp: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question:
      "Kalau kamu diberi kesempatan mengembangkan sebuah brand di media sosial, hal apa yang paling ingin kamu lakukan?",
    options: [
      {
        label: "A",
        text: "Membuat konsep visual dan video yang menarik",
        category: "content-creator",
      },
      {
        label: "B",
        text: "Menentukan strategi agar brand lebih dikenal dan menghasilkan penjualan",
        category: "digital-marketing",
      },
      {
        label: "C",
        text: "Meningkatkan kemampuan berbicara dan menyampaikan ide",
        category: "public-speaking",
      },
      {
        label: "D",
        text: "Membuat konten yang mengikuti tren",
        category: "content-strategy",
      },
      {
        label: "E",
        text: "Mempelajari cara membangun komunikasi dengan audiens",
        category: "communication-sales",
      },
    ],
  },
  {
    id: 2,
    question:
      "Saat melihat sebuah konten brand yang viral di TikTok atau Instagram, hal apa yang paling membuat kamu tertarik?",
    options: [
      {
        label: "A",
        text: "Cara brand menyusun strategi promosi dan target audiens",
        category: "digital-marketing",
      },
      {
        label: "B",
        text: "Visual, editing, dan kreativitas kontennya",
        category: "content-creator",
      },
      {
        label: "C",
        text: "Cara pembuat konten berbicara di depan kamera",
        category: "public-speaking",
      },
      {
        label: "D",
        text: "Cara brand meningkatkan interaksi dan penjualan",
        category: "communication-sales",
      },
      {
        label: "E",
        text: "Cara pesan disampaikan sehingga mudah dipahami",
        category: "content-strategy",
      },
    ],
  },
  {
    id: 3,
    question:
      "Jika kamu diminta membantu sebuah bisnis agar lebih berkembang di media sosial, kamu lebih tertarik mengerjakan apa?",
    options: [
      {
        label: "A",
        text: "Membuat desain dan video promosi",
        category: "content-creator",
      },
      {
        label: "B",
        text: "Membuat strategi pemasaran digital",
        category: "digital-marketing",
      },
      {
        label: "C",
        text: "Menjadi orang yang mempresentasikan produk",
        category: "public-speaking",
      },
      {
        label: "D",
        text: "Membuat konsep komunikasi dengan pelanggan",
        category: "communication-sales",
      },
      {
        label: "E",
        text: "Menganalisis performa media sosial dan penjualan",
        category: "content-strategy",
      },
    ],
  },
  {
    id: 4,
    question:
      "Kemampuan apa yang paling ingin kamu kuasai setelah mengikuti kelas?",
    options: [
      {
        label: "A",
        text: "Berbicara dengan percaya diri di depan orang lain",
        category: "public-speaking",
      },
      {
        label: "B",
        text: "Membuat konten kreatif yang menarik perhatian",
        category: "content-creator",
      },
      {
        label: "C",
        text: "Mengatur strategi promosi melalui media sosial",
        category: "digital-marketing",
      },
      {
        label: "D",
        text: "Membangun personal branding melalui konten",
        category: "content-strategy",
      },
      {
        label: "E",
        text: "Meningkatkan engagement dan penjualan melalui digital",
        category: "communication-sales",
      },
    ],
  },
  {
    id: 5,
    question:
      "Jika kamu memiliki produk sendiri, langkah pertama yang paling ingin kamu pelajari adalah…",
    options: [
      {
        label: "A",
        text: "Membuat video promosi yang menarik",
        category: "content-creator",
      },
      {
        label: "B",
        text: "Menentukan target pasar dan strategi pemasaran",
        category: "digital-marketing",
      },
      {
        label: "C",
        text: "Menyiapkan cara mempresentasikan produk dengan percaya diri",
        category: "public-speaking",
      },
      {
        label: "D",
        text: "Membuat konten yang konsisten untuk membangun brand",
        category: "content-strategy",
      },
      {
        label: "E",
        text: "Menentukan strategi agar produk dikenal dan dibeli lebih banyak orang",
        category: "communication-sales",
      },
    ],
  },
  {
    id: 6,
    question:
      "Ketika harus membuat konten untuk sebuah brand, bagian mana yang paling menarik bagi kamu?",
    options: [
      {
        label: "A",
        text: "Menentukan konsep dan ide kreatif",
        category: "content-strategy",
      },
      {
        label: "B",
        text: "Menyusun strategi konten agar mencapai target pemasaran",
        category: "digital-marketing",
      },
      {
        label: "C",
        text: "Menjadi talent atau presenter dalam video",
        category: "public-speaking",
      },
      {
        label: "D",
        text: "Membuat visual, foto, dan video",
        category: "content-creator",
      },
      {
        label: "E",
        text: "Membuat komunikasi yang menarik agar audiens tertarik membeli",
        category: "communication-sales",
      },
    ],
  },
  {
    id: 7,
    question:
      "Menurut kamu, faktor paling penting agar sebuah brand berhasil di media sosial adalah…",
    options: [
      {
        label: "A",
        text: "Konten yang kreatif dan memiliki ciri khas",
        category: "content-creator",
      },
      {
        label: "B",
        text: "Kemampuan menyampaikan pesan dengan baik",
        category: "public-speaking",
      },
      {
        label: "C",
        text: "Strategi pemasaran yang tepat dan sesuai target audiens",
        category: "digital-marketing",
      },
      {
        label: "D",
        text: "Kemampuan membangun interaksi dengan audiens",
        category: "communication-sales",
      },
      {
        label: "E",
        text: "Visual yang menarik dan mengikuti tren",
        category: "content-strategy",
      },
    ],
  },
  {
    id: 8,
    question:
      "Kalau mendapat tugas membuat kampanye untuk sebuah produk, kamu lebih memilih menjadi…",
    options: [
      {
        label: "A",
        text: "Orang yang menyusun strategi pemasaran dan target kampanye",
        category: "digital-marketing",
      },
      {
        label: "B",
        text: "Kreator yang membuat foto, video, dan desain",
        category: "content-creator",
      },
      {
        label: "C",
        text: "Orang yang menjadi presenter atau talent",
        category: "public-speaking",
      },
      {
        label: "D",
        text: "Orang yang mengatur komunikasi dengan audiens",
        category: "communication-sales",
      },
      {
        label: "E",
        text: "Orang yang menganalisis hasil kampanye dan penjualan",
        category: "content-strategy",
      },
    ],
  },
  {
    id: 9,
    question:
      "Apa yang paling ingin kamu tingkatkan untuk menunjang karier di era digital?",
    options: [
      {
        label: "A",
        text: "Kemampuan membuat konten visual dan video",
        category: "content-creator",
      },
      {
        label: "B",
        text: "Kemampuan berbicara, presentasi, dan berkomunikasi",
        category: "public-speaking",
      },
      {
        label: "C",
        text: "Kemampuan menjalankan strategi digital marketing",
        category: "digital-marketing",
      },
      {
        label: "D",
        text: "Kemampuan membangun brand dan menarik pelanggan melalui media sosial",
        category: "content-strategy",
      },
      {
        label: "E",
        text: "Kemampuan membuat konten kreatif yang relevan dengan tren",
        category: "communication-sales",
      },
    ],
  },
  {
    id: 10,
    question:
      "Jika kamu harus memilih satu aktivitas yang paling kamu sukai, mana yang paling sesuai dengan dirimu?",
    options: [
      {
        label: "A",
        text: "Berbicara, presentasi, berdiskusi, dan melakukan negosiasi",
        category: "public-speaking",
      },
      {
        label: "B",
        text: "Membuat video, desain, dan ide konten kreatif",
        category: "content-creator",
      },
      {
        label: "C",
        text: "Mengelola media sosial untuk meningkatkan awareness dan penjualan",
        category: "digital-marketing",
      },
      {
        label: "D",
        text: "Membuat strategi promosi berdasarkan target audiens",
        category: "content-strategy",
      },
      {
        label: "E",
        text: "Menjadi kreator yang menghasilkan konten menarik dan kekinian",
        category: "communication-sales",
      },
    ],
  },
];

export const quizResults: Record<QuizCategory, QuizResult> = {
  "content-creator": {
    category: "content-creator",
    title: "Content Creator",
    subtitle: "Si Kreatif Visual",
    description:
      "Kamu punya bakat alami dalam membuat konten visual yang menarik! Mulai dari video, desain grafis, hingga editing — kamu bisa menyulap ide menjadi konten yang eye-catching. Bootcamp Content Creator akan membantu kamu mengasah skill ini ke level profesional.",
    emoji: "🎨",
    bootcamp: "Content Creator Bootcamp",
  },
  "digital-marketing": {
    category: "digital-marketing",
    title: "Digital Marketing",
    subtitle: "Si Strategis Digital",
    description:
      "Kamu memiliki pemikiran strategis yang kuat! Kamu suka menganalisis data, menyusun strategi pemasaran, dan memastikan setiap kampanye mencapai target. Bootcamp Digital Marketing cocok untuk mengembangkan kemampuanmu dalam dunia pemasaran digital.",
    emoji: "📊",
    bootcamp: "Digital Marketing Bootcamp",
  },
  "public-speaking": {
    category: "public-speaking",
    title: "Public Speaking",
    subtitle: "Si Pembicara Handal",
    description:
      "Kamu punya kemampuan komunikasi yang luar biasa! Berbicara di depan kamera atau audiens adalah kekuatanmu. Bootcamp Public Speaking akan membantumu menjadi presenter, MC, atau talent profesional yang percaya diri.",
    emoji: "🎤",
    bootcamp: "Public Speaking Bootcamp",
  },
  "content-strategy": {
    category: "content-strategy",
    title: "Content Strategy",
    subtitle: "Si Perencana Konten",
    description:
      "Kamu jago dalam merencanakan dan membangun strategi konten yang efektif! Kamu tahu bagaimana membuat brand terlihat konsisten dan menarik. Bootcamp Content Strategy akan membantu kamu menjadi content strategist yang andal.",
    emoji: "📋",
    bootcamp: "Content Strategy Bootcamp",
  },
  "communication-sales": {
    category: "communication-sales",
    title: "Communication & Sales",
    subtitle: "Si Komunikator Ulung",
    description:
      "Kamu punya kemampuan membangun hubungan dan komunikasi yang kuat dengan audiens! Kamu tahu cara membuat orang tertarik dan terhubung dengan brand. Bootcamp Communication & Sales akan membantumu mengubah interaksi menjadi konversi.",
    emoji: "💬",
    bootcamp: "Communication & Sales Bootcamp",
  },
};

export const categoryLabels: Record<QuizCategory, string> = {
  "content-creator": "Content Creator",
  "digital-marketing": "Digital Marketing",
  "public-speaking": "Public Speaking",
  "content-strategy": "Content Strategy",
  "communication-sales": "Communication & Sales",
};
