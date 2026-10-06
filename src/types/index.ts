export type BootcampCurriculumModule = {
  title: string;
  materials: string[];
};

export type BootcampJourneyPhase = {
  title: string;
  description: string[];
};

export type BootcampPortfolio = {
  title: string;
  image: string;
  author: string;
};

export type BootcampAlumniStory = {
  name: string;
  role: string;
  image: string;
  story: string;
  videoId?: string;
};

export type BootcampUSP = {
  title: string;
  icon: string; // use lucide-react icon names or custom
};

export type BootcampFAQ = {
  question: string;
  answer: string;
};

export type Bootcamp = {
  id: string;
  title: string;
  slug: string;
  description: string;
  mentor: string;
  mentorLinkedin?: string;
  experience: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  bnspPrice?: number;
  category: string;
  features: string[];
  specialization?: string;
  careerProspects: string[];
  tools?: { name: string; logo: string }[];
  careerSalaries?: { role: string; salary: string; type?: "fulltime" | "freelance"; icon?: string }[];
  jobstreetLink?: string;
  mainFacilities: string[];
  syllabus?: string;
  experienceLogos?: { src: string; alt: string }[];
  hiringPartners?: { name: string; logo: string }[];
  mentorAchievements?: string[];
  mentorGallery?: (string | { image: string; caption?: string; link?: string; isVideo?: boolean })[];
  
  // Detail page properties (Optional so it doesn't break existing bootcamps without details yet)
  about?: {
    description: string[];
    statistics: { label: string; value: string }[];
  };
  curriculum?: {
    title: string;
    modules: BootcampCurriculumModule[];
  };
  journey?: {
    description?: string;
    phases: BootcampJourneyPhase[];
  };
  portfolios?: BootcampPortfolio[];
  alumniStories?: BootcampAlumniStory[];
  usp?: BootcampUSP[];
  faqs?: BootcampFAQ[];
};

export type Mentor = {
  id: string;
  name: string;
  photo: string;
  position: string;
  company: string;
  experience: string;
  speciality: string[];
  linkedin: string;
};
