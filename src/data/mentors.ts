export type Mentor = {
  id: string;
  name: string;
  role: string;
  photo: string;
  experience: string[];
  companies: string[];
};

export const mentorsData: Mentor[] = [
  {
    id: "rini-yunita",
    name: "Miss Riri",
    role: "Public Speaking",
    photo: "/mentors/rini-v1.png",
    experience: [
      "5+ Tahun pengalaman di bidang Public Speaking dan Komunikasi",
      "Berpengalaman melatih ratusan profesional untuk tampil percaya diri",
      "Pernah menjadi pembicara di berbagai event nasional",
    ],
    companies: ["Company A", "Company B"],
  },
  {
    id: "bagas",
    name: "Bagas",
    role: "Digital Marketing",
    photo: "/mentors/bagas.JPG",
    experience: [
      "Expert dalam Performance Marketing (Meta Ads & Google Ads)",
      "Membantu berbagai brand mencapai ROI lebih dari 300%",
      "Data-driven marketer dengan pengalaman agensi",
    ],
    companies: ["Digital Agency", "Tech Startup"],
  },
  {
    id: "arini-tathagati",
    name: "Arini Tathagati",
    role: "HRGA",
    photo: "/mentors/arini_formal.png",
    experience: [
      "HR Professional dengan fokus pada Talent Acquisition dan People Development",
      "Mengelola end-to-end proses rekrutmen di perusahaan multinasional",
      "Sertifikasi Human Resources",
    ],
    companies: ["Multinational Corp", "Consulting Group"],
  },
  {
    id: "diego-soryandana",
    name: "Diego Soryandana",
    role: "Smart Creator",
    photo: "/mentors/Diego.jpeg",
    experience: [
      "Content Creator dengan jutaan views di TikTok dan Instagram",
      "Spesialis dalam Viral Content Strategy dan Personal Branding",
      "Creative Director untuk berbagai digital campaign",
    ],
    companies: ["TikTok Creator", "Creative Agency"],
  },
  {
    id: "ikhwanul-hadi",
    name: "Ikhwanul Hadi",
    role: "Marketplace Optimization",
    photo: "/mentors/hadi-v1.png",
    experience: [
      "E-commerce Specialist dengan pengalaman mengelola official store",
      "Ahli dalam SEO Shopee, Tokopedia, dan optimasi konversi toko",
      "Meningkatkan omzet toko online secara konsisten",
    ],
    companies: ["E-commerce Brand", "Retail Tech"],
  },
  {
    id: "ricky-p-faizal",
    name: "Ricky P. Faizal",
    role: "Social Media Specialist",
    photo: "/mentors/ricky.jpeg",
    experience: [
      "Social Media Strategist & Manager untuk brand ternama",
      "Expert dalam Community Management dan Social Media Analytics",
      "Membangun audiens setia dan interaksi tinggi",
    ],
    companies: ["FMCG Brand", "Lifestyle Startup"],
  },
  {
    id: "ko-edward",
    name: "Ko Edward",
    role: "Retail & Franchise",
    photo: "/mentors/edward.jpeg",
    experience: [
      "Business Owner dan praktisi di industri Retail & Franchise",
      "Sukses berekspansi cabang di seluruh Indonesia",
      "Ahli dalam standarisasi operasional dan business scaling",
    ],
    companies: ["Retail Chain", "F&B Franchise"],
  }
];
