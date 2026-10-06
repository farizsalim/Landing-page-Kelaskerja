"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import {FaWhatsapp} from "react-icons/fa";
import {
  quizQuestions,
  quizResults,
  categoryLabels,
  QuizCategory,
  QuizOption,
} from "@/data/consultation-quiz";

type QuizStep = "welcome" | "question" | "result";

interface ConsultationQuizProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappLink: string;
}

const TOTAL_QUESTIONS = quizQuestions.length;

const ConsultationQuiz = ({ isOpen, onClose, whatsappLink }: ConsultationQuizProps) => {
  const [step, setStep] = useState<QuizStep>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizCategory[]>([]);
  const [direction, setDirection] = useState(1);
  const isAnswering = useRef(false);

  const reset = useCallback(() => {
    setStep("welcome");
    setCurrentQuestion(0);
    setAnswers([]);
    setDirection(1);
    isAnswering.current = false;
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(reset, 300);
  }, [onClose, reset]);

  const handleStart = useCallback(() => {
    setStep("question");
    setDirection(1);
  }, []);

  const handleAnswer = useCallback(
    (option: QuizOption) => {
      if (isAnswering.current) return;
      isAnswering.current = true;

      const newAnswers = [...answers];
      newAnswers[currentQuestion] = option.category;
      setAnswers(newAnswers);
      setDirection(1);

      if (currentQuestion < TOTAL_QUESTIONS - 1) {
        setTimeout(() => {
          setCurrentQuestion((prev) => Math.min(prev + 1, TOTAL_QUESTIONS - 1));
          isAnswering.current = false;
        }, 300);
      } else {
        setTimeout(() => {
          setStep("result");
          isAnswering.current = false;
        }, 400);
      }
    },
    [answers, currentQuestion]
  );

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion((prev) => prev - 1);
    } else {
      setStep("welcome");
    }
  }, [currentQuestion]);

  const getResult = useCallback(() => {
    const scores: Record<QuizCategory, number> = {
      "content-creator": 0,
      "digital-marketing": 0,
      "public-speaking": 0,
      "content-strategy": 0,
      "communication-sales": 0,
    };
    answers.forEach((cat) => {
      if (cat) scores[cat]++;
    });

    let maxScore = 0;
    let winner: QuizCategory = "content-creator";
    for (const [cat, score] of Object.entries(scores) as [QuizCategory, number][]) {
      if (score > maxScore) {
        maxScore = score;
        winner = cat;
      }
    }
    return { result: quizResults[winner], scores };
  }, [answers]);

  const generateWhatsAppLink = useCallback(() => {
    const { result, scores } = getResult();
    const scoreText = Object.entries(scores)
      .map(([cat, score]) => `• ${categoryLabels[cat as QuizCategory]}: ${score}/10`)
      .join("\n");

    const message = `Halo, saya baru saja mengikuti Quiz Konsultasi KelasKerja! 🎓

📊 *Hasil Rekomendasi:*
${result.emoji} *${result.title}* — ${result.subtitle}

${result.description}

📈 *Detail Skor:*
${scoreText}

🎯 *Bootcamp yang Direkomendasikan:*
${result.bootcamp}

Saya tertarik untuk konsultasi lebih lanjut tentang bootcamp ini. Terima kasih!`;

    const baseUrl = whatsappLink.split("?")[0];
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }, [getResult, whatsappLink]);

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  if (!isOpen) return null;

  const safeQuestionIndex = Math.max(
    0,
    Math.min(currentQuestion, TOTAL_QUESTIONS - 1)
  );
  const question = quizQuestions[safeQuestionIndex];
  const progress = ((currentQuestion + (step === "result" ? 1 : 0)) / TOTAL_QUESTIONS) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 max-h-[calc(100svh-1rem)] w-full max-w-xl overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100svh-3rem)] sm:rounded-3xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
              aria-label="Tutup quiz"
            >
              <X size={18} />
            </button>

            {/* Progress Bar (only during questions) */}
            {step === "question" && (
              <div className="h-1.5 w-full bg-slate-100">
                <motion.div
                  className="h-full bg-[#FFB500]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            )}

            <div className="px-4 py-5 sm:px-10 sm:py-10">
              <AnimatePresence mode="wait" custom={direction}>
                {/* ── Welcome Screen ── */}
                {step === "welcome" && (
                  <motion.div
                    key="welcome"
                    variants={slideVariants}
                    custom={1}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF8E7] sm:mb-6 sm:h-20 sm:w-20">
                      <Sparkles size={28} className="text-[#FFB500] sm:h-9 sm:w-9" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 sm:text-3xl">
                      Temukan Bootcamp Terbaik Untukmu!
                    </h2>
                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500 sm:mt-4 sm:text-base">
                      Jawab 10 pertanyaan singkat dan kami akan merekomendasikan
                      bootcamp yang paling sesuai dengan minat dan bakatmu.
                    </p>
                    <p className="mt-3 text-xs text-slate-400">
                      ⏱️ Hanya butuh 2-3 menit
                    </p>
                    <button
                      onClick={handleStart}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FFB500] px-7 py-3 text-sm font-bold text-[#1A1A1A] shadow-lg shadow-[#FFB500]/25 transition hover:bg-[#E5A200] hover:shadow-xl hover:shadow-[#FFB500]/30 hover:-translate-y-0.5 active:scale-95 sm:mt-8 sm:px-8 sm:py-3.5"
                    >
                      Mulai Quiz
                      <ChevronRight size={18} />
                    </button>
                  </motion.div>
                )}

                {/* ── Question Screen ── */}
                {step === "question" && (
                  <motion.div
                    key={`q-${currentQuestion}`}
                    variants={slideVariants}
                    custom={direction}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    {/* Question counter */}
                    <div className="mb-2 flex items-center justify-between">
                      <button
                        onClick={handleBack}
                        className="flex items-center gap-1 text-sm text-slate-400 transition hover:text-slate-700"
                      >
                        <ChevronLeft size={16} />
                        Kembali
                      </button>
                      <span className="text-sm font-semibold text-slate-400">
                        {currentQuestion + 1}{" "}
                        <span className="text-slate-300">/</span>{" "}
                        {TOTAL_QUESTIONS}
                      </span>
                    </div>

                    {/* Question */}
                    <h3 className="mt-3 text-base font-bold leading-snug text-slate-900 sm:mt-4 sm:text-xl">
                      {question.question}
                    </h3>

                    {/* Options */}
                    <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
                      {question.options.map((option, idx) => {
                        const isSelected = answers[currentQuestion] === option.category;
                        return (
                          <motion.button
                            key={option.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.06 }}
                            onClick={() => handleAnswer(option)}
                            className={`group flex w-full items-start gap-2.5 rounded-xl border-2 p-3 text-left transition-all duration-200 sm:gap-3 sm:rounded-2xl sm:p-4 ${
                              isSelected
                                ? "border-[#FFB500] bg-[#FFF8E7] shadow-md"
                                : "border-slate-200 bg-white hover:border-[#FFB500]/50 hover:bg-[#FFFDF5] hover:shadow-sm"
                            }`}
                          >
                            <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition sm:h-7 sm:w-7 sm:text-xs ${
                                isSelected
                                  ? "bg-[#FFB500] text-[#1A1A1A]"
                                  : "bg-slate-100 text-slate-500 group-hover:bg-[#FFB500]/20 group-hover:text-[#B37A00]"
                              }`}
                            >
                              {option.label}
                            </span>
                            <span
                                className={`text-[13px] leading-snug transition sm:text-sm sm:leading-relaxed ${
                                isSelected
                                  ? "font-semibold text-slate-900"
                                  : "text-slate-600 group-hover:text-slate-800"
                              }`}
                            >
                              {option.text}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ── Result Screen ── */}
                {step === "result" && (
                  <motion.div
                    key="result"
                    variants={slideVariants}
                    custom={1}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    {(() => {
                      const { result, scores } = getResult();
                      return (
                        <>
                          {/* Emoji */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.1 }}
                            className="mx-auto mb-3 text-4xl sm:mb-4 sm:text-6xl"
                          >
                            {result.emoji}
                          </motion.div>

                          {/* Result heading */}
                          <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <p className="text-sm font-semibold uppercase tracking-widest text-[#FFB500]">
                              {result.subtitle}
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                              {result.title}
                            </h2>
                          </motion.div>

                          {/* Description */}
                          <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500 sm:mt-4"
                          >
                            {result.description}
                          </motion.p>

                          {/* Recommended Bootcamp */}
                          <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mx-auto mt-4 max-w-xs rounded-2xl bg-[#222222] p-3.5 text-white sm:mt-6 sm:p-4"
                          >
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#FFB500]">
                              Bootcamp Rekomendasi
                            </p>
                            <p className="mt-1 text-base font-bold">
                              {result.bootcamp}
                            </p>
                          </motion.div>

                          {/* Scores */}
                          <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mx-auto mt-4 max-w-sm sm:mt-6"
                          >
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:mb-3 sm:text-xs">
                              Detail Skor
                            </p>
                            <div className="space-y-2">
                              {(
                                Object.entries(scores) as [QuizCategory, number][]
                              )
                                .sort((a, b) => b[1] - a[1])
                                .map(([cat, score]) => (
                                  <div key={cat} className="flex items-center gap-2 sm:gap-3">
                                    <span className="w-24 text-right text-[10px] leading-tight text-slate-500 sm:w-40 sm:text-xs">
                                      {categoryLabels[cat]}
                                    </span>
                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 sm:h-2.5">
                                      <motion.div
                                        className={`h-full rounded-full ${
                                          cat === result.category
                                            ? "bg-[#FFB500]"
                                            : "bg-slate-300"
                                        }`}
                                        initial={{ width: 0 }}
                                        animate={{
                                          width: `${(score / TOTAL_QUESTIONS) * 100}%`,
                                        }}
                                        transition={{
                                          duration: 0.6,
                                          delay: 0.6,
                                          ease: "easeOut",
                                        }}
                                      />
                                    </div>
                                    <span className="w-6 text-left text-xs font-bold text-slate-700 sm:w-8">
                                      {score}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </motion.div>

                          {/* Action buttons */}
                          <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:justify-center sm:gap-3"
                          >
                            <a
                              href={generateWhatsAppLink()}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/25 transition hover:bg-green-700 hover:shadow-xl hover:-translate-y-0.5 sm:px-6"
                            >
                              <FaWhatsapp size={18} />
                              Konsultasi via WhatsApp
                            </a>
                            <button
                              onClick={reset}
                              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                            >
                              <RotateCcw size={16} />
                              Ulangi Quiz
                            </button>
                          </motion.div>
                        </>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConsultationQuiz;
