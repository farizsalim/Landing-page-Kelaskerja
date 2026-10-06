"use client";

import {useMemo, useState} from "react";
import {useSearchParams} from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import {FaWhatsapp} from "react-icons/fa";
import Header from "@/components/LandingPage/Header";
import {
  categoryLabels,
  quizQuestions,
  quizResults,
  type QuizCategory,
} from "@/data/consultation-quiz";

type Step = "intro" | "questions" | "profile" | "result";
type ProfileField = "ageRange" | "status" | "goal";
type FormField = "fullName" | "phone" | "email" | "city" | ProfileField;
type FormErrors = Partial<Record<FormField, string>>;

const whatsappNumber = "628212259967";
const whatsappLink = `https://wa.me/${whatsappNumber}?text=Halo%20saya%20ingin%20konsultasi`;
const totalQuestions = quizQuestions.length;

const profileOptions: Record<ProfileField, string[]> = {
  ageRange: ["< 20", "20–30", "30–40", "> 40"],
  status: ["Pelajar / mahasiswa", "Fresh graduate", "Karyawan", "Pebisnis / freelancer"],
  goal: ["Cari kerja", "Upgrade skill", "Bangun bisnis", "Ganti karier"],
};

const profileLabels: Record<ProfileField, string> = {
  ageRange: "Rentang umur",
  status: "Kondisi saat ini",
  goal: "Tujuan utama",
};

const followUpProfileFields: ProfileField[] = ["status", "goal"];

const StartQuizPage = () => {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(QuizCategory | null)[]>([]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [profile, setProfile] = useState<Record<ProfileField, string>>({
    ageRange: "",
    status: "",
    goal: "",
  });

  const result = useMemo(() => {
    const scores = Object.fromEntries(
      Object.keys(categoryLabels).map((category) => [category, 0])
    ) as Record<QuizCategory, number>;

    answers.forEach((category) => {
      if (category) scores[category] += 1;
    });

    const winner = (Object.entries(scores) as [QuizCategory, number][]).reduce(
      (currentWinner, entry) =>
        entry[1] > currentWinner[1] ? entry : currentWinner,
      ["content-creator", 0] as [QuizCategory, number]
    )[0];

    return {result: quizResults[winner], scores};
  }, [answers]);

  const progress =
    step === "questions"
      ? ((currentQuestion + 1) / totalQuestions) * 100
      : step === "profile"
        ? 100
        : 0;

  const handleAnswer = (category: QuizCategory) => {
    const nextAnswers = [...answers];
    nextAnswers[currentQuestion] = category;
    setAnswers(nextAnswers);

    if (currentQuestion === totalQuestions - 1) {
      setStep("profile");
    } else {
      setCurrentQuestion((question) => question + 1);
    }
  };

  const handleBack = () => {
    if (step === "questions" && currentQuestion > 0) {
      setCurrentQuestion((question) => question - 1);
      return;
    }

    if (step === "questions") {
      setStep("intro");
      return;
    }

    if (step === "profile") {
      setCurrentQuestion(totalQuestions - 1);
      setStep("questions");
    }
  };

  const handleProfileChange = (field: ProfileField, value: string) => {
    setProfile((currentProfile) => ({...currentProfile, [field]: value}));
    setFormErrors((currentErrors) => {
      const nextErrors = {...currentErrors};
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const clearFormError = (field: FormField) => {
    setFormErrors((currentErrors) => {
      const nextErrors = {...currentErrors};
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const handleProfileSubmit = () => {
    const errors: FormErrors = {};
    const normalizedPhone = phone.replace(/[\s()-]/g, "");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phonePattern = /^(?:\+62|62|0)8\d{8,11}$/;

    if (fullName.trim().length < 2) {
      errors.fullName = "Belum diisi atau minimal 2 karakter.";
    }
    if (!phonePattern.test(normalizedPhone)) {
      errors.phone = "Gunakan nomor Indonesia, contoh 081234567890 atau +6281234567890.";
    }
    if (!emailPattern.test(email.trim())) {
      errors.email = "Gunakan format email seperti nama@email.com.";
    }
    if (city.trim().length < 2) {
      errors.city = "Kota belum diisi.";
    }
    if (!profile.status) {
      errors.status = "Pilih kondisi kamu saat ini.";
    }
    if (!profile.goal) {
      errors.goal = "Pilih tujuan utama kamu.";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) setStep("result");
  };

  const reset = () => {
    setStep("intro");
    setCurrentQuestion(0);
    setAnswers([]);
    setFullName("");
    setPhone("");
    setEmail("");
    setCity("");
    setFormErrors({});
    setProfile({ageRange: "", status: "", goal: ""});
  };

  const generateWhatsAppLink = () => {
    const trackingCampaign = searchParams.get("utm_campaign");
    const trackingSource = searchParams.get("utm_source");
    const message = `Halo, saya baru saja mengikuti Quiz Konsultasi Kelaskerja!\n\nNama: ${fullName.trim()}\nWhatsApp: ${phone.trim()}\nEmail: ${email.trim()}\nKota: ${city.trim()}\nRentang umur: ${profile.ageRange}\nStatus: ${profile.status}\nTujuan: ${profile.goal}\n\nHasil rekomendasi: ${result.result.title}\nBootcamp: ${result.result.bootcamp}${trackingSource || trackingCampaign ? `\n\nSumber: ${trackingSource || "-"}${trackingCampaign ? ` | ${trackingCampaign}` : ""}` : ""}\n\nSaya tertarik untuk konsultasi gratis lebih lanjut. Terima kasih!`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header scrolled={true} whatsappLink={whatsappLink} mobileOnly />
      <main className={`${step === "intro" ? "h-[calc(100svh-80px)] overflow-hidden" : "min-h-[calc(100svh-80px)] overflow-y-auto"} mx-auto w-full max-w-[430px] bg-white text-[#242426]`}>
      <div className={`${step === "intro" ? "h-full px-3 py-1" : "min-h-0 px-3 py-0"} relative isolate`}>
        <div className={`mx-auto flex w-full max-w-[430px] flex-col ${step === "intro" ? "h-full" : "min-h-0"}`}>
          <div className={`grid flex-1 items-center gap-8 ${step === "intro" ? "py-1" : "py-0"}`}>
            <section className="hidden">
              <div className="relative mb-5 h-64 overflow-hidden rounded-[2rem] bg-[#f3f1ec]">
                <Image
                  src="/mentors/hadi-v1.png"
                  alt="Talent Kelaskerja mengajak mengikuti quiz"
                  fill
                  sizes="(min-width: 1024px) 35vw, 0px"
                  className="object-contain object-bottom"
                  priority
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#8a6500] backdrop-blur-sm">
                  Mulai dari sini
                </div>
              </div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e7dfc4] bg-[#fffaf0] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#8a6500]">
                <Sparkles size={14} /> Career match quiz
              </div>
              <h1 className="max-w-lg text-5xl font-black leading-[1.03] tracking-tight text-[#242426]">
                Bukan bingung. Kamu cuma belum menemukan jalur yang pas.
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-[#6d6d68]">
                Jawab beberapa pertanyaan sederhana. Kami akan membantu menemukan skill yang paling cocok untuk langkah kariermu berikutnya.
              </p>
              <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-[#6d6d68]">
                <div className="flex -space-x-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0b0910] bg-[#e7b23b] text-xs text-[#242426]">A</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#344b46] text-xs text-white">R</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#d88967] text-xs text-[#242426]">D</span>
                </div>
                Dipakai untuk mengenali minatmu, bukan menghakimi.
              </div>
            </section>

            <section className={`mx-auto w-full ${step === "intro" ? "max-w-[430px] p-4" : "max-w-[430px] p-0"}`}>
              {step !== "intro" && (
                <div className="mb-8">
                  <div className="mb-2 flex items-center justify-between text-xs font-bold text-[#77766f]">
                    <span>{step === "profile" ? "Profil singkat" : `Pertanyaan ${currentQuestion + 1} dari ${totalQuestions}`}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#e8e6e0]">
                    <div className="h-full rounded-full bg-[#ffb805] transition-[width] duration-500" style={{width: `${progress}%`}} />
                  </div>
                </div>
              )}

              {step === "intro" && (
                <div className="py-2">
                  <div className="text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffb805]">Quiz konsultasi gratis</p>
                    <h1 className="mx-auto mt-2 max-w-xl text-2xl font-black leading-[1.05] tracking-tight text-[#242426]">
                      Temukan jalur karier yang paling cocok untukmu
                    </h1>
                    <p className="mx-auto mt-2 max-w-2xl text-xs leading-4 text-[#6d6d68]">
                      Jawab beberapa pertanyaan singkat dan dapatkan rekomendasi bootcamp dari mentor praktisi.
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-[minmax(135px,0.9fr)_minmax(0,1.1fr)] items-end gap-2">
                    <div className="relative h-[15rem]">
                      <Image
                        src="/mentors/hadi-v1.png"
                        alt="Talent Kelaskerja mengajak mengikuti quiz"
                        fill
                        sizes="(max-width: 639px) 42vw, 280px"
                        className="object-cover object-center"
                        priority
                      />
                    </div>
                    <div className="pb-2">
                      <h2 className="mb-2 text-sm font-black text-[#242426]">Pilih rentang umur kamu</h2>
                      <div className="grid gap-2">
                        {profileOptions.ageRange.map((option) => (
                          <button
                            type="button"
                            key={option}
                            onClick={() => {
                              handleProfileChange("ageRange", option);
                              setStep("questions");
                            }}
                            className="group flex items-center justify-between rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-left text-xs font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#FFB500]/50 hover:bg-[#FFFDF5]"
                          >
                            <span>{option}</span>
                            <ArrowRight size={22} className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#B37A00]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="mx-auto mt-3 max-w-2xl text-[10px] font-semibold leading-4 text-[#85847e]">
                    Dengan melanjutkan, kamu menyetujui syarat dan ketentuan, termasuk penggunaan teknologi tracking seperti Meta Pixel.
                  </p>
                </div>
              )}

              {step === "questions" && (
                <div>
                  <button type="button" onClick={handleBack} className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-[#77766f] transition hover:text-[#242426]">
                    <ArrowLeft size={16} /> Kembali
                  </button>
                  <h2 className="max-w-xl text-xl font-black leading-tight tracking-tight">
                    {quizQuestions[currentQuestion].question}
                  </h2>
                  <div className="mt-5 grid gap-2">
                    {quizQuestions[currentQuestion].options.map((option) => {
                      const isSelected = answers[currentQuestion] === option.category;
                      return (
                        <button
                          type="button"
                          key={option.label}
                          onClick={() => handleAnswer(option.category)}
                          className={`group flex w-full items-start gap-2 rounded-xl border-2 px-3 py-2.5 text-left text-xs transition hover:-translate-y-0.5 ${isSelected ? "border-[#FFB500] bg-[#FFF8E7] shadow-md" : "border-slate-200 bg-white hover:border-[#FFB500]/50 hover:bg-[#FFFDF5] hover:shadow-sm"}`}
                        >
                          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${isSelected ? "bg-[#FFB500] text-[#1A1A1A]" : "bg-slate-100 text-slate-500 group-hover:bg-[#FFB500]/20 group-hover:text-[#B37A00]"}`}>
                            {isSelected ? <Check size={15} /> : option.label}
                          </span>
                          <span className={`pt-0.5 leading-5 ${isSelected ? "font-bold text-slate-900" : "text-slate-600 group-hover:text-slate-800"}`}>{option.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === "profile" && (
                <div>
                  <button type="button" onClick={handleBack} className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-[#77766f] transition hover:text-[#242426]">
                    <ArrowLeft size={16} /> Kembali ke pertanyaan terakhir
                  </button>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff5d6] text-[#8a6500]"><UserRound size={23} /></div>
                  <h2 className="mt-5 text-2xl font-black leading-tight tracking-tight">Sedikit tentang kamu</h2>
                  <p className="mt-3 leading-6 text-[#6d6d68]">Lengkapi data ini agar tim kami bisa memberi arahan yang lebih relevan setelah kamu membuka WhatsApp.</p>

                  <div className="mt-6 grid gap-4">
                    <label className="block text-sm font-bold text-[#3f3f3b]">
                      Nama lengkap <span className="text-[#ffcb3b]">*</span>
                      <input required value={fullName} onChange={(event) => { setFullName(event.target.value); clearFormError("fullName"); }} aria-invalid={Boolean(formErrors.fullName)} placeholder="Contoh: Budi Santoso" autoComplete="name" className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm font-normal text-[#242426] outline-none transition placeholder:text-[#aaa7af] focus:border-[#ffb805] focus:ring-4 focus:ring-[#ffb805]/10 ${formErrors.fullName ? "border-[#a95648]" : "border-[#dedcd5]"}`} />
                      {formErrors.fullName && <span className="mt-2 block text-xs font-semibold text-[#ffb4a8]">{formErrors.fullName}</span>}
                    </label>
                    <label className="block text-sm font-bold text-[#3f3f3b]">
                      Nomor WhatsApp <span className="text-[#ffcb3b]">*</span>
                      <input required type="tel" inputMode="tel" value={phone} onChange={(event) => { setPhone(event.target.value); clearFormError("phone"); }} aria-invalid={Boolean(formErrors.phone)} placeholder="08xxxxxxxxxx" autoComplete="tel" className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm font-normal text-[#242426] outline-none transition placeholder:text-[#aaa7af] focus:border-[#ffb805] focus:ring-4 focus:ring-[#ffb805]/10 ${formErrors.phone ? "border-[#a95648]" : "border-[#dedcd5]"}`} />
                      <span className="mt-2 block text-[11px] font-normal text-[#85847e]">Format: 08..., 62..., atau +62...</span>
                      {formErrors.phone && <span className="mt-1 block text-xs font-semibold text-[#ffb4a8]">{formErrors.phone}</span>}
                    </label>
                    <label className="block text-sm font-bold text-[#3f3f3b]">
                      Email aktif <span className="text-[#ffcb3b]">*</span>
                      <input required type="email" value={email} onChange={(event) => { setEmail(event.target.value); clearFormError("email"); }} aria-invalid={Boolean(formErrors.email)} placeholder="nama@email.com" autoComplete="email" className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm font-normal text-[#242426] outline-none transition placeholder:text-[#aaa7af] focus:border-[#ffb805] focus:ring-4 focus:ring-[#ffb805]/10 ${formErrors.email ? "border-[#a95648]" : "border-[#dedcd5]"}`} />
                      <span className="mt-2 block text-[11px] font-normal text-[#85847e]">Contoh: nama@email.com</span>
                      {formErrors.email && <span className="mt-1 block text-xs font-semibold text-[#ffb4a8]">{formErrors.email}</span>}
                    </label>
                    <label className="block text-sm font-bold text-[#3f3f3b]">
                      Kota domisili <span className="text-[#ffcb3b]">*</span>
                      <input required value={city} onChange={(event) => { setCity(event.target.value); clearFormError("city"); }} aria-invalid={Boolean(formErrors.city)} placeholder="Contoh: Jakarta" autoComplete="address-level2" className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm font-normal text-[#242426] outline-none transition placeholder:text-[#aaa7af] focus:border-[#ffb805] focus:ring-4 focus:ring-[#ffb805]/10 ${formErrors.city ? "border-[#a95648]" : "border-[#dedcd5]"}`} />
                      {formErrors.city && <span className="mt-2 block text-xs font-semibold text-[#ffb4a8]">{formErrors.city}</span>}
                    </label>
                  </div>

                  <div className="mt-6 grid gap-5">
                    {followUpProfileFields.map((field) => (
                      <fieldset key={field}>
                        <legend className="text-sm font-bold text-[#3f3f3b]">{profileLabels[field]} <span className="text-[#b37a00]">*</span></legend>
                        <div className="mt-2 grid gap-2">
                          {profileOptions[field].map((option) => (
                            <button type="button" key={option} onClick={() => handleProfileChange(field, option)} className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition ${profile[field] === option ? "border-[#FFB500] bg-[#FFF8E7] text-[#6e5000]" : "border-slate-200 bg-white text-slate-600 hover:border-[#FFB500]/50 hover:bg-[#FFFDF5]"}`}>
                              {option}
                            </button>
                          ))}
                        </div>
                        {formErrors[field] && <p className="mt-2 text-xs font-semibold text-[#ffb4a8]">{formErrors[field]}</p>}
                      </fieldset>
                    ))}
                  </div>

                  <p className="mt-5 flex items-center gap-2 text-xs leading-5 text-[#85847e]"><ShieldCheck size={15} className="shrink-0 text-[#b37a00]" /> Data hanya dipakai untuk menghubungi kamu melalui WhatsApp.</p>
                  <button type="button" onClick={handleProfileSubmit} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ffb805] px-5 py-4 text-sm font-black text-[#242426] transition hover:-translate-y-0.5 hover:bg-[#ffcb3b]">
                    Lihat rekomendasiku <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {step === "result" && (
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff5d6] text-4xl">{result.result.emoji}</div>
                  <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#d99400]">Rekomendasi untukmu</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight">{result.result.title}</h2>
                  <p className="mt-3 text-sm font-semibold text-[#6d6d68]">{result.result.subtitle}</p>
                  <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#6d6d68]">{result.result.description}</p>
                  <div className="mx-auto mt-6 max-w-md rounded-2xl bg-[#242426] p-5 text-left text-white">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ffcb3b]">Bootcamp rekomendasi</p>
                    <p className="mt-2 text-lg font-black">{result.result.bootcamp}</p>
                  </div>
                  <div className="mt-7 flex flex-col gap-3">
                    <a href={generateWhatsAppLink()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#20b15a] px-5 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#159447]">
                      <FaWhatsapp size={19} /> Konsultasi Gratis via WhatsApp
                    </a>
                    <button type="button" onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#dedcd5] px-5 py-4 text-sm font-bold text-[#6d6d68] transition hover:border-[#c8c5bc] hover:bg-[#f7f6f2]">
                      <RotateCcw size={16} /> Ulangi quiz
                    </button>
                  </div>
                  <p className="mx-auto mt-5 flex max-w-sm items-center justify-center gap-2 text-xs leading-5 text-[#96958e]"><MessageCircle size={15} /> Hasil dan profilmu akan ikut tertulis di pesan WhatsApp.</p>
                </div>
              )}
            </section>
          </div>

          <footer className={`${step === "intro" ? "hidden" : ""} pb-2 text-center text-xs text-[#96958e]`}>© {new Date().getFullYear()} Kelaskerja.com</footer>
        </div>
      </div>
      </main>
    </div>
  );
};

export default StartQuizPage;
